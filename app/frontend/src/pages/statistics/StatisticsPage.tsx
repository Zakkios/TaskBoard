import Sidebar from "@/features/navigation/sidebar/Sidebar";
import Topbar from "@/features/navigation/topbar/Topbar";
import useAuth from "@/shared/lib/auth/useAuth";
import Loader from "@/shared/ui/Loader/Loader";

export default function StatisticsPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <Topbar user={user} />
      <Sidebar />
    </div>
  );
}
