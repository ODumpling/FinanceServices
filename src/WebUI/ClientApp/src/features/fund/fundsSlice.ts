import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    IFundsVm,
    IFundVm, IGetFundMembersVm, IMemberDto,
    IPaginatedListOfFundDto,
} from "../../api/web-api-client";
import {financeApi} from "../../api/financeApi";
import {AppDispatch} from "../../store/store";
import {setMembers} from "../member/memberSlice";

// Define a type for the slice state
interface FundState {
    listOfFunds: IPaginatedListOfFundDto;
    selectedFund: IFundVm;
    members: IMemberDto[];
    createFundSlider: {
        isOpen: boolean
    }
}

// Define the initial state using that type
const initialState: FundState = {
    listOfFunds: {
        items: [],
        pageIndex: 0,
        totalPages: 0,
        totalCount: 0,
        hasPreviousPage: false,
        hasNextPage: false,
    },
    selectedFund: {},
    members: [],
    createFundSlider: {
        isOpen: false
    }
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
    name: "funds",
    initialState,
    reducers: {
        setFunds: function (state, action: PayloadAction<IFundsVm>) {
            const {funds} = action.payload;
            state.listOfFunds = funds!;
        },
        setSelectedFund: function (state, action: PayloadAction<IFundVm>) {
            state.selectedFund = action.payload;
        },
        setFundMembers: function (state, action: PayloadAction<IGetFundMembersVm>) {
            const {members} = action.payload;
            state.members = members!;
        },
        isCreateSliderOpen: function (state, action: PayloadAction<boolean>) {
            state.createFundSlider.isOpen = action.payload;
        }
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

export const {setFunds, setSelectedFund, setFundMembers, isCreateSliderOpen} = fundsSlice.actions;

export default fundsSlice.reducer;

export const getFunds =
    (page: number, size: number) => async (dispatch: AppDispatch) => {
        try {
            const response = await (await financeApi()).funds_ListFunds(page, size);

            dispatch(setFunds(response.toJSON()));
        } catch (e) {
            return console.error(e.message);
        }
    };

export const getFundById =
    (id: string, page: number, size: number) => async (dispatch: AppDispatch) => {
        try {
            const response = await (await financeApi()).funds_GetFund(id, page, size);

            dispatch(setSelectedFund(response.toJSON()));
        } catch (e) {
            return console.error(e.message);
        }
    };

export const getFundMembers = (id: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await (await financeApi()).funds_GetFundMembers(id);

        dispatch(setFundMembers(response.toJSON()));
    } catch (e) {
        return console.error(e.message);
    }
}
