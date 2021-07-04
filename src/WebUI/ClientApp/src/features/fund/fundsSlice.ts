import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IFundVm, IPaginatedListOfFundDto} from "../../api/web-api-client";
import {financeApi} from "../../api/financeApi";

// Define a type for the slice state
interface FundState {
    listOfFunds: IPaginatedListOfFundDto;
    selectedFund: IFundVm;
}

// Define the initial state using that type
const initialState: FundState = {
    listOfFunds : {
        items : [],
        pageIndex: 0,
        totalPages: 0,
        totalCount: 0,
        hasPreviousPage: false,
        hasNextPage: false,
    },
    selectedFund: {},
};

interface IPaginationProps {
    page: number;
    size: number;
}

interface IFetchFundProps extends IPaginationProps {
    id: string;
}

export const fetchFunds = createAsyncThunk(
    "funds/fetchFunds",
    async function ({page, size}: IPaginationProps, thunkAPI) {
        const response = await financeApi().then((client) =>
            client.funds_ListFunds(page, size)
        );
        return response.funds;
    }
);

export const fetchFund = createAsyncThunk(
    "funds/fetchSelectedFund",
    async function ({id, page, size}: IFetchFundProps, thunkAPI) {
        return await financeApi().then((client) =>
            client.funds_GetFund(id, page, size)
        );
    }
);

export const fundsSlice = createSlice({
    name         : "funds",
    initialState,
    reducers     : {
        setFunds: function(state, action: PayloadAction<IPaginatedListOfFundDto>) {
            state.listOfFunds = action.payload;
        },
    },
    extraReducers: function (builder) {
        builder.addCase(fetchFunds.fulfilled, function (state, action) {
            state.listOfFunds = action.payload!;
        });
        builder.addCase(fetchFund.fulfilled, function (state, action) {
            state.selectedFund = action.payload;
        });
    },
});

export const {setFunds} = fundsSlice.actions;

export default fundsSlice.reducer;
