import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Patient from "./pages/patient";
import Login from "./pages/login";
import Register from "./pages/register";
import NoAccess from "./pages/noAccess";
import NotFound from "./pages/notFound";
import PatientProfile from "./pages/patientProfile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/noaccess" element={<NoAccess />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/patient/:patient_id" element={<Patient />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/patientprofile" element={<PatientProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
