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

function App() {
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
