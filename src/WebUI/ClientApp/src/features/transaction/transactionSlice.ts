import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
  createTransactionSlider: {
    isOpen: boolean;
  };
}

const initialState: IState = {
  createTransactionSlider: {
    isOpen: false,
  },
};

export const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    isCreateTransactionSliderOpen: function (
      state,
      action: PayloadAction<boolean>
    ) {
      state.createTransactionSlider.isOpen = action.payload;
    },
  },
});

export const { isCreateTransactionSliderOpen } = transactionSlice.actions;

export default transactionSlice.reducer;
