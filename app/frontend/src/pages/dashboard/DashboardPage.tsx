import { Sidebar, Topbar } from "@/features/navigation";
import { COLUMNS, TaskBoard } from "@/features/taskBoard";
import { useAuth, useLoader } from "@/shared";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const { show, hide } = useLoader();

  if (loading) {
    show();
    return null;
  }
  hide();

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
