import { IMemberDto } from "../api/web-api-client";
import { Avatar } from "./Avatar";
import React from "react";

interface IProps {
  users: IMemberDto[];
  size: number;
}

export function AvatarList({ users, size = 4 }: IProps) {
  return (
    <div className="flex -space-x-2">
      {users.slice(0, size).map((user) => (
        <Avatar className="ring-2 ring-white">{user.initials}</Avatar>
      ))}
    </div>
  );
}
