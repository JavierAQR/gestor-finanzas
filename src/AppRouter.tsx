import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MainControl from "./Pages/Principal/MainControl";
import StatsDashboard from "./Pages/Dashboard/StatsDashboard";
import Header from "./Components/Header/Header";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to={"/table-transactions"} />} />
        <Route path="/table-transactions" element={<MainControl />} />
        <Route path="/dashboard" element={<StatsDashboard />} />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </BrowserRouter>
  );
};
