import { Route, Routes } from "react-router-dom";
import { LandingPage } from "../components/pages/LandingPage/LandingPage";
import { DashboardMain } from "../components/pages/Dashboard/Main/DashboardMain";
import { Profile } from "../components/pages/Profile/Profile";


export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<DashboardMain />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};
