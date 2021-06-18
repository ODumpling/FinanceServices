import React from "react";

interface IProps {
  firstname: string;
  lastname: string;
}

export function Avatar({ firstname, lastname }: IProps) {
  function initals(first: string, last: string) {
    return first.charAt(0) + last.charAt(0);
  }

  return (
    <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-cyan-600">
      <span className="text-sm font-medium leading-none text-white">
        {initals(firstname, lastname)}
      </span>
    </span>
  );
}
