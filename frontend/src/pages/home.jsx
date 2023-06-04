import PatientCard from "../components/patientCard";
import styles from "./home.module.css";
import NavBar from "../components/navBar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";

const Home = () => {
  const [expanded, setExpanded] = useState(false);
  const [patients, setPatients] = useState();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

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
          if (error.response) {
            if (error.response.data.message == "Unauthorized")
              navigate("/noaccess", { replace: true });
            else if (error.response.data.message == "Unauthenticated")
              navigate("/");
          }
        });
    } else {
      alert("You are not logged in!");
      navigate("/");
    }
  }, [token]);

  return (
    <div className={styles.container}>
      {isLoading ? (
        <div className="container">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          <NavBar />
          <div
            className={`${styles.body} ${i18n.language == "ar" && styles.rtl}`}
          >
            {patients ? (
              <>
                {patients.slice(0, 4).map((p) => (
                  <PatientCard
                    key={p._id}
                    name={p.name}
                    added_in={p.createdAt.split("T")[0]}
                    patient_case={p.patient_case}
                    patient_id={p._id}
                  />
                ))}
                {patients.length > 4 &&
                  expanded &&
                  patients
                    .slice(4)
                    .map((p) => (
                      <PatientCard
                        key={p._id}
                        name={p.name}
                        added_in={p.createdAt.split("T")[0]}
                        patient_case={p.patient_case}
                        patient_id={p._id}
                      />
                    ))}
                {patients.length > 4 ? (
                  <p
                    className={`bold blue big ${styles.more}`}
                    onClick={() => {
                      expanded ? setExpanded(false) : setExpanded(true);
                    }}
                  >
                    {expanded ? t("lesspatients") : t("morepatients") + " ->"}
                  </p>
                ) : null}
              </>
            ) : (
              <p>{t("nodata")}</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
