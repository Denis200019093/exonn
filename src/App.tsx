import React from "react";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
// Pages
import DashboardPage from "./pages/Dashboard";
import BankingPage from "./pages/Banking";
import TelefoniePage from "./pages/Telefonie";
import AccountingPage from "./pages/Accounting";
import VerkaufPage from "./pages/Verkauf";
import StatistikPage from "./pages/Statistik";
import PostOfficePage from "./pages/PostOffice";
import AdministationPage from "./pages/Administation";

const App: React.FC = () => {
  return (
    <main className="max-w-screen-xl mx-auto mt-10 overflow-hidden">
      <Navbar />
      <div className="border-[16px] border-gray-100 h-screen">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/banking" element={<BankingPage />} />
          <Route path="/telefonie" element={<TelefoniePage />} />
          <Route path="/accounting" element={<AccountingPage />} />
          <Route path="/verkauf" element={<VerkaufPage />} />
          <Route path="/statistik" element={<StatistikPage />} />
          <Route path="/post-office" element={<PostOfficePage />} />
          <Route path="/administation" element={<AdministationPage />} />
        </Routes>
      </div>
    </main>
  );
};

export default App;
