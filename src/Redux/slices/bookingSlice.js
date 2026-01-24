// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
// import api from "../../utils/api"

// const initialState = {
//     currentBooking: null,
//     passengerBookings: [],
//     partnerBookings: [],
//     corporateOwnerBookings: [],
//     availabilityData: null,
//     loading: false,
//     error: null,
//     bookingCreated: false,
//     paymentData: null,
// }

// export const checkRouteAvailability = createAsyncThunk(
//     "booking/checkRouteAvailability",
//     async ({ routeId, travelDate }, { rejectWithValue }) => {
//         try {
//             const response = await api.post("/bookings/check-availability", {
//                 routeId,
//                 travelDate,
//             })
//             return response.data
//         } catch (error) {
//             return rejectWithValue(error.response?.data?.message || "Failed to check availability")
//         }
//     },
// )

// export const getAvailableSeats = createAsyncThunk(
//     "booking/getAvailableSeats",
//     async ({ routeId, date }, { rejectWithValue }) => {
//         try {
//             const response = await api.get(`/bookings/available-seats?routeId=${routeId}&date=${date}`)
//             return response.data
//         } catch (error) {
//             return rejectWithValue(error.response?.data?.message || "Failed to get available seats")
//         }
//     },
// )

// export const createB2CBooking = createAsyncThunk(
//     "booking/createB2CBooking",
//     async (bookingData, { rejectWithValue }) => {
//         try {
//             const response = await api.post("/bookings/b2c", bookingData)
//             if (response.data.success === false) {
//                 return rejectWithValue(response.data.message || "Failed to create booking")
//             }
//             return response.data
//         } catch (error) {
//             return rejectWithValue(error.response?.data?.message || "Failed to create booking")
//         }
//     },
// )

// export const createCorporateBooking = createAsyncThunk(
//     "booking/createCorporateBooking",
//     async (bookingData, { rejectWithValue }) => {
//         try {
//             const response = await api.post("/bookings/corporate", bookingData)
//             if (response.data.success === false) {
//                 return rejectWithValue(response.data.message || "Failed to create booking")
//             }
//             return response.data
//         } catch (error) {
//             return rejectWithValue(error.response?.data?.message || "Failed to create booking")
//         }
//     },
// )

// export const getPassengerBookings = createAsyncThunk(
//     "booking/getPassengerBookings",
//     async ({ status, type } = {}, { rejectWithValue }) => {
//         try {
//             let url = "/bookings/passenger"
//             const params = new URLSearchParams()
//             if (status) params.append("status", status)
//             if (type) params.append("type", type)
//             if (params.toString()) url += `?${params.toString()}`

//             const response = await api.get(url)
//             return response.data
//         } catch (error) {
//             return rejectWithValue(error.response?.data?.message || "Failed to fetch bookings")
//         }
//     },
// )

// export const getPartnerBookings = createAsyncThunk(
//     "booking/getPartnerBookings",
//     async ({ status } = {}, { rejectWithValue }) => {
//         try {
//             let url = "/bookings/partner"
//             if (status) url += `?status=${status}`

//             const response = await api.get(url)
//             return response.data
//         } catch (error) {
//             return rejectWithValue(error.response?.data?.message || "Failed to fetch bookings")
//         }
//     },
// )

// export const getCorporateOwnerBookings = createAsyncThunk(
//     "booking/getCorporateOwnerBookings",
//     async ({ status, date } = {}, { rejectWithValue }) => {
//         try {
//             let url = "/bookings/corporate-owner"
//             const params = new URLSearchParams()
//             if (status) params.append("status", status)
//             if (date) params.append("date", date)
//             if (params.toString()) url += `?${params.toString()}`

//             const response = await api.get(url)
//             return response.data
//         } catch (error) {
//             return rejectWithValue(error.response?.data?.message || "Failed to fetch corporate bookings")
//         }
//     },
// )

// export const acceptBooking = createAsyncThunk("booking/acceptBooking", async (bookingId, { rejectWithValue }) => {
//     try {
//         const response = await api.put(`/bookings/${bookingId}/accept`)
//         return response.data
//     } catch (error) {
//         return rejectWithValue(error.response?.data?.message || "Failed to accept booking")
//     }
// })

// export const rejectBooking = createAsyncThunk(
//     "booking/rejectBooking",
//     async ({ bookingId, rejectionReason }, { rejectWithValue }) => {
//         try {
//             const response = await api.put(`/bookings/${bookingId}/reject`, { rejectionReason })
//             return response.data
//         } catch (error) {
//             return rejectWithValue(error.response?.data?.message || "Failed to reject booking")
//         }
//     },
// )

// export const completeBooking = createAsyncThunk("booking/completeBooking", async (bookingId, { rejectWithValue }) => {
//     try {
//         const response = await api.put(`/bookings/${bookingId}/complete`)
//         return response.data
//     } catch (error) {
//         return rejectWithValue(error.response?.data?.message || "Failed to complete booking")
//     }
// })

// export const verifyBookingPayment = createAsyncThunk(
//     "booking/verifyBookingPayment",
//     async ({ sessionId, bookingId }, { rejectWithValue }) => {
//         try {
//             const response = await api.post("/bookings/verify-payment", { sessionId, bookingId })
//             return response.data
//         } catch (error) {
//             return rejectWithValue(error.response?.data?.message || "Failed to verify payment")
//         }
//     },
// )

// const bookingSlice = createSlice({
//     name: "booking",
//     initialState,
//     reducers: {
//         clearBookingError: (state) => {
//             state.error = null
//         },
//         clearBookingData: (state) => {
//             state.currentBooking = null
//             state.bookingCreated = false
//             state.paymentData = null
//         },
//         // eslint-disable-next-line no-unused-vars
//         resetBookingState: (state) => {
//             return initialState
//         },
//         setPaymentData: (state, action) => {
//             state.paymentData = action.payload
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             // Check Availability
//             .addCase(checkRouteAvailability.pending, (state) => {
//                 state.loading = true
//                 state.error = null
//             })
//             .addCase(checkRouteAvailability.fulfilled, (state, action) => {
//                 state.loading = false
//                 state.availabilityData = action.payload
//             })
//             .addCase(checkRouteAvailability.rejected, (state, action) => {
//                 state.loading = false
//                 state.error = action.payload
//             })
//             // Get Available Seats
//             .addCase(getAvailableSeats.pending, (state) => {
//                 state.loading = true
//             })
//             .addCase(getAvailableSeats.fulfilled, (state, action) => {
//                 state.loading = false
//                 state.availabilityData = action.payload
//             })
//             .addCase(getAvailableSeats.rejected, (state, action) => {
//                 state.loading = false
//                 state.error = action.payload
//             })
//             // Create B2C Booking
//             .addCase(createB2CBooking.pending, (state) => {
//                 state.loading = true
//                 state.error = null
//                 state.bookingCreated = false
//             })
//             .addCase(createB2CBooking.fulfilled, (state, action) => {
//                 state.loading = false
//                 state.currentBooking = action.payload?.booking || action.payload || null
//                 state.bookingCreated = true
//                 state.paymentData = action.payload?.paymentData || null
//             })
//             .addCase(createB2CBooking.rejected, (state, action) => {
//                 state.loading = false
//                 state.error = action.payload
//                 state.bookingCreated = false
//             })
//             // Create Corporate Booking
//             .addCase(createCorporateBooking.pending, (state) => {
//                 state.loading = true
//                 state.error = null
//                 state.bookingCreated = false
//             })
//             .addCase(createCorporateBooking.fulfilled, (state, action) => {
//                 state.loading = false
//                 state.currentBooking = action.payload?.booking || action.payload || null
//                 state.bookingCreated = true
//             })
//             .addCase(createCorporateBooking.rejected, (state, action) => {
//                 state.loading = false
//                 state.error = action.payload
//                 state.bookingCreated = false
//             })
//             // Get Passenger Bookings
//             .addCase(getPassengerBookings.pending, (state) => {
//                 state.loading = true
//                 state.error = null
//             })
//             .addCase(getPassengerBookings.fulfilled, (state, action) => {
//                 state.loading = false
//                 state.passengerBookings = action.payload?.bookings || action.payload || []
//             })
//             .addCase(getPassengerBookings.rejected, (state, action) => {
//                 state.loading = false
//                 state.error = action.payload
//             })
//             // Get Partner Bookings
//             .addCase(getPartnerBookings.pending, (state) => {
//                 state.loading = true
//                 state.error = null
//             })
//             .addCase(getPartnerBookings.fulfilled, (state, action) => {
//                 state.loading = false
//                 state.partnerBookings = action.payload?.bookings || action.payload || []
//             })
//             .addCase(getPartnerBookings.rejected, (state, action) => {
//                 state.loading = false
//                 state.error = action.payload
//             })
//             // Get Corporate Owner Bookings
//             .addCase(getCorporateOwnerBookings.pending, (state) => {
//                 state.loading = true
//                 state.error = null
//             })
//             .addCase(getCorporateOwnerBookings.fulfilled, (state, action) => {
//                 state.loading = false
//                 state.corporateOwnerBookings = action.payload?.bookings || action.payload || []
//             })
//             .addCase(getCorporateOwnerBookings.rejected, (state, action) => {
//                 state.loading = false
//                 state.error = action.payload
//             })
//             // Accept Booking
//             .addCase(acceptBooking.pending, (state) => {
//                 state.loading = true
//                 state.error = null
//             })
//             .addCase(acceptBooking.fulfilled, (state, action) => {
//                 state.loading = false
//                 const updatedBooking = action.payload?.booking || action.payload
//                 if (updatedBooking && updatedBooking._id) {
//                     state.partnerBookings = state.partnerBookings.map((b) => (b._id === updatedBooking._id ? updatedBooking : b))
//                 }
//             })
//             .addCase(acceptBooking.rejected, (state, action) => {
//                 state.loading = false
//                 state.error = action.payload
//             })
//             // Reject Booking
//             .addCase(rejectBooking.pending, (state) => {
//                 state.loading = true
//                 state.error = null
//             })
//             .addCase(rejectBooking.fulfilled, (state, action) => {
//                 state.loading = false
//                 const updatedBooking = action.payload?.booking || action.payload
//                 if (updatedBooking && updatedBooking._id) {
//                     state.partnerBookings = state.partnerBookings.map((b) => (b._id === updatedBooking._id ? updatedBooking : b))
//                 }
//             })
//             .addCase(rejectBooking.rejected, (state, action) => {
//                 state.loading = false
//                 state.error = action.payload
//             })
//             // Complete Booking
//             .addCase(completeBooking.pending, (state) => {
//                 state.loading = true
//                 state.error = null
//             })
//             .addCase(completeBooking.fulfilled, (state, action) => {
//                 state.loading = false
//                 const updatedBooking = action.payload?.booking || action.payload
//                 if (updatedBooking && updatedBooking._id) {
//                     state.partnerBookings = state.partnerBookings.map((b) => (b._id === updatedBooking._id ? updatedBooking : b))
//                 }
//             })
//             .addCase(completeBooking.rejected, (state, action) => {
//                 state.loading = false
//                 state.error = action.payload
//             })
//             // Verify Payment
//             .addCase(verifyBookingPayment.pending, (state) => {
//                 state.loading = true
//                 state.error = null
//             })
//             .addCase(verifyBookingPayment.fulfilled, (state, action) => {
//                 state.loading = false
//                 state.currentBooking = action.payload?.booking || action.payload || null
//             })
//             .addCase(verifyBookingPayment.rejected, (state, action) => {
//                 state.loading = false
//                 state.error = action.payload
//             })
//     },
// })

// export const { clearBookingError, clearBookingData, resetBookingState, setPaymentData } = bookingSlice.actions
// export default bookingSlice.reducer

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
// import api from "../../utils/api"

// const initialState = {
//     currentBooking: null,
//     passengerBookings: [],
//     partnerBookings: [],
//     corporateOwnerBookings: [],
//     availabilityData: null,
//     loading: false,
//     error: null,
//     bookingCreated: false,
//     paymentData: null,
//     userType: "NORMAL_PASSENGER", // Added userType to initialState
// }

// export const checkRouteAvailability = createAsyncThunk(
//     "booking/checkRouteAvailability",
//     async ({ routeId, travelDate }, { rejectWithValue }) => {
//         try {
//             const response = await api.post("/bookings/check-availability", {
//                 routeId,
//                 travelDate,
//             })
//             return response.data
//         } catch (error) {
//             return rejectWithValue(error.response?.data?.message || "Failed to check availability")
//         }
//     },
// )

// export const getAvailableSeats = createAsyncThunk(
//     "booking/getAvailableSeats",
//     async ({ routeId, date }, { rejectWithValue }) => {
//         try {
//             const response = await api.get(`/bookings/available-seats?routeId=${routeId}&date=${date}`)
//             return response.data
//         } catch (error) {
//             return rejectWithValue(error.response?.data?.message || "Failed to get available seats")
//         }
//     },
// )

// export const createB2CBooking = createAsyncThunk(
//     "booking/createB2CBooking",
//     async (bookingData, { rejectWithValue }) => {
//         try {
//             const response = await api.post("/bookings/b2c", bookingData)
//             if (response.data.success === false) {
//                 return rejectWithValue(response.data.message || "Failed to create booking")
//             }
//             return response.data
//         } catch (error) {
//             return rejectWithValue(error.response?.data?.message || "Failed to create booking")
//         }
//     },
// )

// export const createCorporateBooking = createAsyncThunk(
//     "booking/createCorporateBooking",
//     async (bookingData, { rejectWithValue }) => {
//         try {
//             const response = await api.post("/bookings/corporate", bookingData)
//             if (response.data.success === false) {
//                 return rejectWithValue(response.data.message || "Failed to create booking")
//             }
//             return response.data
//         } catch (error) {
//             return rejectWithValue(error.response?.data?.message || "Failed to create booking")
//         }
//     },
// )

// export const getPassengerBookings = createAsyncThunk(
//     "booking/getPassengerBookings",
//     async ({ status, type } = {}, { rejectWithValue }) => {
//         try {
//             let url = "/bookings/passenger"
//             const params = new URLSearchParams()
//             if (status) params.append("status", status)
//             if (type) params.append("type", type)
//             if (params.toString()) url += `?${params.toString()}`

//             const response = await api.get(url)
//             return response.data
//         } catch (error) {
//             return rejectWithValue(error.response?.data?.message || "Failed to fetch bookings")
//         }
//     },
// )

// export const getPartnerBookings = createAsyncThunk(
//     "booking/getPartnerBookings",
//     async ({ status } = {}, { rejectWithValue }) => {
//         try {
//             let url = "/bookings/partner"
//             if (status) url += `?status=${status}`

//             const response = await api.get(url)
//             return response.data
//         } catch (error) {
//             return rejectWithValue(error.response?.data?.message || "Failed to fetch bookings")
//         }
//     },
// )

// export const getCorporateOwnerBookings = createAsyncThunk(
//     "booking/getCorporateOwnerBookings",
//     async ({ status, date } = {}, { rejectWithValue }) => {
//         try {
//             let url = "/bookings/corporate-owner"
//             const params = new URLSearchParams()
//             if (status) params.append("status", status)
//             if (date) params.append("date", date)
//             if (params.toString()) url += `?${params.toString()}`

//             const response = await api.get(url)
//             return response.data
//         } catch (error) {
//             return rejectWithValue(error.response?.data?.message || "Failed to fetch corporate bookings")
//         }
//     },
// )

// export const acceptBooking = createAsyncThunk("booking/acceptBooking", async (bookingId, { rejectWithValue }) => {
//     try {
//         const response = await api.put(`/bookings/${bookingId}/accept`)
//         return response.data
//     } catch (error) {
//         return rejectWithValue(error.response?.data?.message || "Failed to accept booking")
//     }
// })

// export const rejectBooking = createAsyncThunk(
//     "booking/rejectBooking",
//     async ({ bookingId, rejectionReason }, { rejectWithValue }) => {
//         try {
//             const response = await api.put(`/bookings/${bookingId}/reject`, { rejectionReason })
//             return response.data
//         } catch (error) {
//             return rejectWithValue(error.response?.data?.message || "Failed to reject booking")
//         }
//     },
// )

// export const startTrip = createAsyncThunk("booking/startTrip", async (bookingId, { rejectWithValue }) => {
//     try {
//         const response = await api.put(`/bookings/${bookingId}/start`)
//         return response.data
//     } catch (error) {
//         return rejectWithValue(error.response?.data?.message || "Failed to start trip")
//     }
// })

// export const completeBooking = createAsyncThunk("booking/completeBooking", async (bookingId, { rejectWithValue }) => {
//     try {
//         const response = await api.put(`/bookings/${bookingId}/complete`)
//         return response.data
//     } catch (error) {
//         return rejectWithValue(error.response?.data?.message || "Failed to complete booking")
//     }
// })

// export const verifyBookingPayment = createAsyncThunk(
//     "booking/verifyBookingPayment",
//     async ({ sessionId, bookingId }, { rejectWithValue }) => {
//         try {
//             const response = await api.post("/bookings/verify-payment", { sessionId, bookingId })
//             return response.data
//         } catch (error) {
//             return rejectWithValue(error.response?.data?.message || "Failed to verify payment")
//         }
//     },
// )

// const bookingSlice = createSlice({
//     name: "booking",
//     initialState,
//     reducers: {
//         clearBookingError: (state) => {
//             state.error = null
//         },
//         clearBookingData: (state) => {
//             state.currentBooking = null
//             state.bookingCreated = false
//             state.paymentData = null
//         },
//         // eslint-disable-next-line no-unused-vars
//         resetBookingState: (state) => {
//             return initialState
//         },
//         setPaymentData: (state, action) => {
//             state.paymentData = action.payload
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             // Check Availability
//             .addCase(checkRouteAvailability.pending, (state) => {
//                 state.loading = true
//                 state.error = null
//             })
//             .addCase(checkRouteAvailability.fulfilled, (state, action) => {
//                 state.loading = false
//                 state.availabilityData = action.payload
//             })
//             .addCase(checkRouteAvailability.rejected, (state, action) => {
//                 state.loading = false
//                 state.error = action.payload
//             })
//             // Get Available Seats
//             .addCase(getAvailableSeats.pending, (state) => {
//                 state.loading = true
//             })
//             .addCase(getAvailableSeats.fulfilled, (state, action) => {
//                 state.loading = false
//                 state.availabilityData = action.payload
//             })
//             .addCase(getAvailableSeats.rejected, (state, action) => {
//                 state.loading = false
//                 state.error = action.payload
//             })
//             // Create B2C Booking
//             .addCase(createB2CBooking.pending, (state) => {
//                 state.loading = true
//                 state.error = null
//                 state.bookingCreated = false
//             })
//             .addCase(createB2CBooking.fulfilled, (state, action) => {
//                 state.loading = false
//                 state.currentBooking = action.payload?.booking || action.payload || null
//                 state.bookingCreated = true
//                 state.paymentData = action.payload?.paymentData || null
//             })
//             .addCase(createB2CBooking.rejected, (state, action) => {
//                 state.loading = false
//                 state.error = action.payload
//                 state.bookingCreated = false
//             })
//             // Create Corporate Booking
//             .addCase(createCorporateBooking.pending, (state) => {
//                 state.loading = true
//                 state.error = null
//                 state.bookingCreated = false
//             })
//             .addCase(createCorporateBooking.fulfilled, (state, action) => {
//                 state.loading = false
//                 state.currentBooking = action.payload?.booking || action.payload || null
//                 state.bookingCreated = true
//             })
//             .addCase(createCorporateBooking.rejected, (state, action) => {
//                 state.loading = false
//                 state.error = action.payload
//                 state.bookingCreated = false
//             })
//             // Get Passenger Bookings
//             .addCase(getPassengerBookings.pending, (state) => {
//                 state.loading = true
//                 state.error = null
//             })
//             .addCase(getPassengerBookings.fulfilled, (state, action) => {
//                 state.loading = false
//                 state.passengerBookings = action.payload?.bookings || action.payload || []
//                 state.userType = action.payload?.userType || "NORMAL_PASSENGER" // Enhanced getPassengerBookings fulfilled handler to store userType
//             })
//             .addCase(getPassengerBookings.rejected, (state, action) => {
//                 state.loading = false
//                 state.error = action.payload
//             })
//             // Get Partner Bookings
//             .addCase(getPartnerBookings.pending, (state) => {
//                 state.loading = true
//                 state.error = null
//             })
//             .addCase(getPartnerBookings.fulfilled, (state, action) => {
//                 state.loading = false
//                 state.partnerBookings = action.payload?.bookings || action.payload || []
//             })
//             .addCase(getPartnerBookings.rejected, (state, action) => {
//                 state.loading = false
//                 state.error = action.payload
//             })
//             // Get Corporate Owner Bookings
//             .addCase(getCorporateOwnerBookings.pending, (state) => {
//                 state.loading = true
//                 state.error = null
//             })
//             .addCase(getCorporateOwnerBookings.fulfilled, (state, action) => {
//                 state.loading = false
//                 state.corporateOwnerBookings = action.payload?.bookings || action.payload || []
//             })
//             .addCase(getCorporateOwnerBookings.rejected, (state, action) => {
//                 state.loading = false
//                 state.error = action.payload
//             })
//             // Accept Booking
//             .addCase(acceptBooking.pending, (state) => {
//                 state.loading = true
//                 state.error = null
//             })
//             .addCase(acceptBooking.fulfilled, (state, action) => {
//                 state.loading = false
//                 const updatedBooking = action.payload?.booking || action.payload
//                 if (updatedBooking && updatedBooking._id) {
//                     state.partnerBookings = state.partnerBookings.map((b) => (b._id === updatedBooking._id ? updatedBooking : b))
//                 }
//             })
//             .addCase(acceptBooking.rejected, (state, action) => {
//                 state.loading = false
//                 state.error = action.payload
//             })
//             // Reject Booking
//             .addCase(rejectBooking.pending, (state) => {
//                 state.loading = true
//                 state.error = null
//             })
//             .addCase(rejectBooking.fulfilled, (state, action) => {
//                 state.loading = false
//                 const updatedBooking = action.payload?.booking || action.payload
//                 if (updatedBooking && updatedBooking._id) {
//                     state.partnerBookings = state.partnerBookings.map((b) => (b._id === updatedBooking._id ? updatedBooking : b))
//                 }
//             })
//             .addCase(rejectBooking.rejected, (state, action) => {
//                 state.loading = false
//                 state.error = action.payload
//             })

//             // Start Trip
//             .addCase(startTrip.pending, (state) => {
//                 state.loading = true
//                 state.error = null
//             })
//             .addCase(startTrip.fulfilled, (state, action) => {
//                 state.loading = false
//                 const updatedBooking = action.payload?.booking || action.payload
//                 if (updatedBooking && updatedBooking._id) {
//                     state.partnerBookings = state.partnerBookings.map((b) => (b._id === updatedBooking._id ? updatedBooking : b))
//                 }
//             })
//             .addCase(startTrip.rejected, (state, action) => {
//                 state.loading = false
//                 state.error = action.payload
//             })
            
//             // Complete Booking
//             .addCase(completeBooking.pending, (state) => {
//                 state.loading = true
//                 state.error = null
//             })
//             .addCase(completeBooking.fulfilled, (state, action) => {
//                 state.loading = false
//                 const updatedBooking = action.payload?.booking || action.payload
//                 if (updatedBooking && updatedBooking._id) {
//                     state.partnerBookings = state.partnerBookings.map((b) => (b._id === updatedBooking._id ? updatedBooking : b))
//                 }
//             })
//             .addCase(completeBooking.rejected, (state, action) => {
//                 state.loading = false
//                 state.error = action.payload
//             })
//             // Verify Payment
//             .addCase(verifyBookingPayment.pending, (state) => {
//                 state.loading = true
//                 state.error = null
//             })
//             .addCase(verifyBookingPayment.fulfilled, (state, action) => {
//                 state.loading = false
//                 state.currentBooking = action.payload?.booking || action.payload || null
//             })
//             .addCase(verifyBookingPayment.rejected, (state, action) => {
//                 state.loading = false
//                 state.error = action.payload
//             })
//     },
// })

// export const { clearBookingError, clearBookingData, resetBookingState, setPaymentData } = bookingSlice.actions
// export default bookingSlice.reducer

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
// import api from "../../utils/api"

// const initialState = {
//     currentBooking: null,
//     passengerBookings: [],
//     partnerBookings: [],
//     corporateOwnerBookings: [],
//     availabilityData: null,
//     loading: false,
//     error: null,
//     bookingCreated: false,
//     paymentData: null,
// }

// export const checkRouteAvailability = createAsyncThunk(
//     "booking/checkRouteAvailability",
//     async ({ routeId, travelDate }, { rejectWithValue }) => {
//         try {
//             const response = await api.post("/bookings/check-availability", {
//                 routeId,
//                 travelDate,
//             })
//             return response.data
//         } catch (error) {
//             return rejectWithValue(error.response?.data?.message || "Failed to check availability")
//         }
//     },
// )

// export const getAvailableSeats = createAsyncThunk(
//     "booking/getAvailableSeats",
//     async ({ routeId, date }, { rejectWithValue }) => {
//         try {
//             const response = await api.get(`/bookings/available-seats?routeId=${routeId}&date=${date}`)
//             return response.data
//         } catch (error) {
//             return rejectWithValue(error.response?.data?.message || "Failed to get available seats")
//         }
//     },
// )

// export const createB2CBooking = createAsyncThunk(
//     "booking/createB2CBooking",
//     async (bookingData, { rejectWithValue }) => {
//         try {
//             const response = await api.post("/bookings/b2c", bookingData)
//             if (response.data.success === false) {
//                 return rejectWithValue(response.data.message || "Failed to create booking")
//             }
//             return response.data
//         } catch (error) {
//             return rejectWithValue(error.response?.data?.message || "Failed to create booking")
//         }
//     },
// )

// export const createCorporateBooking = createAsyncThunk(
//     "booking/createCorporateBooking",
//     async (bookingData, { rejectWithValue }) => {
//         try {
//             const response = await api.post("/bookings/corporate", bookingData)
//             if (response.data.success === false) {
//                 return rejectWithValue(response.data.message || "Failed to create booking")
//             }
//             return response.data
//         } catch (error) {
//             return rejectWithValue(error.response?.data?.message || "Failed to create booking")
//         }
//     },
// )

// export const getPassengerBookings = createAsyncThunk(
//     "booking/getPassengerBookings",
//     async ({ status, type } = {}, { rejectWithValue }) => {
//         try {
//             let url = "/bookings/passenger"
//             const params = new URLSearchParams()
//             if (status) params.append("status", status)
//             if (type) params.append("type", type)
//             if (params.toString()) url += `?${params.toString()}`

//             const response = await api.get(url)
//             return response.data
//         } catch (error) {
//             return rejectWithValue(error.response?.data?.message || "Failed to fetch bookings")
//         }
//     },
// )

// export const getPartnerBookings = createAsyncThunk(
//     "booking/getPartnerBookings",
//     async ({ status } = {}, { rejectWithValue }) => {
//         try {
//             let url = "/bookings/partner"
//             if (status) url += `?status=${status}`

//             const response = await api.get(url)
//             return response.data
//         } catch (error) {
//             return rejectWithValue(error.response?.data?.message || "Failed to fetch bookings")
//         }
//     },
// )

// export const getCorporateOwnerBookings = createAsyncThunk(
//     "booking/getCorporateOwnerBookings",
//     async ({ status, date } = {}, { rejectWithValue }) => {
//         try {
//             let url = "/bookings/corporate-owner"
//             const params = new URLSearchParams()
//             if (status) params.append("status", status)
//             if (date) params.append("date", date)
//             if (params.toString()) url += `?${params.toString()}`

//             const response = await api.get(url)
//             return response.data
//         } catch (error) {
//             return rejectWithValue(error.response?.data?.message || "Failed to fetch corporate bookings")
//         }
//     },
// )

// export const acceptBooking = createAsyncThunk("booking/acceptBooking", async (bookingId, { rejectWithValue }) => {
//     try {
//         const response = await api.put(`/bookings/${bookingId}/accept`)
//         return response.data
//     } catch (error) {
//         return rejectWithValue(error.response?.data?.message || "Failed to accept booking")
//     }
// })

// export const rejectBooking = createAsyncThunk(
//     "booking/rejectBooking",
//     async ({ bookingId, rejectionReason }, { rejectWithValue }) => {
//         try {
//             const response = await api.put(`/bookings/${bookingId}/reject`, { rejectionReason })
//             return response.data
//         } catch (error) {
//             return rejectWithValue(error.response?.data?.message || "Failed to reject booking")
//         }
//     },
// )

// export const completeBooking = createAsyncThunk("booking/completeBooking", async (bookingId, { rejectWithValue }) => {
//     try {
//         const response = await api.put(`/bookings/${bookingId}/complete`)
//         return response.data
//     } catch (error) {
//         return rejectWithValue(error.response?.data?.message || "Failed to complete booking")
//     }
// })

// export const verifyBookingPayment = createAsyncThunk(
//     "booking/verifyBookingPayment",
//     async ({ sessionId, bookingId }, { rejectWithValue }) => {
//         try {
//             const response = await api.post("/bookings/verify-payment", { sessionId, bookingId })
//             return response.data
//         } catch (error) {
//             return rejectWithValue(error.response?.data?.message || "Failed to verify payment")
//         }
//     },
// )

// const bookingSlice = createSlice({
//     name: "booking",
//     initialState,
//     reducers: {
//         clearBookingError: (state) => {
//             state.error = null
//         },
//         clearBookingData: (state) => {
//             state.currentBooking = null
//             state.bookingCreated = false
//             state.paymentData = null
//         },
//         // eslint-disable-next-line no-unused-vars
//         resetBookingState: (state) => {
//             return initialState
//         },
//         setPaymentData: (state, action) => {
//             state.paymentData = action.payload
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             // Check Availability
//             .addCase(checkRouteAvailability.pending, (state) => {
//                 state.loading = true
//                 state.error = null
//             })
//             .addCase(checkRouteAvailability.fulfilled, (state, action) => {
//                 state.loading = false
//                 state.availabilityData = action.payload
//             })
//             .addCase(checkRouteAvailability.rejected, (state, action) => {
//                 state.loading = false
//                 state.error = action.payload
//             })
//             // Get Available Seats
//             .addCase(getAvailableSeats.pending, (state) => {
//                 state.loading = true
//             })
//             .addCase(getAvailableSeats.fulfilled, (state, action) => {
//                 state.loading = false
//                 state.availabilityData = action.payload
//             })
//             .addCase(getAvailableSeats.rejected, (state, action) => {
//                 state.loading = false
//                 state.error = action.payload
//             })
//             // Create B2C Booking
//             .addCase(createB2CBooking.pending, (state) => {
//                 state.loading = true
//                 state.error = null
//                 state.bookingCreated = false
//             })
//             .addCase(createB2CBooking.fulfilled, (state, action) => {
//                 state.loading = false
//                 state.currentBooking = action.payload?.booking || action.payload || null
//                 state.bookingCreated = true
//                 state.paymentData = action.payload?.paymentData || null
//             })
//             .addCase(createB2CBooking.rejected, (state, action) => {
//                 state.loading = false
//                 state.error = action.payload
//                 state.bookingCreated = false
//             })
//             // Create Corporate Booking
//             .addCase(createCorporateBooking.pending, (state) => {
//                 state.loading = true
//                 state.error = null
//                 state.bookingCreated = false
//             })
//             .addCase(createCorporateBooking.fulfilled, (state, action) => {
//                 state.loading = false
//                 state.currentBooking = action.payload?.booking || action.payload || null
//                 state.bookingCreated = true
//             })
//             .addCase(createCorporateBooking.rejected, (state, action) => {
//                 state.loading = false
//                 state.error = action.payload
//                 state.bookingCreated = false
//             })
//             // Get Passenger Bookings
//             .addCase(getPassengerBookings.pending, (state) => {
//                 state.loading = true
//                 state.error = null
//             })
//             .addCase(getPassengerBookings.fulfilled, (state, action) => {
//                 state.loading = false
//                 state.passengerBookings = action.payload?.bookings || action.payload || []
//             })
//             .addCase(getPassengerBookings.rejected, (state, action) => {
//                 state.loading = false
//                 state.error = action.payload
//             })
//             // Get Partner Bookings
//             .addCase(getPartnerBookings.pending, (state) => {
//                 state.loading = true
//                 state.error = null
//             })
//             .addCase(getPartnerBookings.fulfilled, (state, action) => {
//                 state.loading = false
//                 state.partnerBookings = action.payload?.bookings || action.payload || []
//             })
//             .addCase(getPartnerBookings.rejected, (state, action) => {
//                 state.loading = false
//                 state.error = action.payload
//             })
//             // Get Corporate Owner Bookings
//             .addCase(getCorporateOwnerBookings.pending, (state) => {
//                 state.loading = true
//                 state.error = null
//             })
//             .addCase(getCorporateOwnerBookings.fulfilled, (state, action) => {
//                 state.loading = false
//                 state.corporateOwnerBookings = action.payload?.bookings || action.payload || []
//             })
//             .addCase(getCorporateOwnerBookings.rejected, (state, action) => {
//                 state.loading = false
//                 state.error = action.payload
//             })
//             // Accept Booking
//             .addCase(acceptBooking.pending, (state) => {
//                 state.loading = true
//                 state.error = null
//             })
//             .addCase(acceptBooking.fulfilled, (state, action) => {
//                 state.loading = false
//                 const updatedBooking = action.payload?.booking || action.payload
//                 if (updatedBooking && updatedBooking._id) {
//                     state.partnerBookings = state.partnerBookings.map((b) => (b._id === updatedBooking._id ? updatedBooking : b))
//                 }
//             })
//             .addCase(acceptBooking.rejected, (state, action) => {
//                 state.loading = false
//                 state.error = action.payload
//             })
//             // Reject Booking
//             .addCase(rejectBooking.pending, (state) => {
//                 state.loading = true
//                 state.error = null
//             })
//             .addCase(rejectBooking.fulfilled, (state, action) => {
//                 state.loading = false
//                 const updatedBooking = action.payload?.booking || action.payload
//                 if (updatedBooking && updatedBooking._id) {
//                     state.partnerBookings = state.partnerBookings.map((b) => (b._id === updatedBooking._id ? updatedBooking : b))
//                 }
//             })
//             .addCase(rejectBooking.rejected, (state, action) => {
//                 state.loading = false
//                 state.error = action.payload
//             })
//             // Complete Booking
//             .addCase(completeBooking.pending, (state) => {
//                 state.loading = true
//                 state.error = null
//             })
//             .addCase(completeBooking.fulfilled, (state, action) => {
//                 state.loading = false
//                 const updatedBooking = action.payload?.booking || action.payload
//                 if (updatedBooking && updatedBooking._id) {
//                     state.partnerBookings = state.partnerBookings.map((b) => (b._id === updatedBooking._id ? updatedBooking : b))
//                 }
//             })
//             .addCase(completeBooking.rejected, (state, action) => {
//                 state.loading = false
//                 state.error = action.payload
//             })
//             // Verify Payment
//             .addCase(verifyBookingPayment.pending, (state) => {
//                 state.loading = true
//                 state.error = null
//             })
//             .addCase(verifyBookingPayment.fulfilled, (state, action) => {
//                 state.loading = false
//                 state.currentBooking = action.payload?.booking || action.payload || null
//             })
//             .addCase(verifyBookingPayment.rejected, (state, action) => {
//                 state.loading = false
//                 state.error = action.payload
//             })
//     },
// })

// export const { clearBookingError, clearBookingData, resetBookingState, setPaymentData } = bookingSlice.actions
// export default bookingSlice.reducer

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../utils/api"

const initialState = {
    currentBooking: null,
    passengerBookings: [],
    partnerBookings: [],
    corporateOwnerBookings: [],
    availabilityData: null,
    loading: false,
    error: null,
    bookingCreated: false,
    paymentData: null,
    userType: "NORMAL_PASSENGER", // Added userType to initialState
}

export const checkRouteAvailability = createAsyncThunk(
    "booking/checkRouteAvailability",
    async ({ routeId, travelDate }, { rejectWithValue }) => {
        try {
            const response = await api.post("/bookings/check-availability", {
                routeId,
                travelDate,
            })
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to check availability")
        }
    },
)

export const getAvailableSeats = createAsyncThunk(
    "booking/getAvailableSeats",
    async ({ routeId, date }, { rejectWithValue }) => {
        try {
            const response = await api.get(`/bookings/available-seats?routeId=${routeId}&date=${date}`)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to get available seats")
        }
    },
)

export const createB2CBooking = createAsyncThunk(
    "booking/createB2CBooking",
    async (bookingData, { rejectWithValue }) => {
        try {
            const response = await api.post("/bookings/b2c", bookingData)
            if (response.data.success === false) {
                return rejectWithValue(response.data.message || "Failed to create booking")
            }
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to create booking")
        }
    },
)

export const createCorporateBooking = createAsyncThunk(
    "booking/createCorporateBooking",
    async (bookingData, { rejectWithValue }) => {
        try {
            const response = await api.post("/bookings/corporate", bookingData)
            if (response.data.success === false) {
                return rejectWithValue(response.data.message || "Failed to create booking")
            }
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to create booking")
        }
    },
)

export const getPassengerBookings = createAsyncThunk(
    "booking/getPassengerBookings",
    async ({ status, type, silent = false } = {}, { rejectWithValue }) => {
        try {
            let url = "/bookings/passenger"
            const params = new URLSearchParams()
            if (status) params.append("status", status)
            if (type) params.append("type", type)
            if (params.toString()) url += `?${params.toString()}`

            const response = await api.get(url)
            return { data: response.data, silent }
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch bookings")
        }
    },
)

export const getPartnerBookings = createAsyncThunk(
    "booking/getPartnerBookings",
    async ({ status } = {}, { rejectWithValue }) => {
        try {
            let url = "/bookings/partner"
            if (status) url += `?status=${status}`

            const response = await api.get(url)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch bookings")
        }
    },
)

export const getCorporateOwnerBookings = createAsyncThunk(
    "booking/getCorporateOwnerBookings",
    async ({ status, date } = {}, { rejectWithValue }) => {
        try {
            let url = "/bookings/corporate-owner"
            const params = new URLSearchParams()
            if (status) params.append("status", status)
            if (date) params.append("date", date)
            if (params.toString()) url += `?${params.toString()}`

            const response = await api.get(url)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch corporate bookings")
        }
    },
)

export const acceptBooking = createAsyncThunk("booking/acceptBooking", async (bookingId, { rejectWithValue }) => {
    try {
        const response = await api.put(`/bookings/${bookingId}/accept`)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: "Failed to accept booking" })
    }
})

export const rejectBooking = createAsyncThunk(
    "booking/rejectBooking",
    async ({ bookingId, rejectionReason }, { rejectWithValue }) => {
        try {
            const response = await api.put(`/bookings/${bookingId}/reject`, { rejectionReason })
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to reject booking")
        }
    },
)

export const startTrip = createAsyncThunk("booking/startTrip", async (bookingId, { rejectWithValue }) => {
    try {
        const response = await api.put(`/bookings/${bookingId}/start`)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to start trip")
    }
})

export const completeBooking = createAsyncThunk("booking/completeBooking", async (bookingId, { rejectWithValue }) => {
    try {
        const response = await api.put(`/bookings/${bookingId}/complete`)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to complete booking")
    }
})

export const verifyBookingPayment = createAsyncThunk(
    "booking/verifyBookingPayment",
    async ({ sessionId, bookingId }, { rejectWithValue }) => {
        try {
            const response = await api.post("/bookings/verify-payment", { sessionId, bookingId })
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to verify payment")
        }
    },
)

const bookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {
        clearBookingError: (state) => {
            state.error = null
        },
        clearBookingData: (state) => {
            state.currentBooking = null
            state.bookingCreated = false
            state.paymentData = null
        },
        // eslint-disable-next-line no-unused-vars
        resetBookingState: (state) => {
            return initialState
        },
        setPaymentData: (state, action) => {
            state.paymentData = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            // Check Availability
            .addCase(checkRouteAvailability.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(checkRouteAvailability.fulfilled, (state, action) => {
                state.loading = false
                state.availabilityData = action.payload
            })
            .addCase(checkRouteAvailability.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            // Get Available Seats
            .addCase(getAvailableSeats.pending, (state) => {
                state.loading = true
            })
            .addCase(getAvailableSeats.fulfilled, (state, action) => {
                state.loading = false
                state.availabilityData = action.payload
            })
            .addCase(getAvailableSeats.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            // Create B2C Booking
            .addCase(createB2CBooking.pending, (state) => {
                state.loading = true
                state.error = null
                state.bookingCreated = false
            })
            .addCase(createB2CBooking.fulfilled, (state, action) => {
                state.loading = false
                state.currentBooking = action.payload?.booking || action.payload || null
                state.bookingCreated = true
                state.paymentData = action.payload?.paymentData || null
            })
            .addCase(createB2CBooking.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.bookingCreated = false
            })
            // Create Corporate Booking
            .addCase(createCorporateBooking.pending, (state) => {
                state.loading = true
                state.error = null
                state.bookingCreated = false
            })
            .addCase(createCorporateBooking.fulfilled, (state, action) => {
                state.loading = false
                state.currentBooking = action.payload?.booking || action.payload || null
                state.bookingCreated = true
            })
            .addCase(createCorporateBooking.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.bookingCreated = false
            })
            // Get Passenger Bookings
            .addCase(getPassengerBookings.pending, (state, action) => {
                if (!action.meta.arg?.silent) {
                    state.loading = true
                }
                state.error = null
            })
            .addCase(getPassengerBookings.fulfilled, (state, action) => {
                state.loading = false
                state.passengerBookings = action.payload?.data.bookings || action.payload.data || []
                state.userType = action.payload?.userType || "NORMAL_PASSENGER" // Enhanced getPassengerBookings fulfilled handler to store userType
            })
            .addCase(getPassengerBookings.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            // Get Partner Bookings
            .addCase(getPartnerBookings.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getPartnerBookings.fulfilled, (state, action) => {
                state.loading = false
                state.partnerBookings = action.payload?.bookings || action.payload || []
            })
            .addCase(getPartnerBookings.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            // Get Corporate Owner Bookings
            .addCase(getCorporateOwnerBookings.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getCorporateOwnerBookings.fulfilled, (state, action) => {
                state.loading = false
                state.corporateOwnerBookings = action.payload?.bookings || action.payload || []
            })
            .addCase(getCorporateOwnerBookings.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            // Accept Booking
            .addCase(acceptBooking.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(acceptBooking.fulfilled, (state, action) => {
                state.loading = false
                const updatedBooking = action.payload?.booking || action.payload
                if (updatedBooking && updatedBooking._id) {
                    state.partnerBookings = state.partnerBookings.map((b) => (b._id === updatedBooking._id ? updatedBooking : b))
                }
            })
            .addCase(acceptBooking.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            // Reject Booking
            .addCase(rejectBooking.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(rejectBooking.fulfilled, (state, action) => {
                state.loading = false
                const updatedBooking = action.payload?.booking || action.payload
                if (updatedBooking && updatedBooking._id) {
                    state.partnerBookings = state.partnerBookings.map((b) => (b._id === updatedBooking._id ? updatedBooking : b))
                }
            })
            .addCase(rejectBooking.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            // Start Trip
            .addCase(startTrip.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(startTrip.fulfilled, (state, action) => {
                state.loading = false
                const updatedBooking = action.payload?.booking || action.payload
                if (updatedBooking && updatedBooking._id) {
                    state.partnerBookings = state.partnerBookings.map((b) => (b._id === updatedBooking._id ? updatedBooking : b))
                }
            })
            .addCase(startTrip.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            // Complete Booking
            .addCase(completeBooking.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(completeBooking.fulfilled, (state, action) => {
                state.loading = false
                const updatedBooking = action.payload?.booking || action.payload
                if (updatedBooking && updatedBooking._id) {
                    state.partnerBookings = state.partnerBookings.map((b) => (b._id === updatedBooking._id ? updatedBooking : b))
                }
            })
            .addCase(completeBooking.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            // Verify Payment
            .addCase(verifyBookingPayment.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(verifyBookingPayment.fulfilled, (state, action) => {
                state.loading = false
                state.currentBooking = action.payload?.booking || action.payload || null
            })
            .addCase(verifyBookingPayment.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    },
})

export const { clearBookingError, clearBookingData, resetBookingState, setPaymentData } = bookingSlice.actions
export default bookingSlice.reducer
