import styles from "./login.module.css";
import NavBar from "../components/navBar";
import MyButton from "../components/button";
import InputCard from "../components/inputCard";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Login = () => {
  const [medicationsIsVisible, setMedicationsIsVisible] = useState(false);
  const navigate = useNavigate();
  const [name, setName] = useState("");

  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles.body}>
        <div className={styles.form}>
          <InputCard
            label="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="btn-row">
            <MyButton text="drop patient" style="blueButton" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
