import styles from "./patient.module.css";
import NavBar from "../components/navBar";
import MyButton from "../components/button";
import NoteForm from "../components/noteForm";
import MedicationCard from "../components/medicationCard";
import KeyValuePairInline from "../components/keyValuePairInline";
import InputCard from "../components/inputCard";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../App.css";

const PatientProfile = () => {
  const [medicationsIsVisible, setMedicationsIsVisible] = useState(false);
  const navigate = useNavigate();
  const [medications, setMedications] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { patient_id } = useParams();
  const patient = JSON.parse(localStorage.getItem("userData"));
  console.log(patient);
  console.log(patient._id);

  //   useEffect(() => {
  //     if (token) {
  //       axios
  //         .get(`http://localhost:3000/patient/${patient_id}`, {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         })
  //         .then((response) => {
  //           setPatient(response.data);
  //           setIsLoading(false);
  //         })
  //         .catch((error) => {
  //           console.error(error);
  //         });
  //     } else navigate("/login");
  //   }, [token]);

  //   useEffect(() => {
  //     if (medicationsIsVisible) {
  //       axios
  //         .get(`http://localhost:3000/medications/${patient_id}`, {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         })
  //         .then((response) => {
  //           setMedications(response.data);
  //         })
  //         .catch((error) => {
  //           console.error(error);
  //         });
  //     }
  //   }, [medicationsIsVisible]);

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
                  {/* <div className={styles.details}>
                    {medications ? (
                      medications.map((m) => (
                        <MedicationCard
                          key={m._id}
                          medicationName={m.name}
                          medicationUsage={m.usage}
                          
                        />
                      ))
                    ) : (
                      <p>no data</p>
                    )}
                  </div> */}
                </>
              ) : (
                // patient details
                <>
                  <div className={styles.patientHeader}>
                    <span className={styles.back} onClick={() => navigate("/")}>
                      &#x2190;
                    </span>
                    <span className={`bold big ${styles.name}`}>Profile</span>
                  </div>
                  <div className={styles.details}>
                    <KeyValuePairInline label="Name" value={patient.name} />

                    <KeyValuePairInline label="Gender" value={patient.gender} />
                    {/* <KeyValuePairInline
                      label="Date of Birth"
                      value={patient.dob.split("T")[0]}
                    />
                    <KeyValuePairInline
                      label="Added in"
                      value={patient.createdAt.split("T")[0]}
                    /> */}
                    <KeyValuePairInline
                      label="Medical Case"
                      value={patient.patient_case}
                    />
                    <KeyValuePairInline
                      label="Medications"
                      value="here"
                      valueStyle={styles.medications}
                      onClick={() => setMedicationsIsVisible(true)}
                    />
                  </div>
                  {/* <div className="btn-row">
                    <MyButton
                      text="drop patient"
                      style="blueButton"
                      onClick={() => handleDropPatient(patient_id)}
                    />
                    <MyButton
                      text="add note"
                      style="btn-shadow"
                      onClick={() => setNoteFormVisible(true)}
                    />
                  </div> */}
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
