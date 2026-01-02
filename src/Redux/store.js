import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/authSlice"
import vehicleReducer from "./slices/vehicleSlice"
import quotationReducer from "./slices/quotationSlice"
import contractReducer from "./slices/contractSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        vehicles: vehicleReducer,
        quotation: quotationReducer,
        contract: contractReducer,
    },
})

export default store
