import React, { Fragment, useEffect } from "react";
import { FundsTable } from "../features/fund/FundsTable";
import { useAppDispatch, useAppSelector } from "../hooks";
import {getFunds, isCreateFundSliderOpen} from "../features/fund/fundsSlice";
import {PageHeader} from "../components/PageHeader";
import {UserIcon} from "@heroicons/react/solid";
import {CreateFundSlider} from "../features/fund/CreateFundSlider";

export function Home() {
  const dispatch = useAppDispatch();
  const { listOfFunds: funds } = useAppSelector((state) => state.funds);

  useEffect(() => {
    dispatch(getFunds(1, 10));
  }, [dispatch]);

  return (
    <Fragment>
        <PageHeader title="Funds">
            <button
                onClick={() => dispatch(isCreateFundSliderOpen(true))}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
            >
             Create New Fund
            </button>
        </PageHeader>
        
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-5">
        <h1 className="text-lg leading-6 font-medium text-gray-900">
          Fund List
        </h1>
      </div>
      <FundsTable
        funds={funds}
        currentPage={(page) => dispatch(getFunds(page, 10))}
      />
        
        <CreateFundSlider />
    </Fragment>
  );
}
