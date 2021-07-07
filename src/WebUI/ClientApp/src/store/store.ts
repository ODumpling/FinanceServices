import { configureStore } from "@reduxjs/toolkit";
import fundReducer from "../features/fund/fundsSlice";
import memberReducer from "../features/member/memberSlice";
import transactionReducer from "../features/transaction/transactionSlice";

export const store = configureStore({
  reducer: {
    funds: fundReducer,
    transactions: transactionReducer,
    members: memberReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
