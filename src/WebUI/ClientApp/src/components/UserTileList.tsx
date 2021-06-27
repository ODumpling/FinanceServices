import {XIcon} from "@heroicons/react/outline";
import React, {Fragment} from "react";
import {IMemberDto} from "../api/web-api-client";
import {PlusIcon} from "@heroicons/react/solid";

interface IProps {
    users: IMemberDto[],
    type?: "view" | "add" | "remove"
    clicked: (type: "add" | "remove", person: IMemberDto) => void
}

export function UserTileList({users, clicked, type = "view"}: IProps) {

    function buttonType(type: string, person: IMemberDto) {
        switch (type) {
            case "remove":
                return (
                    <button
                        onClick={() => clicked("remove", person)}
                        className="flex items-center">
                        <XIcon className="h-6 w-6" aria-hidden="true"/>
                    </button>
                )
            case "add":
                return (
                    <button
                        onClick={() => clicked("add", person)}
                        className="flex items-center">
                        <PlusIcon className="h-6 w-6" aria-hidden="true"/>
                    </button>
                )
            case "view":
            default:
                break;
        }
    }

    return (
        <Fragment>
            {users.map(person => (
                <div className="w-full my-3 flex flex-inline py-3 px-2 border-b border-cyan-800" key={person.id}>
                    {buttonType(type, person)}

                    <span className="ml-4">{person.fullName}</span>
                </div>
            ))}
        </Fragment>

    )
}
