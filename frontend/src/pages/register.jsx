import styles from "./login.module.css";
import NavBar from "../components/navBar";
import MyButton from "../components/button";
import InputCard from "../components/inputCard";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [patient_case, setPatientCase] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name || !email || !password || !dob || !patient_case)
      return setError("All fields are required");

    const data = { name, email, password, dob, patient_case };
    try {
      const response = await axios.post(
        `http://localhost:3000/auth/register`,
        data
      );
      console.log(response);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.user.role);
      localStorage.setItem("name", response.data.user.name);
      setRole(response.data.user.role);
    } catch (error) {
      if (error.response) {
        if (error.response.data.message == "email already exists")
          setError("Email already exists");
        else if (error.response.data.message == "invalid email")
          setError("Enter a valid email");
        else if (error.response.data.message == "invalid password")
          setError(
            "Password must be at least 8 characters long and contain at least one letter and one number"
          );
      }
      console.error(error);
    }
  };

  useEffect(() => {
    if (role == "patient") console.log("patient");
    else if (role == "caregiver") navigate("/");
  }, [role]);

  useEffect(() => {
    setError("");
  }, [name, email, password, dob, patient_case]);

  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles.body}>
        <p className="blue bold big">Create Account</p>
        {error && <p className="error bold medium">{error}</p>}
        <div className={styles.form}>
          <InputCard
            label="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <InputCard
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputCard
            label="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputCard
            label="Date of birth"
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
          <InputCard
            label="Medical case"
            type="text"
            value={patient_case}
            onChange={(e) => setPatientCase(e.target.value)}
          />
          <div className={styles.btnRow}>
            <MyButton
              text="Register"
              style="blueButton"
              onClick={handleSubmit}
            />
            <span onClick={() => navigate("/register")}>Login instead</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
