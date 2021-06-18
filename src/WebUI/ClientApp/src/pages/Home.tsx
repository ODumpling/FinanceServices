import React, { useEffect, useState } from "react";
import { IPaginatedListOfFundDto } from "../api/web-api-client";
import { Link, useHistory } from "react-router-dom";
import { fsapi } from "../api/fsapi";
import Pagination from "../components/Pagination";
import { useQuery } from "../hooks/useQuery";

export function Home() {
  const query = useQuery();
  const page = query.get("page");
  const history = useHistory();

  const [funds, setFunds] = useState<IPaginatedListOfFundDto>();

  useEffect(() => {
    async function getfunds(page: number = 1, size: number = 9) {
      const client = await fsapi();
      client.funds_ListFunds(page, size).then((data) => setFunds(data.funds));
    }

    console.log(page);
    const current = page ? parseInt(page) : 1;
    getfunds(current);
  }, [page]);

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
    <div className="mt-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-lg leading-6 font-medium text-gray-900">
          Funds Overview
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card */}
          {funds?.items?.map((fund) => (
            <div
              key={fund.name}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    {/*<card.icon className="h-6 w-6 text-gray-400" aria-hidden="true"/>*/}
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {fund.name}
                      </dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">
                          {"$1337"}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-cyan-600 px-5 py-3">
                <div className="flex justify-center text-sm">
                  <Link
                    to={"funds/" + fund.id}
                    className="font-medium text-white text-center hover:text-cyan-900"
                  >
                    View Fund
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        {funds?.totalCount! > 9 ? (
          <Pagination
            currentPage={funds?.pageIndex}
            totalPages={funds?.totalPages}
            totalCount={funds?.totalCount}
            onPageChange={(data) => changePage(data)}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
