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
    




    return (
        <Fragment>
            <FundsTable currentPage={(data) => console.log(data)}/>

        </Fragment>
    );
}
