import styles from "./login.module.css";
import NavBar from "../components/navBar";
import MyButton from "../components/button";
import InputCard from "../components/inputCard";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";
import { useTranslation } from "react-i18next";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [patient_case, setPatientCase] = useState("");
  const [role, setRole] = useState("");
  const [gender, setGender] = useState("male");
  const [error, setError] = useState("");
  const { t, i18n } = useTranslation();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name || !email || !password || !dob || !patient_case)
      return setError("All fields are required");

    const data = { name, email, password, dob, gender, patient_case };
    try {
      const response = await axios.post(
        `http://localhost:3000/auth/register`,
        data
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userData", JSON.stringify(response.data.user));
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
    if (role == "patient") navigate("/patientprofile");
    else if (role == "caregiver") navigate("/home");
  }, [role]);

  useEffect(() => {
    setError("");
    console.log(gender);
  }, [name, email, password, dob, patient_case]);

  return (
    <div className={styles.container}>
      <NavBar />
      <div className={`${styles.body} ${i18n.language == "ar" && styles.rtl}`}>
        <p className="blue bold big">{t("createaccount")}</p>
        {error && <p className="error bold medium">{error}</p>}
        <div className={styles.form}>
          <InputCard
            label={t("name")}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <InputCard
            label={t("email")}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputCard
            label={t("password")}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputCard
            label={t("dob")}
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
          <div className={styles.genderContainer}>
            <p
              className={`normal medium ${i18n.language == "ar" && styles.rtl}`}
            >
              {t("gender")}
            </p>
            <select
              className={styles.gender}
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="male">{t("male")}</option>
              <option value="female">{t("female")}</option>
            </select>
          </div>
          <InputCard
            label={t("medicalcase")}
            type="text"
            value={patient_case}
            onChange={(e) => setPatientCase(e.target.value)}
          />
          <div className={styles.btnRow}>
            <MyButton
              text={t("register")}
              style="blueButton"
              onClick={handleSubmit}
            />
            <span onClick={() => navigate("/")}>{t("logininstead")}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
