import { Routes, Route } from "react-router";
import "./App.css";
import {
  LoginPage,
  RegisterPage,
  DashboardPage,
  StatisticsPage,
  NotFoundPage,
} from "./../pages/index.ts";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/statistics" element={<StatisticsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
