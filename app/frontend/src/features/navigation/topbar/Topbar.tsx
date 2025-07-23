import { User, Button, Logo } from "@/shared";
import { NavLink } from "react-router";
import { FaUser } from "react-icons/fa";

type TopbarProps = { user: User | null };

export function Topbar({ user }: TopbarProps) {
  return (
    <div className="fixed flex justify-between items-center bg-white h-24 w-full z-20 px-6 border-b border-[#DEDEDE]">
      <NavLink to="/" className={"flex pl-8 items-center gap-3"}>
        <Logo size={20} />
        <h1 className="text-2xl font-extrabold">TaskBoard</h1>
      </NavLink>
      <div>
        <Button variant="white">
          {user?.username || "Guest"}
          <FaUser />
        </Button>
      </div>
    </div>
  );
}
