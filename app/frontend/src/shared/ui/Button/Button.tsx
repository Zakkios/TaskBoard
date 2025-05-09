import { FC } from "react";
import clsx from "clsx";
import { ButtonProps } from "./Button.types";

const Button: FC<ButtonProps> = ({
  children,
  variant = "primary",
  className,
  ...props
}) => {
  return (
    <button
      className={clsx(
        "px-6 py-3 rounded-lg font-semibold transition-colors duration-200",
        variant === "secondary" &&
          "bg-secondary text-white cursor-pointer hover:bg-blue-700",
        variant === "tertiary" &&
          "bg-tertiary text-white cursor-pointer hover:bg-gray-700",
        variant === "disabled" &&
          "bg-gray-300 text-gray-500 cursor-not-allowed",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
