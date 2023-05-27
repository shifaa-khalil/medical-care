import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Patient from "./pages/patient";
import Login from "./pages/login";
import Register from "./pages/register";
import NoAccess from "./pages/noAccess";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/patient/:patient_id" element={<Patient />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/noaccess" element={<NoAccess />} />
      </Routes>
    </Router>
  );
}

export default App;
