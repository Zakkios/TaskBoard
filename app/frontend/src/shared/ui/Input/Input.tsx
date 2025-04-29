import { InputProps } from "./Input.types";
import clsx from "clsx";

export default function Input({
  label,
  error,
  className,
  classNameParent,
  ...props
}: InputProps) {
  return (
    <div className={clsx("flex flex-col gap-1", classNameParent)}>
      {label && <label className="text-sm font-medium">{label}</label>}
      <input
        {...props}
        className={clsx(
          "border border-gray-400 bg-white rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-gray-500",
          className
        )}
      />
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
}
