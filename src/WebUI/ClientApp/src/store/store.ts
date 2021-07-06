import { configureStore } from "@reduxjs/toolkit";
import fundReducer from "../features/fund/fundsSlice";
import memberReducer from "../features/member/memberSlice";

export const store = configureStore({
  reducer: {
    funds: fundReducer,
    members: memberReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
