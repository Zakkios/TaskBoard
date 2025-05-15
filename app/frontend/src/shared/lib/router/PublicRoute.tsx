import { Outlet, Navigate } from "react-router";
import { useAuth } from "@/shared/lib/auth/useAuth";

export default function PublicRoute() {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return <div>…</div>;
  }
  return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
}
