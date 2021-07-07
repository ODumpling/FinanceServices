import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {FundOverview} from "../features/fund/FundOverview";
import {useAppDispatch, useAppSelector} from "../hooks";
import {getFundById, getFundMembers} from "../features/fund/fundsSlice";
import {PageHeader} from "../components/PageHeader";
import {UserIcon} from "@heroicons/react/solid";
import {TransactionsTable} from "../features/transaction/TransactionsTable";
import {CreateTransactionSlider} from "../features/transaction/CreateTransactionSlider";
import {isCreateTransactionSliderOpen} from "../features/transaction/transactionSlice";

export function Fund() {
    const dispatch = useAppDispatch();
    const {
        selectedFund: {fund, transactionTypes},
        members
    } = useAppSelector((state) => state.funds);
    const allMembers = useAppSelector(state => state.members.allMembers)
    const {id} = useParams<{ id: string }>();

    useEffect(() => {
        dispatch(getFundById(id, 1, 10));
        dispatch(getFundMembers(id));
    }, [dispatch]);

    // function createTransactionForm() {
    //   return (
    //     <Slideover
    //       title="New Transaction"
    //       description="Create a new transaction."
    //       isOpen={isOpen}
    //       handleClose={() => setIsOpen(false)}
    //       formName="createTransaction"
    //     >
    //       {fund ? (
    //         <CreateTransactionForm
    //           fundId={fund.id!}
    //           formId="createTransaction"
    //           hasSubmit={() => setLoading(true)}
    //         />
    //       ) : (
    //         "loading..."
    //       )}
    //     </Slideover>
    //   );
    // }

    // function nonMembers() {
    //   if (members)
    //     return allMembers.filter(function (user) {
    //       return !members.some(function (member) {
    //         return user.id === member.id;
    //       });
    //     });
    // }

    // function createMembershipForm() {
    //   return (
    //     <Slideover
    //       formName="createMembership"
    //       title="Add A User to the Fund"
    //       handleClose={() => setIsMembershipOpen(false)}
    //       isOpen={isMembershipOpen}
    //     >
    //       {fund ? (
    //         <CreateMembershipForm
    //           fundId={fund.id!}
    //           hasSubmit={() => {
    //             setLoading(true);
    //           }}
    //           formId="createMembership"
    //           members={members}
    //           nonMembers={nonMembers()}
    //         />
    //       ) : (
    //         "loading..."
    //       )}
    //     </Slideover>
    //   );
    // }

    return (
        <div>
            <PageHeader title={fund?.name + " Fund"}>
                <button
                    onClick={() => console.log(true)}
                    className="text-gray-500 font-medium capitalize outline-none focus:outline-none flex inline-flex"
                >
                    {members ? members.length + " Members " : "loading..."}
                    <UserIcon className="h-6 w-6"  />
                </button>
            </PageHeader>

            <div className="mt-8">
                <FundOverview fund={fund!}/>

                {/* Table */}
                <div className="max-w-6xl mx-auto flex justify-between mt-8 px-4 sm:px-6 lg:px-8">
                    <h2 className="text-lg leading-6 font-medium text-gray-900 ">
                        Transaction Activity
                    </h2>
                    <button
                        onClick={() => dispatch(isCreateTransactionSliderOpen(true))}
                        type="button"
                        className="items-center px-2.5 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                    >
                        Create Transaction
                    </button>
                </div>
                <TransactionsTable transactions={fund?.transactions!}/>
            </div>
            <CreateTransactionSlider/>
        </div>
    );
}
