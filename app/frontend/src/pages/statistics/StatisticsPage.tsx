import { Sidebar, Topbar } from "@/features/navigation";
import { useAuth, useLoader } from "@/shared";
import { useEffect } from "react";

export default function StatisticsPage() {
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
    </div>
  );
}
