import { configureStore } from '@reduxjs/toolkit'
import fundReducer from "../features/fund/fundsSlice";

export const store = configureStore({
    reducer: {
        funds: fundReducer,
    },
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
