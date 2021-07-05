import {OverviewCard} from "../../components/OverviewCard";
import React from "react";
import {ScaleIcon} from "@heroicons/react/outline";
import {IFundDto2} from "../../api/web-api-client";

interface IProps {
    fund: IFundDto2
}

export function FundOverview({fund}: IProps) {

    function getCards(fund: IFundDto2) {
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


    return(
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg leading-6 font-medium text-gray-900">
                Overview
            </h2>
            <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {/* Card */}
                {fund
                    ? getCards(fund).map((card) => (
                        <OverviewCard key={card.name} card={card} />
                    ))
                    : "loading..."}
            </div>
        </div>
    )

}
