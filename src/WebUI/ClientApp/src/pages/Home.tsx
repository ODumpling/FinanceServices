import React, { Fragment, useEffect } from "react";
import { FundsTable } from "../features/fund/FundsTable";
import { useAppDispatch, useAppSelector } from "../hooks";
import { getFunds } from "../features/fund/fundsSlice";

export function Home() {
  const dispatch = useAppDispatch();
  const { listOfFunds: funds } = useAppSelector((state) => state.funds);

  useEffect(() => {
    dispatch(getFunds(1, 10));
  }, [dispatch]);

  return (
    <Fragment>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-5">
        <h1 className="text-lg leading-6 font-medium text-gray-900">
          Fund List
        </h1>
      </div>
      <FundsTable
        funds={funds}
        currentPage={(page) => dispatch(getFunds(page, 10))}
      />
    </Fragment>
  );
}
