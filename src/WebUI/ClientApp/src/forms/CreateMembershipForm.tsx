import React, {Fragment, useState} from "react";
import {CreateMembershipCommand, DeleteMembershipCommand, IMemberDto} from "../api/web-api-client";
import {CurrentUsersView} from "../components/views/currentUsersView";
import {AddUsersView} from "../components/views/AddUsersView";
import {financeApi} from "../api/financeApi";


interface IProps {
    fundId: string;
    formId: string;
    members?: IMemberDto[]
    nonMembers?: IMemberDto[]
    hasSubmit: (data: string) => void
}


export function CreateMembershipForm({fundId, hasSubmit, members, nonMembers}: IProps) {

    const [addUserView, setAddUserView] = useState<boolean>(false)

    function addMemberToFund(user: IMemberDto) {
        const command = new CreateMembershipCommand({
            fundId,
            userId: user.id
        })

        financeApi().then(client => client.memberships_CreateMembership(command).then(() => {
            hasSubmit("true")
        }))
    }

    function removeMemberToFund(user: IMemberDto) {
        const command = new DeleteMembershipCommand({
            fundId,
            userId: user.id
        })

        financeApi().then(client => client.memberships_DeleteMembership(command).then(() => {
            hasSubmit("true")
        }))
    }

    return (
        <Fragment>
            {!addUserView ? <CurrentUsersView people={members} newUserClicked={(data) => setAddUserView(data)}
                                              removeUserEvent={data => removeMemberToFund(data)}/> :
                <AddUsersView users={nonMembers} backButtonClicked={() => setAddUserView(false)}
                              addUserEvent={(user) => addMemberToFund(user)}/>}
        </Fragment>
    )
}
