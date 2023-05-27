import PatientCard from "../components/patientCard";
import styles from "./home.module.css";
import NavBar from "../components/navBar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [expanded, setExpanded] = useState(false);
  const [patients, setPatients] = useState();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      axios
        .get(`http://localhost:3000/patients`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setPatients(response.data);
          console.log(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    } else navigate("/login");
  }, [token]);

  return (
    <div className={styles.container}>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <>
          <NavBar />
          <div className={styles.body}>
            {patients ? (
              <>
                {patients.slice(0, 5).map((p) => (
                  <PatientCard
                    key={p._id}
                    name={p.name}
                    added_in={p.createdAt.split("T")[0]}
                    patient_case={p.patient_case}
                    patient_id={p._id}
                  />
                ))}
                {patients.length > 5 &&
                  expanded &&
                  patients
                    .slice(5)
                    .map((p) => (
                      <PatientCard
                        key={p._id}
                        name={p.name}
                        added_in={p.createdAt.split("T")[0]}
                        patient_case={p.patient_case}
                        patient_id={p._id}
                      />
                    ))}
                <p
                  className={`bold blue big ${styles.more}`}
                  onClick={() => {
                    expanded ? setExpanded(false) : setExpanded(true);
                  }}
                >
                  {expanded ? "See less" : "See more ->"}
                </p>
              </>
            ) : (
              <p>no data</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
