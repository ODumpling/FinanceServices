import {useAppDispatch, useAppSelector} from "../../hooks";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {CreateTransactionCommand, TransactionType} from "../../api/web-api-client";
import {object, string, z} from "zod";
import Slider from "../../components/Slider";
import {getFundById} from "../fund/fundsSlice";
import {financeApi} from "../../api/financeApi";
import {Fragment} from "react";
import {isCreateTransactionSliderOpen} from "./transactionSlice";


export const transactionFormSchema = object({
    amount: string(),
    type: string(),
    description: string(),
    date: string(),
});

type transactionSubmission = z.infer<typeof transactionFormSchema>;


export function CreateTransactionSlider() {
    const dispatch = useAppDispatch();
    const {createFundSlider: {isOpen}, selectedFund: {fund}} = useAppSelector(state => state.funds);


    const {
        register,
        reset,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: zodResolver(transactionFormSchema),
    });

    async function createTransaction(data: transactionSubmission) {
        const command = CreateTransactionCommand.fromJS(data);
        command.type = parseInt(data.type);
        command.amount = parseInt(data.amount);
        command.fundId = fund!.id;
        
        console.log(command);
        
        const result = (await financeApi()).transactions_CreateTransaction(command);


        result.then(res => {
             dispatch(getFundById(command.fundId!, 1,10));
            reset({ amount: "", date: "", type: "", description: "" });
        })
    }

    function transactionArray() {
        const transactionTypes = [];
        for (const [propertyKey, propertyValue] of Object.entries(
            TransactionType
        )) {
            if (!Number.isNaN(Number(propertyKey))) {
                continue;
            }
            transactionTypes.push({value: propertyValue, name: propertyKey});
        }

        return transactionTypes;
    }


    return (
        <Fragment>
            <Slider formName="createTransaction" title="Create New Transaction"
                    handleClose={() => dispatch(isCreateTransactionSliderOpen(false))} isOpen={isOpen}>
                <div className="px-3 py-2">
                    <form id="createTransaction" onSubmit={handleSubmit(createTransaction)}>
                        <label
                            htmlFor="amount"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Amount
                        </label>
                        <input
                            {...register("amount")}
                            type="text"
                            id="price"
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            placeholder="0.00"
                            aria-describedby="transaction-amount"
                        />
                        <p>{errors.amount?.message}</p>
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Description
                        </label>
                        <input
                            {...register("description")}
                            type="text"
                            id="description"
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            aria-describedby="transaction-description"
                        />
                        <p>{errors.description?.message}</p>

                        <label
                            htmlFor="date"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Date
                        </label>
                        <input
                            {...register("date")}
                            type="date"
                            id="date"
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            aria-describedby="transaction-date"
                        />
                        <p>{errors.date?.message}</p>
                        <label
                            htmlFor="type"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Type
                        </label>
                        <select
                            {...register("type")}
                            id="type"
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            aria-describedby="transaction type"
                        >
                            {transactionArray().map((type) => (
                                <option key={type.value} value={type.value}>
                                    {type.name}
                                </option>
                            ))}
                        </select>
                        <p>{errors.type?.message}</p>
                    </form>
                </div>
            </Slider>
        </Fragment>
    )
}