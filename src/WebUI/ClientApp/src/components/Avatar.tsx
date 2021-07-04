import React, { HTMLAttributes, ReactNode } from "react";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  firstname?: string;
  lastname?: string;
  children?: ReactNode;
}

export function Avatar({ firstname, lastname, children, className }: IProps) {
  function initials(first: string, last: string) {
    return first.charAt(0) + last.charAt(0);
  }

  return (
    <span
      className={
        "inline-flex items-center justify-center h-8 w-8 rounded-full bg-cyan-600 " +
        className
      }
    >
      <span className="text-sm font-medium leading-none text-white">
        {firstname && lastname ? initials(firstname, lastname) : children}
      </span>
    </span>
  );
}
