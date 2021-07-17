import Pagination from "../../components/Pagination";
import React from "react";
import { Link } from "react-router-dom";
import { IPaginatedListOfFundDto } from "../../api/web-api-client";

interface IProps {
  funds: IPaginatedListOfFundDto;
  currentPage: (page: number) => void;
  editFund:(id: string) => void;
}

export function FundsTable({
  funds: { items = [], totalCount, pageIndex, totalPages },
  currentPage, editFund
}: IProps) {
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
                      Fund Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Expenses (Total)
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Income (Total)
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Balance (Total)
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items?.map((fund, fundIdx) => (
                    <tr
                      key={fund.id}
                      className={fundIdx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {fund.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {fund.balance}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                            onClick={() => editFund(fund.id!)}
                            className="text-cyan-600 hover:text-cyan-900 font-medium">
                          Edit
                        </button>
                        <Link
                          to={"funds/" + fund.id}
                          className="text-cyan-600 hover:text-cyan-900 ml-2"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {totalCount! > 10 ? (
                <Pagination
                  currentPage={pageIndex}
                  totalPages={totalPages}
                  totalCount={totalCount}
                  onPageChange={(data) => currentPage(data)}
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
