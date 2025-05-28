import { FC } from "react";
import clsx from "clsx";
import { ButtonProps } from "./Button.types";
import { variantClasses } from "./Button.variant";

const Button: FC<ButtonProps> = ({
  children,
  variant,
  className,
  ...props
}) => {
  return (
    <button
      className={clsx(variant && variantClasses[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
