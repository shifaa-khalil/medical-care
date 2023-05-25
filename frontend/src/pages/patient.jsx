import styles from "./patient.module.css";
import NavBar from "../components/navBar";
import { useState } from "react";
import "../App.css";

const Patient = () => {
  const [medicationsIsVisible, setMedicationsIsVisible] = useState(false);

  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles.body}>
        <p className={styles.back}>back</p>
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
                <button className="btn-s">drop</button>
              </div>
              <div className="row">
                <p>
                  <span className={`bold medium`}>Aspirin </span>
                  <span className={`normal medium`}>3mg weekly</span>
                </p>
                <button className="btn-s">drop</button>
              </div>
              <button className="btn-lg">add medication</button>
            </>
          ) : (
            <>
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
              <div className="row">
                <p
                  className={`normal medium ${styles.medications}`}
                  onClick={() => setMedicationsIsVisible(true)}
                >
                  See medications
                </p>
              </div>
              <button className="btn-lg">drop patient</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Patient;
