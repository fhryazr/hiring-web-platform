import "./App.css";
import { Routes, Route } from "react-router";
import DashboardAdmin from "./pages/DashboardAdmin";
import ManagementCandidates from "./pages/ManageCandidates";
import NotFoundPage from "./pages/NotFound";
import CareerPage from "./pages/CareerPage";
import ApplyPage from "./pages/ApplyPage";
import SuccessPage from "./pages/SuccessPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/admin" element={<DashboardAdmin />} />
        <Route path="/admin/:jobId" element={<ManagementCandidates />} />
        <Route path="/career" element={<CareerPage />} />
        <Route path="/career/apply/:jobId" element={<ApplyPage />} />
        <Route path="/career/apply/:jobId/success" element={<SuccessPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
