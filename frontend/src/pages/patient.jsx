import styles from "./patient.module.css";
import NavBar from "../components/navBar";
import MyButton from "../components/button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

const Patient = () => {
  const [medicationsIsVisible, setMedicationsIsVisible] = useState(false);
  const navigate = useNavigate();
  const [patients, setPatients] = useState();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token) {
      axios
        .get(`http://localhost:3000/patients`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response.data.patients);
          console.log(patients);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    } else navigate("/signin");
  }, [token]);

  return (
    <div className={styles.container}>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <>
          <NavBar />
          <div className={styles.body}>
            <div className={styles.card}>
              {medicationsIsVisible ? (
                <>
                  <p
                    className={styles.back}
                    onClick={() => setMedicationsIsVisible(false)}
                  >
                    back
                  </p>
                  <div className="row">
                    <p>
                      <span className={`bold medium`}>Morphine </span>
                      <span className={`normal medium`}>--one pill daily</span>
                    </p>
                    <MyButton text="drop" style="blueButton" />
                  </div>
                  <div className="row">
                    <p>
                      <span className={`bold medium`}>Aspirin </span>
                      <span className={`normal medium`}>3mg weekly</span>
                    </p>
                    <MyButton text="drop" style="blueButton" />
                  </div>
                  <MyButton text="add medication" style="blueButton" />
                </>
              ) : (
                <>
                  <p className={styles.back} onClick={() => navigate("/")}>
                    back
                  </p>
                  <p className={`bold big ${styles.name}`}>John Doe</p>
                  <p>
                    <span className={`bold medium`}>Gender: </span>
                    <span className={`normal medium`}>Male</span>
                  </p>
                  <p>
                    <span className={`bold medium`}>Date of Birth: </span>
                    <span className={`normal medium`}>May-25-1982</span>
                  </p>
                  <p>
                    <span className={`bold medium`}>Added in: </span>
                    <span className={`normal medium`}>May-25-2023</span>
                  </p>
                  <p>
                    <span className={`bold medium`}>Patient's Case: </span>
                    <span className={`normal medium`}>heart attack</span>
                  </p>
                  <p
                    className={`normal medium ${styles.medications}`}
                    onClick={() => setMedicationsIsVisible(true)}
                  >
                    See medications
                  </p>
                  <div className="btn-row">
                    <MyButton text="drop patient" style="blueButton" />
                    <MyButton text="add note" style="btn-shadow" />
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Patient;
