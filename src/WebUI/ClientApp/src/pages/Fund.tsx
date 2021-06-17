import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {fsapi} from "../api/fsapi";
import {IFundVm} from "../api/web-api-client";
import {ScaleIcon} from "@heroicons/react/solid";


export function Fund() {

    const [vm, setVm] = useState<IFundVm>()

    const {id} = useParams<{ id: string }>();

    useEffect(() => {
        async function getFund(id: string, page: number = 1, size: number = 10) {
            const client = await fsapi();

            client.funds_GetFund(id, page, size).then(data => setVm(data))
        }

        getFund(id).catch(e => console.error("Fund Page has Error"));
    }, [id])

    function getCards() {
        const fund = vm?.fund
        const cards = [];
        if (fund) {
            cards.push({name: 'Account Balance', href: '#', icon: ScaleIcon, amount: '£' + fund.balance},)
            cards.push({name: 'Account Income', href: '#', icon: ScaleIcon, amount: '£' + fund.income},)
            cards.push({name: 'Account Expense', href: '#', icon: ScaleIcon, amount: '£' + fund.expenses},)
        }

        return cards
    }

    return (
        <div>

            <div className="mt-8">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-lg leading-6 font-medium text-gray-900">Overview</h2>
                    <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {/* Card */}
                        {getCards().map((card) => (
                            <div key={card.name} className="bg-white overflow-hidden shadow rounded-lg">
                                <div className="p-5">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <card.icon className="h-6 w-6 text-gray-400" aria-hidden="true"/>
                                        </div>
                                        <div className="ml-5 w-0 flex-1">
                                            <dl>
                                                <dt className="text-sm font-medium text-gray-500 truncate">{card.name}</dt>
                                                <dd>
                                                    <div
                                                        className="text-lg font-medium text-gray-900">{card.amount}</div>
                                                </dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-5 py-3">
                                    <div className="text-sm">
                                        <a href={card.href} className="font-medium text-cyan-700 hover:text-cyan-900">
                                            View all
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Table */}
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
                                                Name
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Title
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Email
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Role
                                            </th>
                                            <th scope="col" className="relative px-6 py-3">
                                                <span className="sr-only">Edit</span>
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {vm?.transactions?.items?.map((transaction, transactionIdx) => (
                                            <tr key={transaction.id}
                                                className={transactionIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{transaction.date}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.amount}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.type}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.description}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                                        Edit
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
