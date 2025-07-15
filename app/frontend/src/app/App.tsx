import { Routes, Route } from "react-router";
import {
  LoginPage,
  RegisterPage,
  DashboardPage,
  StatisticsPage,
  NotFoundPage,
} from "@/pages/index.ts";
import ProtectedRoute from "@/shared/lib/router/ProtectedRoute.tsx";
import PublicRoute from "@/shared/lib/router/PublicRoute";
import { LoaderProvider } from "@/shared/ui/Loader/LoaderProvider";
import Loader from "@/shared/ui/Loader/Loader";
import { useAuth } from "@/shared";

function App() {
  const { loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <LoaderProvider>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/statistics" element={<StatisticsPage />} />
          </Route>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </LoaderProvider>
    </div>
  );
}

export default App;
