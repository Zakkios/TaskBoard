import { Routes, Route } from "react-router";
import {
  LoginPage,
  RegisterPage,
  DashboardPage,
  StatisticsPage,
  NotFoundPage,
} from "@/pages/index.ts";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/statistics" element={<StatisticsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
