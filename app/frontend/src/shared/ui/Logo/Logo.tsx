import { FaCheck } from "react-icons/fa";
import clsx from "clsx";

type LogoSize = "sm" | "md" | "lg";

const sizeToIcon = {
  sm: "text-base md:text-xl", // Topbar / mobile compact
  md: "text-xl md:text-3xl", // Par défaut
  lg: "text-2xl md:text-4xl", // Hero / pages marketing
};

const sizeToPad = {
  sm: "p-1.5 md:p-2",
  md: "p-2 md:p-4",
  lg: "p-3 md:p-5",
};

type LogoProps = {
  size?: LogoSize;
  className?: string; // applique aux classes de l’icône
  containerClassName?: string; // applique au wrapper (padding/border, etc.)
};

export function Logo({
  size = "md",
  className,
  containerClassName,
}: LogoProps) {
  return (
    <div
      className={clsx(
        "rounded-xl border border-white bg-gradient-to-br from-gradient-purple to-gradient-blue shadow-[0px_4px_15px_0px_#4F46E5]",
        sizeToPad[size],
        containerClassName
      )}
    >
      <FaCheck className={clsx("text-white", sizeToIcon[size], className)} />
    </div>
  );
}
