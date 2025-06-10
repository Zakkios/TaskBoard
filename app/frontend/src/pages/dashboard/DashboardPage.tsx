import { Sidebar, Topbar } from "@/features/navigation";
import { COLUMNS, TaskBoard } from "@/features/taskBoard";
import { useAuth, useLoader } from "@/shared";
import { useEffect } from "react";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const { show, hide } = useLoader();

  useEffect(() => {
    if (loading) {
      show();
    } else {
      hide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  if (loading) {
    return null; // Ou un fallback si tu veux
  }

  return (
    <div>
      <Topbar user={user} />
      <Sidebar />
      <div className="ml-20 md:ml-80 pt-28">
        <TaskBoard initialColumns={COLUMNS} />
      </div>
    </div>
  );
}
