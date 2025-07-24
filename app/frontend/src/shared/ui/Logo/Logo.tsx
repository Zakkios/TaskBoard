import { FaCheck } from "react-icons/fa";

export function Logo({ size = 46 }: { size?: number }) {
  return (
    <div className="rounded-xl border border-white bg-gradient-to-br from-gradient-purple to-gradient-blue p-4 shadow-[0px_4px_15px_0px_#4F46E5]">
      <FaCheck size={size} className="text-white" />
    </div>
  );
}
