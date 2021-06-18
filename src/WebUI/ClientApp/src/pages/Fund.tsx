import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {fsapi} from "../api/fsapi";
import {CreateTransactionCommand, IFundDto2, IPaginatedListOfTransactionDto, ITypeDto, TransactionType,} from "../api/web-api-client";
import {ScaleIcon} from "@heroicons/react/solid";
import Slideover from "../components/Slideover";
import {object, string, z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import moment from "moment";
import {useQuery} from "../hooks/useQuery";
import Pagination from "../components/Pagination";
import {PageHeader} from "../components/PageHeader";

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

export function Fund() {
  const [fund, setFund] = useState<IFundDto2>();
  const [transactions, setTransactions] =
    useState<IPaginatedListOfTransactionDto>();
  const [transactionTypes, setTransactionTypes] = useState<ITypeDto[]>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const query = useQuery();
  const history = useHistory();
  const page = query.get("page");

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(transactionFormSchema),
  });

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    async function getFund(id: string, page: number = 1, size: number = 10) {
      const client = await fsapi();

      client.funds_GetFund(id, page, size).then((data) => {
        setTransactions(data.transactions);
        setTransactionTypes(data.transactionTypes);
        setFund(data.fund);
      });
    }

    const currentPage = page ? parseInt(page) : 1;
    getFund(id, currentPage).catch((e) =>
      console.error("Fund Page has Error", e)
    );
  }, [id, page]);

  function changePage(page: number | string) {
    if (page === "..") {
      const current = query.get("page");
      page = parseInt(current! ? current! : "1") - 2;
    }

    if (page === "...") {
      const current = query.get("page");
      page = parseInt(current! ? current! : "1") + 3;
    }
    query.set("page", page.toString());
    history.push("?" + query.toString());
  }

  async function createTransaction(data: transactionSubmission) {
    setIsOpen(false);
    const client = await fsapi();
    const command = CreateTransactionCommand.fromJS(data);
    command.type = parseInt(data.type);
    command.amount = parseInt(data.amount);
    command.fundId = fund?.id;
    client.transactions_CreateTransaction(command).then((res) => {
      reset({ amount: "", date: "", type: "", description: "" });
      setTransactions({
        ...transactions,
        items: [
          ...transactions?.items!,
          {
            id: res,
            type: command.type!.toString(),
            date: command.date,
            amount: command.amount,
            description: command.description,
          },
        ],
      });
      if (command.type === TransactionType.Expense) {
        const balance = (fund!.balance! -= command.amount!);
        const expenses = (fund!.expenses! += command.amount!);
        setFund({ ...fund, balance, expenses });
      }
      if (command.type === TransactionType.Income) {
        const balance = (fund!.balance! += command.amount!);
        const income = (fund!.income! += command.amount!);
        setFund({ ...fund, balance, income });
      }
    });
  }

  function getCards() {
    const cards = [];
    if (fund) {
      cards.push(
        {
          name: "Total Account Balance",
          href: "#",
          icon: ScaleIcon,
          amount: "£" + fund.balance,
        },
        {
          name: "Total Account Income",
          href: "#",
          icon: ScaleIcon,
          amount: "£" + fund.income,
        },
        {
          name: "Total Account Expense",
          href: "#",
          icon: ScaleIcon,
          amount: "£" + fund.expenses,
        }
      );
    }

    return cards;
  }


  function createTransactionForm() {
    return (
        <Slideover
            title="New Transaction"
            description="Create a new transaction."
            isOpen={isOpen}
            handleClose={() => setIsOpen(false)}
            formName="createTransaction"
        >
          <div className="px-3 py-2">
            <form
                id="createTransaction"
                onSubmit={handleSubmit(createTransaction)}
            >
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
                {transactionTypes?.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.name}
                    </option>
                ))}
              </select>
              <p>{errors.type?.message}</p>
            </form>
          </div>
        </Slideover>
    )
  }

  return (
    <div>
      <PageHeader title={fund?.name + " Fund"} />

      <div className="mt-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg leading-6 font-medium text-gray-900">
            Overview
          </h2>
          <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {/* Card */}
            {getCards().map((card) => (
              <div
                key={card.name}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <card.icon
                        className="h-6 w-6 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          {card.name}
                        </dt>
                        <dd>
                          <div className="text-lg font-medium text-gray-900">
                            {card.amount}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="max-w-6xl mx-auto flex justify-between mt-8 px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg leading-6 font-medium text-gray-900 ">
            Transaction Activity
          </h2>
          <button
            onClick={() => setIsOpen(true)}
            type="button"
            className="items-center px-2.5 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
          >
            Create Transaction
          </button>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Amount
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Type
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Description
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions?.items?.map(
                        (transaction, transactionIdx) => (
                          <tr
                            key={transaction.id}
                            className={
                              transactionIdx % 2 === 0
                                ? "bg-white"
                                : "bg-gray-50"
                            }
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {moment(transaction.date).format("DD/MM/YYYY")}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {"£" + transaction.amount}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              { TransactionType[parseInt(transaction.type!)] }
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {transaction.description}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button className="text-indigo-600 hover:text-indigo-900">
                                Edit
                              </button>
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                  {transactions?.totalCount! > 10 ? (
                    <Pagination
                      currentPage={transactions?.pageIndex}
                      totalPages={transactions?.totalPages}
                      totalCount={transactions?.totalCount}
                      onPageChange={(data) => changePage(data)}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {createTransactionForm()}
    </div>
  );
}
