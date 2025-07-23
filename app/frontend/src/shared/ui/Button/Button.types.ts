import { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?:
    | "secondary"
    | "dark-gray"
    | "nav-item-active"
    | "nav-item"
    | "blue-gradient"
    | "disabled";
  className?: string;
}
