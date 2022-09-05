import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { DashboardMain } from "../components/pages/Dashboard/Main/DashboardMain";
import { LandingPage } from "../components/pages/LandingPage/LandingPage";
import { Profile } from "../components/pages/Profile/Profile";
import { UserContext } from "../context/Context";


export const AppRoutes = () => {

  const { user, token } = useContext(UserContext)
 
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<DashboardMain/>} />
      <Route path="/profile" element={token ? <Profile /> : <Navigate to='/' replace/>} />
      <Route path="*" element={<Navigate replace to='/'/>}/>
    </Routes>
  );
};
