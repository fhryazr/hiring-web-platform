import "./App.css";
import { Routes, Route } from "react-router";
import DashboardAdmin from "./pages/DashboardAdmin";
function App() {
  return (
    <>
      <Routes>
        <Route path="/admin" element={<DashboardAdmin />} />
      </Routes>
    </>
  );
}

export default App;
