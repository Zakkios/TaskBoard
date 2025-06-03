import Sidebar from "@/features/navigation/sidebar/Sidebar";
import Topbar from "@/features/navigation/topbar/Topbar";
import COLUMNS from "@/features/taskBoard/consts/columns";
import TaskBoard from "@/features/taskBoard/ui/TaskBoard";
import useAuth from "@/shared/lib/auth/useAuth";
import Loader from "@/shared/ui/Loader/Loader";

export default function DashboardPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <Topbar user={user} />
      <Sidebar />
      <div className="ml-20 md:ml-80 pt-28">
        <TaskBoard columns={COLUMNS} />
      </div>
    </div>
  );
}
