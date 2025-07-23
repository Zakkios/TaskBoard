import { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?:
    | "secondary"
    | "white"
    | "nav-item-active"
    | "nav-item"
    | "blue-gradient"
    | "disabled";
  className?: string;
}
