import React from "react";
import { IMemberDto } from "../../api/web-api-client";
import { UserTileList } from "../UserTileList";

interface IProps {
  people?: IMemberDto[];
  newUserClicked: (data: boolean) => void;
  removeUserEvent: (data: IMemberDto) => void;
}

export function CurrentUsersView({
  people,
  newUserClicked,
  removeUserEvent,
}: IProps) {
  return (
    <div>
      <div className="flex justify-between py-2 px-3 border-b border-cyan-800">
        <h1 className="font-medium font-semibold text-xl">Current Users</h1>
        <button
          onClick={() => newUserClicked(true)}
          className="ml-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
        >
          Add Users
        </button>
      </div>
      {people ? (
        <UserTileList
          users={people}
          type="remove"
          clicked={(_, data) => removeUserEvent(data)}
        />
      ) : (
        "loading..."
      )}
    </div>
  );
}
