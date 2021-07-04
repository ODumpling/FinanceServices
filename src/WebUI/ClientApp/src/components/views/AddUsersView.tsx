import React, { Fragment } from "react";
import { IMemberDto } from "../../api/web-api-client";
import { UserTileList } from "../UserTileList";

interface IProps {
  backButtonClicked: (data: boolean) => void;
  users?: IMemberDto[];
  addUserEvent: (data: IMemberDto) => void;
}

export function AddUsersView({
  backButtonClicked,
  users,
  addUserEvent,
}: IProps) {
  return (
    <Fragment>
      <div className="flex justify-between p-3 border-b border-cyan-800">
        <h1>Add Users</h1>
        <button
          className="ml-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
          onClick={() => backButtonClicked(true)}
        >
          Back
        </button>
      </div>
      {users ? (
        <UserTileList
          type="add"
          users={users}
          clicked={(_, data) => addUserEvent(data)}
        />
      ) : (
        "loading..."
      )}
    </Fragment>
  );
}
