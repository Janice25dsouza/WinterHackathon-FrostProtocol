import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Central from "./pages/Central";
import Scheme from "./pages/Scheme";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/central" element={<Central />} />
        <Route path="/scheme" element={<Scheme />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
