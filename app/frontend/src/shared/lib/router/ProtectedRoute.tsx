import { Outlet, Navigate } from "react-router";
import { useAuth } from "@/shared/lib/auth/useAuth";

export default function ProtectedRoute() {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return <div>Vérification en cours…</div>;
  }
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
