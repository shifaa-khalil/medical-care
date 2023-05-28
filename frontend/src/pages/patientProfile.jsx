import styles from "./patientProfile.module.css";
import NavBar from "../components/navBar";
import NoteCard from "../components/noteCard";
import MedicationCard from "../components/medicationCard";
import KeyValuePairInline from "../components/keyValuePairInline";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../App.css";

const PatientProfile = () => {
  const [medicationsIsVisible, setMedicationsIsVisible] = useState(false);
  const [NotesIsVisible, setNotesIsVisible] = useState(false);
  const navigate = useNavigate();
  const [medications, setMedications] = useState([]);
  const [notes, setNotes] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(false);
  const patient = JSON.parse(localStorage.getItem("userData"));

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
        <p>Loading</p>
      ) : (
        <>
          {/* patient medications */}
          <NavBar />
          <div className={styles.body}>
            <div className={styles.card}>
              {medicationsIsVisible ? (
                <>
                  <div className={styles.patientHeader}>
                    <span
                      className={styles.back}
                      onClick={() => setMedicationsIsVisible(false)}
                    >
                      &#x2190;
                    </span>
                    <span className={`bold big ${styles.name}`}>
                      Medications
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
                      <p>no data</p>
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
                      &#x2190;
                    </span>
                    <span className={`bold big ${styles.name}`}>Notes</span>
                  </div>
                  <div className={styles.details}>
                    {notes ? (
                      notes.map((n, i) => (
                        <NoteCard
                          key={n._id}
                          count={i + 1}
                          content={n.content}
                          date={n.createdAt.split("T")[0]}
                        />
                      ))
                    ) : (
                      <p>no data</p>
                    )}
                  </div>
                </>
              ) : (
                // patient details
                <>
                  <div className={styles.patientHeader}>
                    <span className={`bold big ${styles.name}`}>Profile</span>
                  </div>
                  <div className={styles.details}>
                    <KeyValuePairInline label="Name" value={patient.name} />

                    <KeyValuePairInline label="Gender" value={patient.gender} />
                    <KeyValuePairInline
                      label="Date of Birth"
                      value={patient.dob.split("T")[0]}
                    />
                    <KeyValuePairInline
                      label="Added in"
                      value={patient.createdAt.split("T")[0]}
                    />
                    <KeyValuePairInline
                      label="Medical Case"
                      value={patient.patient_case}
                    />
                    <KeyValuePairInline
                      label="Medications"
                      value="here"
                      valueStyle={styles.medications}
                      onClick={() => {
                        setMedicationsIsVisible(true);
                        setIsLoading(true);
                      }}
                    />
                    <KeyValuePairInline
                      label="Notes"
                      value="here"
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
