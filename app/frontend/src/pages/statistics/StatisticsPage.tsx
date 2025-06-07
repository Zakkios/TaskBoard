import { Sidebar, Topbar } from "@/features/navigation";
import { useAuth, useLoader } from "@/shared";

export default function StatisticsPage() {
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
    </div>
  );
}
