import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { financeApi } from "../api/financeApi";
import {
  CreateTransactionCommand,
  TransactionType,
} from "../api/web-api-client";
import { object, string, z } from "zod";

//TODO:: form state needs to be change but requires Controller component
export const transactionFormSchema = object({
  amount: string(),
  //TODO:: change type to native enum
  type: string(),
  description: string(),
  //TODO:: change date to date
  date: string(),
});

type transactionSubmission = z.infer<typeof transactionFormSchema>;

interface IProps {
  fundId: string;
  formId: string;
  hasSubmit: (data: string) => void;
}

export function CreateTransactionForm({ fundId, formId, hasSubmit }: IProps) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(transactionFormSchema),
  });

  async function createTransaction(data: transactionSubmission) {
    const client = await financeApi();
    const command = CreateTransactionCommand.fromJS(data);
    command.type = parseInt(data.type);
    command.amount = parseInt(data.amount);
    command.fundId = fundId;
    client.transactions_CreateTransaction(command).then((res) => {
      reset({ amount: "", date: "", type: "", description: "" });
      hasSubmit(res);
    });
  }

  function transactionArray() {
    const transactionTypes = [];
    for (const [propertyKey, propertyValue] of Object.entries(
      TransactionType
    )) {
      if (!Number.isNaN(Number(propertyKey))) {
        continue;
      }
      transactionTypes.push({ value: propertyValue, name: propertyKey });
    }

    return transactionTypes;
  }

  return (
    <div className="px-3 py-2">
      <form id={formId} onSubmit={handleSubmit(createTransaction)}>
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
  );
}
