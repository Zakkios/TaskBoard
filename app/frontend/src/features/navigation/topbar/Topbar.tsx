import Button from "@/shared/ui/Button/Button";
import { FaUser } from "react-icons/fa";
import User from "@/shared/lib/auth/User.type";

type TopbarProps = { user: User | null };

export default function Topbar({ user }: TopbarProps) {
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
