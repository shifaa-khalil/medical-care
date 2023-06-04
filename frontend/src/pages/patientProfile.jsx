import styles from "./patientProfile.module.css";
import NavBar from "../components/navBar";
import NoteCard from "../components/noteCard";
import MedicationCard from "../components/medicationCard";
import KeyValuePairInline from "../components/keyValuePairInline";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../App.css";
import { useTranslation } from "react-i18next";

const PatientProfile = () => {
  const [medicationsIsVisible, setMedicationsIsVisible] = useState(false);
  const [NotesIsVisible, setNotesIsVisible] = useState(false);
  const navigate = useNavigate();
  const [medications, setMedications] = useState([]);
  const [notes, setNotes] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(false);
  const patient = JSON.parse(localStorage.getItem("userData"));
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (token && medicationsIsVisible) {
      axios
        .get(`http://localhost:3000/medications`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setMedications(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          if (error.response) {
            if (error.response.data.message == "Unauthorized")
              navigate("/noaccess", { replace: true });
          }
        });
    }
  }, [medicationsIsVisible]);

  useEffect(() => {
    if (token && NotesIsVisible) {
      setIsLoading(false);

      axios
        .get(`http://localhost:3000/notes`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setNotes(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          if (error.response) {
            if (error.response.data.message == "Unauthorized")
              navigate("/noaccess", { replace: true });
          }
        });
    }
  }, [NotesIsVisible]);

  return (
    <div className={styles.container}>
      {isLoading ? (
        <div className="container">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          {/* patient medications */}
          <NavBar />
          <div
            className={`${styles.body} ${i18n.language == "ar" && styles.rtl}`}
          >
            <div
              className={`${styles.card} ${
                i18n.language == "ar" && styles.rtl
              }`}
            >
              {medicationsIsVisible ? (
                <>
                  <div className={styles.patientHeader}>
                    <span
                      className={styles.back}
                      onClick={() => setMedicationsIsVisible(false)}
                    >
                      {i18n.language == "ar" ? (
                        <span>&#x2192;</span>
                      ) : (
                        <span>&#x2190;</span>
                      )}
                    </span>
                    <span className={`bold big ${styles.name}`}>
                      {t("medications")}
                    </span>
                  </div>
                  <div className={styles.details}>
                    {medications ? (
                      medications.map((m) => (
                        <MedicationCard
                          key={m._id}
                          medicationName={m.name}
                          medicationUsage={m.usage}
                          buttonStyle="hideButton"
                        />
                      ))
                    ) : (
                      <p>{t("nodata")}</p>
                    )}
                  </div>
                </>
              ) : // patient notes
              NotesIsVisible ? (
                <>
                  <div className={styles.patientHeader}>
                    <span
                      className={styles.back}
                      onClick={() => setNotesIsVisible(false)}
                    >
                      {i18n.language == "ar" ? (
                        <span>&#x2192;</span>
                      ) : (
                        <span>&#x2190;</span>
                      )}
                    </span>
                    <span className={`bold big ${styles.name}`}>
                      {t("notes")}
                    </span>
                  </div>
                  <div className={styles.details}>
                    {notes.length > 0 ? (
                      notes.map((n, i) => (
                        <NoteCard
                          key={n._id}
                          count={i + 1}
                          content={n.content}
                          date={n.createdAt.split("T")[0]}
                        />
                      ))
                    ) : (
                      <p>{t("nodata")}</p>
                    )}
                  </div>
                </>
              ) : (
                // patient details
                <>
                  <div className={styles.patientHeader}>
                    <span className={`bold big ${styles.name}`}>
                      {t("profile")}
                    </span>
                  </div>
                  <div className={styles.details}>
                    <KeyValuePairInline
                      label={t("name")}
                      value={patient.name}
                    />

                    <KeyValuePairInline
                      label={t("gender")}
                      value={patient.gender}
                    />
                    <KeyValuePairInline
                      label={t("dob")}
                      value={patient.dob.split("T")[0]}
                    />
                    <KeyValuePairInline
                      label={t("addedin")}
                      value={patient.createdAt.split("T")[0]}
                    />
                    <KeyValuePairInline
                      label={t("medicalcase")}
                      value={patient.patient_case}
                    />
                    <KeyValuePairInline
                      label={t("medications")}
                      value={t("here")}
                      valueStyle={styles.medications}
                      onClick={() => {
                        setMedicationsIsVisible(true);
                        setIsLoading(true);
                      }}
                    />
                    <KeyValuePairInline
                      label={t("notes")}
                      value={t("here")}
                      valueStyle={styles.medications}
                      onClick={() => {
                        setNotesIsVisible(true);
                        setIsLoading(true);
                      }}
                    />
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

export default PatientProfile;
