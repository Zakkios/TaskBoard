import { User, Button } from "@/shared";
import { FaUser } from "react-icons/fa";

type TopbarProps = { user: User | null };

export function Topbar({ user }: TopbarProps) {
  return (
    <div className="fixed flex justify-end items-center bg-black h-24 w-full z-20">
      <div>
        <Button variant="dark-gray">
          {user?.username || "Guest"}
          <FaUser />
        </Button>
      </div>
    </div>
  );
}
