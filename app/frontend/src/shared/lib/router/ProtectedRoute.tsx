import { Outlet, Navigate } from "react-router";
import { useAuth, useLoader } from "@/shared";
import { useEffect } from "react";

export default function ProtectedRoute() {
  const { loading, isAuthenticated } = useAuth();
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

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
