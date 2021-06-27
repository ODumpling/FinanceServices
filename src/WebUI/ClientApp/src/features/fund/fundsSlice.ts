import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IFundDto2, IFundVm, IPaginatedListOfFundDto} from "../../api/web-api-client";
import {financeApi} from "../../api/financeApi";


// Define a type for the slice state
interface FundState {
    funds: IPaginatedListOfFundDto | undefined,
    fundVm: IFundVm | undefined,
}

// Define the initial state using that type
const initialState: FundState = {
    funds: {},
    fundVm: {},
}

interface IPaginationProps {
    page: number
    size: number
}

interface IFetchFundProps extends IPaginationProps {
    id: string
}

export const fetchFunds = createAsyncThunk("funds/fetchFunds", async function ({
                                                                                   page,
                                                                                   size
                                                                               }: IPaginationProps, thunkAPI) {
    const response = await financeApi().then(client => client.funds_ListFunds(page, size));
    return response.funds;
})

export const fetchFund = createAsyncThunk("funds/fetchFunds", async function ({
                                                                                  id,
                                                                                  page,
                                                                                  size
                                                                              }: IFetchFundProps, thunkAPI) {
    return await financeApi().then(client => client.funds_GetFund(id, page, size));
})


export const fundsSlice = createSlice({
    name: 'funds',
    initialState,
    reducers: {
        setFunds: (state, action: PayloadAction<IPaginatedListOfFundDto>) => {
            state.funds = action.payload
        },
    },
    extraReducers: function (builder) {
        builder.addCase(fetchFunds.fulfilled, ((state, action) => {
            state.funds = action.payload
        }))
        // builder.addCase(fetchFund.fulfilled, ((state, action) => {
        //     state.fundVm = action.payload;
        // }))
    }
})

export const {setFunds} = fundsSlice.actions

export default fundsSlice.reducer


