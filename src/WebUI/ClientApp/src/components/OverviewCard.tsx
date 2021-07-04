import React, { SVGProps } from "react";

interface ICard {
  name: string;
  href: string;
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  amount: string;
}

interface IProps {
  card: ICard;
}

export function OverviewCard({ card }: IProps) {
  return (
    <div key={card.name} className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <card.icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                {card.name}
              </dt>
              <dd>
                <div className="text-lg font-medium text-gray-900">
                  {card.amount}
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
