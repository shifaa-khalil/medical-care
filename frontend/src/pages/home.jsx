import PatientCard from "../components/patientCard";
import styles from "./home.module.css";
import NavBar from "../components/navBar";
import { useState } from "react";

const Home = () => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles.body}>
        <PatientCard />
        <PatientCard />
        <PatientCard />
        <PatientCard />
        <PatientCard />
        {expanded && (
          <>
            <PatientCard />
            <PatientCard />
            <PatientCard />
          </>
        )}

        <p
          className={`bold blue big ${styles.more}`}
          onClick={() => {
            expanded ? setExpanded(false) : setExpanded(true);
          }}
        >
          {expanded ? "See less" : "See more ->"}
        </p>
      </div>
    </div>
  );
};

export default Home;
