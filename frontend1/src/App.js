import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import CentralDashboard from "./pages/CentralDashboard";
import SchemeDashboard from "./pages/SchemeDashboard";
import BeneficiaryDashboard from "./pages/BeneficiaryDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/central" element={<CentralDashboard />} />
        <Route path="/scheme" element={<SchemeDashboard />} />
        <Route path="/beneficiary" element={<BeneficiaryDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
