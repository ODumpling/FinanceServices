import Pagination from "../../components/Pagination";
import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {useQuery} from "../../hooks/useQuery";
import {Link, useHistory} from "react-router-dom";
import {fetchFunds} from "./fundsSlice";

export function FundsTable() {

    const query = useQuery();
    const page = query.get("page");
    const history = useHistory();
    const dispatch = useAppDispatch();

    const {items, totalCount, pageIndex, totalPages} = useAppSelector((state) => state.funds.listOfFunds);

    useEffect(() => {
        async function getfunds(page: number = 1, size: number = 10) {
            await dispatch(fetchFunds({page, size}));
        }

        const current = page ? parseInt(page) : 1;
        getfunds(current).then();
    }, [page, dispatch]);

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
                                {items?.map(
                                    (fund, fundIdx) => (
                                        <tr
                                            key={fund.id}
                                            className={
                                                fundIdx % 2 === 0
                                                    ? "bg-white"
                                                    : "bg-gray-50"
                                            }
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {fund.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {fund.balance}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Link to={"funds/" + fund.id} className="text-cyan-600 hover:text-cyan-900">
                                                    View
                                                </Link>
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
                                    onPageChange={(data) => changePage(data)}
                                />) : "" }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
