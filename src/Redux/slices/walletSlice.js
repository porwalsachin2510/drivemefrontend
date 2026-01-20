import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../utils/api"

const initialState = {
    wallet: null,
    transactions: [],
    payouts: [],
    loading: false,
    error: null,
}

export const getWalletBalance = createAsyncThunk("wallet/getWalletBalance", async (_, { rejectWithValue }) => {
    try {
        const response = await api.get("/wallet/balance")
        return response.data
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to fetch wallet balance")
    }
})

export const getWalletTransactions = createAsyncThunk(
    "wallet/getWalletTransactions",
    async ({ page = 1, limit = 20 }, { rejectWithValue }) => {
        try {
            const response = await api.get(`/wallet/transactions?page=${page}&limit=${limit}`)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch transactions")
        }
    },
)

export const requestPayout = createAsyncThunk("wallet/requestPayout", async (payoutData, { rejectWithValue }) => {
    try {
        const response = await api.post("/wallet/payout", payoutData)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to request payout")
    }
})

export const getUserPayouts = createAsyncThunk(
    "wallet/getUserPayouts",
    async ({ page = 1, limit = 20 }, { rejectWithValue }) => {
        try {
            const response = await api.get(`/wallet/payouts?page=${page}&limit=${limit}`)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch payouts")
        }
    },
)

const walletSlice = createSlice({
    name: "wallet",
    initialState,
    reducers: {
        clearWalletError: (state) => {
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getWalletBalance.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getWalletBalance.fulfilled, (state, action) => {
                state.loading = false
                state.wallet = action.payload.data.wallet
            })
            .addCase(getWalletBalance.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(getWalletTransactions.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getWalletTransactions.fulfilled, (state, action) => {
                state.loading = false
                state.transactions = action.payload.data.transactions
            })
            .addCase(getWalletTransactions.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(requestPayout.pending, (state) => {
                state.loading = true
                state.error = null
            })
            // eslint-disable-next-line no-unused-vars
            .addCase(requestPayout.fulfilled, (state, action) => {
                state.loading = false
            })
            .addCase(requestPayout.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(getUserPayouts.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getUserPayouts.fulfilled, (state, action) => {
                state.loading = false
                state.payouts = action.payload.data.payouts
            })
            .addCase(getUserPayouts.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    },
})

export const { clearWalletError } = walletSlice.actions
export default walletSlice.reducer
