import { FaCheck } from "react-icons/fa";

export function Logo({ size = 46 }: { size?: number }) {
  return (
    <div className="absolute top-10 flex flex-col items-center justify-center gap-4 text-center pb-3">
      <div>
        <div className="rounded-xl border border-white bg-gradient-to-br from-gradient-purple to-gradient-blue p-4 shadow-[0px_4px_15px_0px_#4F46E5]">
          <FaCheck size={size} className="text-white" />
        </div>
      </div>
      <h1 className="text-3xl font-bold text-white">TaskBoard</h1>
    </div>
  );
}
