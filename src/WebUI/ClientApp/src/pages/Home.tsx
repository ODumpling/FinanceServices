import React, { Fragment, useEffect } from "react";
import { FundsTable } from "../features/fund/FundsTable";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  getFunds,
  isFundSliderOpen,
  setPage,
} from "../features/fund/fundsSlice";
import { PageHeader } from "../components/PageHeader";
import { FundSlider } from "../features/fund/FundSlider";

export function Home() {
  const dispatch = useAppDispatch();
  const { listOfFunds: funds, page } = useAppSelector((state) => state.funds);

  useEffect(() => {
    dispatch(getFunds(page, 10));
  }, [dispatch, page]);

  return (
    <Fragment>
      <PageHeader title="Funds">
        <button
          onClick={() => dispatch(isFundSliderOpen({isOpen: true}))}
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
        currentPage={(page) => {
          dispatch(setPage(page));
          dispatch(getFunds(page, 10));
        }}
        editFund={(id) => dispatch(isFundSliderOpen({isOpen: true,type:"Edit", id}))}
      />

      <FundSlider />
    </Fragment>
  );
}
