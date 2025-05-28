import { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?:  "secondary" | "dark-gray" | "nav-item-active" | "nav-item" | "disabled";
  className?: string;
}
