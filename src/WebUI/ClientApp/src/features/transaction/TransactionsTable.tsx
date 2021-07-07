import Pagination from "../../components/Pagination";
import React, { useState } from "react";
import { ITransactionDto } from "../../api/web-api-client";
import moment from "moment";

interface IProps {
  transactions: ITransactionDto[];
}

export function TransactionsTable({ transactions = [] }: IProps) {
  const [pageIndex, setPageIndex] = useState<number>(1);

  const pageSize = 10;
  const totalCount = transactions.length;
  const totalPages = Math.ceil(totalCount / pageSize);

  function paginatedData(data: ITransactionDto[]) {
    const startIndex = pageIndex * pageSize - pageSize;
    const endIndex = startIndex + pageSize;
    return data.slice(startIndex, endIndex);
  }

  return (
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
                  {paginatedData(transactions)?.map(
                    (transaction, transactionIdx) => (
                      <tr
                        key={transaction.id}
                        className={
                          transactionIdx % 2 === 0 ? "bg-white" : "bg-gray-50"
                        }
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {moment(transaction.date).format("DD/MM/YYYY")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {transaction.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {transaction.type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {transaction.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-cyan-600 hover:text-cyan-900">
                            Edit
                          </button>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
              {totalCount! > 10 ? (
                <Pagination
                  currentPage={pageIndex}
                  totalPages={totalPages}
                  totalCount={totalCount}
                  onPageChange={(page) => setPageIndex(page)}
                />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
