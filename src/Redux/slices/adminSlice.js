import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../utils/api"

// Get dashboard stats
export const getDashboardStats = createAsyncThunk("admin/getDashboardStats", async (_, { rejectWithValue }) => {
    try {
        const response = await api.get(`/admin/dashboard/stats`)
        return response.data.stats
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to fetch dashboard stats")
    }
})

// Get pending payments
export const getPendingPayments = createAsyncThunk("admin/getPendingPayments", async (_, { rejectWithValue }) => {
    try {
        
        const response = await api.get(`/admin/payments/pending`)
        return response.data.payments
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to fetch pending payments")
    }
})

// Get payment details
export const getPaymentDetails = createAsyncThunk("admin/getPaymentDetails", async (paymentId, { rejectWithValue }) => {
    try {
       
        const response = await api.get(`/admin/payments/${paymentId}`)
        return response.data.payment
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to fetch payment details")
    }
})

// Verify payment
export const verifyPayment = createAsyncThunk(
    "admin/verifyPayment",
    async ({ paymentId, action, reason }, { rejectWithValue }) => {
        try {
           
            const response = await api.put(
                `/admin/payments/${paymentId}/verify`,
                { action, reason },
                
            )
            return response.data.payment
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to verify payment")
        }
    },
)

// Get all contracts
export const getAllContracts = createAsyncThunk(
    "admin/getAllContracts",
    async ({ status, page = 1, limit = 10 }, { rejectWithValue }) => {
        try {
            
            const params = new URLSearchParams({ page, limit })
            if (status) params.append("status", status)

            const response = await api.get(`/admin/contracts?${params}`)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch contracts")
        }
    },
)

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        stats: null,
        pendingPayments: [],
        selectedPayment: null,
        contracts: [],
        pagination: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearError: (state) => {
            state.error = null
        },
        clearSelectedPayment: (state) => {
            state.selectedPayment = null
        },
    },
    extraReducers: (builder) => {
        builder
            // Dashboard stats
            .addCase(getDashboardStats.pending, (state) => {
                state.loading = true
            })
            .addCase(getDashboardStats.fulfilled, (state, action) => {
                state.loading = false
                state.stats = action.payload
            })
            .addCase(getDashboardStats.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            // Pending payments
            .addCase(getPendingPayments.pending, (state) => {
                state.loading = true
            })
            .addCase(getPendingPayments.fulfilled, (state, action) => {
                state.loading = false
                state.pendingPayments = action.payload
            })
            .addCase(getPendingPayments.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            // Payment details
            .addCase(getPaymentDetails.fulfilled, (state, action) => {
                state.selectedPayment = action.payload
            })
            // Verify payment
            .addCase(verifyPayment.fulfilled, (state, action) => {
                state.pendingPayments = state.pendingPayments.filter((p) => p._id !== action.payload._id)
                state.selectedPayment = null
            })
            // Contracts
            .addCase(getAllContracts.fulfilled, (state, action) => {
                state.contracts = action.payload.contracts
                state.pagination = action.payload.pagination
            })
    },
})

export const { clearError, clearSelectedPayment } = adminSlice.actions
export default adminSlice.reducer
