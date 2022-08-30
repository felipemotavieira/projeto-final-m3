//import { Route, Routes } from 'react-router-dom';
//import { LandingPage } from '../components/pages/LandingPage/LandingPage';

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LandingPage } from "../components/pages/LandingPage/LandingPage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
    </Routes>
  );
};
