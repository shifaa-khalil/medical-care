import styles from "./login.module.css";
import NavBar from "../components/navBar";
import MyButton from "../components/button";
import InputCard from "../components/inputCard";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";
import { useTranslation } from "react-i18next";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const { t, i18n } = useTranslation();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) return setError("All fields are required");

    const data = { email, password };
    try {
      const response = await axios.post(
        `http://localhost:3000/auth/login`,
        data
      );
      console.log(response);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userData", JSON.stringify(response.data.user));
      setRole(response.data.user.role);
    } catch (error) {
      console.error(error);
      setError("Email/Password is wrong");
      console.log(error);
    }
  };

  useEffect(() => {
    if (role == "patient") navigate("/patientprofile");
    else if (role == "caregiver") navigate("/home");
  }, [role]);

  return (
    <div className={styles.container}>
      <NavBar />
      <div className={`${styles.body} ${i18n.language == "ar" && styles.rtl}`}>
        <p className="blue bold big">{t("login")}</p>
        {error && <p className="error bold medium">{error}</p>}
        <div className={styles.form}>
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
          <div className={styles.btnRow}>
            <MyButton
              text={t("login")}
              style="blueButton"
              onClick={handleSubmit}
            />
            <span onClick={() => navigate("/register")}>
              {t("registerinstead")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
