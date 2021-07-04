import React, {Fragment, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {useQuery} from "../hooks/useQuery";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {object, string, z} from "zod";
import {useAppDispatch, useAppSelector} from "../hooks";
import {fetchFunds} from "../features/fund/fundsSlice";
import {FundsTable} from "../features/fund/FundsTable";

export const fundFormSchema = object({
    name: string(),
});

type fundSubmission = z.infer<typeof fundFormSchema>;

export function Home() {
    const query = useQuery();
    const page = query.get("page");
    const history = useHistory();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    const {listOfFunds: funds} = useAppSelector((state) => state.funds);

    useEffect(() => {
        async function getfunds(page: number = 1, size: number = 10) {
            await dispatch(fetchFunds({page, size}));
        }

        const current = page ? parseInt(page) : 1;
        getfunds(current).then();
    }, [page, dispatch]);

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm({
        resolver: zodResolver(fundFormSchema),
    });


    return (
        <Fragment>
            <FundsTable/>

        </Fragment>
    );
}
