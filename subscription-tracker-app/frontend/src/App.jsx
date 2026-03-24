import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import SubscriptionPage from "./pages/SubscriptionPage";
import FreeTrialPage from "./pages/FreeTrialPage";
import SettingsPage from "./pages/SettingsPage";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const loggedInUser = localStorage.getItem("accessToken");
    if (
      window.location.pathname !== "/login" &&
      window.location.pathname !== "/register" &&
      !loggedInUser
    ) {
      window.location.replace("/login");
    }
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<DashboardPage />} />
        <Route path="/subscription" element={<SubscriptionPage />} />
        <Route path="/freetrial" element={<FreeTrialPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
