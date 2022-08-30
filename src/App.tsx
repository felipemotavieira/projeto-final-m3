import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { LandingPage } from "./components/pages/LandingPage/LandingPage";


function App() {
  return (
    <Routes>
      <Route path="landing" element={LandingPage()} />

    </Routes>
  );
}

export default App;
