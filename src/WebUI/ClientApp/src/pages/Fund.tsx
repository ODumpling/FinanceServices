import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {financeApi} from "../api/financeApi";
import {IFundDto2, IMemberDto, IPaginatedListOfTransactionDto, TransactionType,} from "../api/web-api-client";
import {ScaleIcon, UserIcon} from "@heroicons/react/outline";
import Slideover from "../components/Slideover";
import moment from "moment";
import {useQuery} from "../hooks/useQuery";
import Pagination from "../components/Pagination";
import {PageHeader} from "../components/PageHeader";
import {OverviewCard} from "../components/OverviewCard";
import {CreateTransactionForm} from "../forms/CreateTransactionForm";
import {CreateMembershipForm} from "../forms/CreateMembershipForm";


export function Fund() {
    const [fund, setFund] = useState<IFundDto2>();
    const [transactions, setTransactions] = useState<IPaginatedListOfTransactionDto>();
    const [members, setMembers] = useState<IMemberDto[]>();
    const [allMembers, setAllMembers] = useState<IMemberDto[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isMembershipOpen, setIsMembershipOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const query = useQuery();
    const history = useHistory();
    const page = query.get("page");


    const {id} = useParams<{ id: string }>();

    useEffect(() => {
        async function getFund(id: string, page: number = 1, size: number = 10) {
            const client = await financeApi();
            
            // client.funds_GetFund(id, page, size).then((data) => {
            //     setTransactions(data.transactions);
            //     setFund(data.fund);
            //     setLoading(false)
            // });

            client.funds_GetFundMembers(id).then((data) => setMembers(data))
        }

        const currentPage = page ? parseInt(page) : 1;
        getFund(id, currentPage).catch((e) =>
            console.error("Fund Page has Error", e)
        );
    }, [id, page, loading]);

    useEffect(() => {
        async function findNonMembers() {
            const client = await financeApi()
            client.memberships_GetMembers(null).then(res => {
                setAllMembers(res)
            });
        }

        findNonMembers().then()
    }, [])

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


    function getCards() {
        const cards = [];
        if (fund) {
            cards.push(
                {
                    name  : "Total Account Balance",
                    href  : "#",
                    icon  : ScaleIcon,
                    amount: "£" + fund.balance,
                },
                {
                    name  : "Total Account Income",
                    href  : "#",
                    icon  : ScaleIcon,
                    amount: "£" + fund.income,
                },
                {
                    name  : "Total Account Expense",
                    href  : "#",
                    icon  : ScaleIcon,
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
                {fund ? <CreateTransactionForm fundId={fund.id!} formId="createTransaction"
                                               hasSubmit={() => setLoading(true)}/> : "loading..."}
            </Slideover>
        );
    }


    function nonMembers() {
        if (members)
            return allMembers.filter(function (user) {
                return !members.some(function (member) {
                    return user.id === member.id;
                });
            })
    }

    function createMembershipForm() {
        return (
            <Slideover
                formName="createMembership"
                title="Add A User to the Fund"
                handleClose={() => setIsMembershipOpen(false)}
                isOpen={isMembershipOpen}>
                {fund ?
                    <CreateMembershipForm fundId={fund.id!} hasSubmit={() => {
                        setLoading(true)
                    }} formId="createMembership"
                                          members={members} nonMembers={nonMembers()}/> : "loading..."}
            </Slideover>
        )
    }


    return (
        <div>
            <PageHeader title={fund?.name + " Fund"}>
                <button
                    onClick={() => setIsMembershipOpen(true)}
                    className="text-gray-500 font-medium capitalize outline-none focus:outline-none flex inline-flex">{members ? members.length + " Members " : "loading..."}
                    <UserIcon className="h-6 w-6"/>
                </button>
            </PageHeader>

            <div className="mt-8">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-lg leading-6 font-medium text-gray-900">
                        Overview
                    </h2>
                    <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {/* Card */}
                        {!loading ? getCards().map((card) => (
                            <OverviewCard key={card.name} card={card}/>)) : "loading..."}
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
                                                        {TransactionType[parseInt(transaction.type!)]}
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
            {createMembershipForm()}
        </div>
    );
}
