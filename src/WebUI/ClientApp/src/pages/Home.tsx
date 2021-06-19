import React, {Fragment, useEffect, useState} from "react";
import {
    CreateFundCommand,
    IPaginatedListOfFundDto,
} from "../api/web-api-client";
import {Link, useHistory} from "react-router-dom";
import {fsapi} from "../api/fsapi";
import Pagination from "../components/Pagination";
import {useQuery} from "../hooks/useQuery";
import {PageHeader} from "../components/PageHeader";
import Slideover from "../components/Slideover";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {object, string, z} from "zod";

export const fundFormSchema = object({
    name: string(),
});

type fundSubmission = z.infer<typeof fundFormSchema>;

export function Home() {
    const query = useQuery();
    const page = query.get("page");
    const history = useHistory();

    const [funds, setFunds] = useState<IPaginatedListOfFundDto>();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        async function getfunds(page: number = 1, size: number = 9) {
            const client = await fsapi();
            client.funds_ListFunds(page, size).then((data) => setFunds(data.funds));
        }

        const current = page ? parseInt(page) : 1;
        getfunds(current);
    }, [page]);

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm({
        resolver: zodResolver(fundFormSchema),
    });

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

    async function createFund(data: fundSubmission) {
        setIsOpen(false);
        const client = await fsapi();
        const command = CreateFundCommand.fromJS(data);
        client.funds_CreateFund(command).then((res) => {
            reset({name: ""});
            if (funds?.items?.length! < 9) {
                setFunds({
                    ...funds,
                    items: [
                        ...funds?.items!,
                        {id: res, name: command.name, balance: 0},
                    ],
                });
            } else {
                const current = page ? page + 1 : 2;
                changePage(current);
            }
        });
    }

    function createFundForm() {
        return (
            <Fragment>
                <Slideover
                    title="New Fund"
                    formName="createFund"
                    isOpen={isOpen}
                    handleClose={() => setIsOpen(false)}
                >
                    <form id="createFund" onSubmit={handleSubmit(createFund)}>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Name
                        </label>
                        <input
                            {...register("name")}
                            id="name"
                            type="text"
                            className="focus:ring-cyan-500 focus:border-cyan-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            aria-describedby="transaction-amount"
                        />
                        <p>{errors.name?.message}</p>
                    </form>
                </Slideover>
            </Fragment>
        );
    }

    function fundView() {
        return (
            <Fragment>
                <PageHeader title="List of Funds">
                    <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4">
                        <button
                            onClick={() => setIsOpen(true)}
                            type="button"
                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                        >
                            Create Fund
                        </button>
                    </div>
                </PageHeader>
                <div className="mt-8">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {/* Card */}
                            {funds?.items?.map((fund) => (
                                <div
                                    key={fund.id}
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
                                                            {"£" + fund.balance}
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
            </Fragment>
        )

    }

    return (
        <Fragment>
            {funds ? fundView() : "loading..."}
            {createFundForm()}
        </Fragment>
    );
}
