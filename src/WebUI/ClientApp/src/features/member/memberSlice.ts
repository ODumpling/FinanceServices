import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMemberDto } from "../../api/web-api-client";
import { AppDispatch } from "../../store/store";
import { financeApi } from "../../api/financeApi";

interface IState {
  allMembers: IMemberDto[];
}

const initialState: IState = {
  allMembers: [],
};
export const memberSlice = createSlice({
  name: "members",
  initialState,
  reducers: {
    setMembers: function (state, action: PayloadAction<IMemberDto[]>) {
      state.allMembers = action.payload;
    },
  },
});

export default memberSlice.reducer;

export const { setMembers } = memberSlice.actions;

export const getAllMembers = () => async (dispatch: AppDispatch) => {
  try {
    const response = await (await financeApi()).memberships_GetMembers(null);
    dispatch(setMembers(response));
  } catch (e) {
    return console.error(e.message);
  }
};
