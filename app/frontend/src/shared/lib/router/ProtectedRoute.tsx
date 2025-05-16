import { Outlet, Navigate } from "react-router";
import { useAuth } from "@/shared/lib/auth/useAuth";
import Loader from "@/shared/ui/Loader/Loader";

export default function ProtectedRoute() {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return <Loader />;
  }
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
