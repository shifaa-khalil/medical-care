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

const Patient = () => {
  const [medicationsIsVisible, setMedicationsIsVisible] = useState(false);
  const navigate = useNavigate();
  const [patient, setPatient] = useState();
  const [medications, setMedications] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(true);
  const [noteFormVisible, setNoteFormVisible] = useState(false);
  const [medicationFormVisible, setMedicationFormVisible] = useState(false);
  const [note, setNote] = useState("");
  const [medicationName, setMedicationName] = useState("");
  const [medicationUsage, setMedicationUsage] = useState("");
  const [error, setError] = useState("");
  const { patient_id } = useParams();

  const handleSubmitMedication = () => {
    if (!medicationName || !medicationUsage)
      setError("All fields are required");
    else {
      const data = { name: medicationName, usage: medicationUsage };
      console.log(data);
      axios
        .post(`http://localhost:3000/medication/${patient_id}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setMedicationName("");
          setMedicationUsage("");
          setMedicationFormVisible(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleCancelMedication = () => {
    setMedicationName("");
    setMedicationUsage("");
    setError("");
    setMedicationFormVisible(false);
  };

  const handleNoteChange = (e) => {
    setNote(e.target.value);
    setError("");
  };

  const handleSubmitNote = () => {
    if (note == "") setError("Cannot be empty!");
    else {
      const data = { content: note };

      axios
        .post(`http://localhost:3000/note/${patient_id}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setNoteFormVisible(false);
          setNote("");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleCancelNote = () => {
    setNote("");
    setError("");
    setNoteFormVisible(false);
  };

  useEffect(() => {
    if (token) {
      axios
        .get(`http://localhost:3000/patient/${patient_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setPatient(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    } else navigate("/login");
  }, [token]);

  useEffect(() => {
    if (medicationsIsVisible) {
      setIsLoading(true);
      axios
        .get(`http://localhost:3000/medications/${patient_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [medicationsIsVisible]);

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
                  <p
                    className={styles.back}
                    onClick={() => setMedicationsIsVisible(false)}
                  >
                    &#x2190;
                  </p>
                  <MedicationCard
                    medicationName="Morphin"
                    medicationUsage="one pill daily"
                    onDrop={() => console.log("dropped")}
                  />
                  <MyButton
                    text="add medication"
                    style="blueButton"
                    onClick={() => setMedicationFormVisible(true)}
                  />

                  {medicationFormVisible && (
                    <div className={styles.modal}>
                      <div className={styles.modalContent}>
                        {error && <p className="error bold medium">{error}</p>}
                        <InputCard
                          label="Medication name"
                          type="text"
                          value={medicationName}
                          onChange={(e) => setMedicationName(e.target.value)}
                        />
                        <InputCard
                          label="Medication usage"
                          type="text"
                          value={medicationUsage}
                          onChange={(e) => setMedicationUsage(e.target.value)}
                        />
                        <div className={styles.btnRow}>
                          <MyButton
                            text="Submit"
                            style="blueButton"
                            onClick={handleSubmitMedication}
                          />
                          <span
                            className={`bold normal`}
                            onClick={handleCancelMedication}
                          >
                            Cancel
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                // patient details
                <>
                  <div className={styles.patientHeader}>
                    <span className={styles.back} onClick={() => navigate("/")}>
                      &#x2190;
                    </span>
                    <span className={`bold big ${styles.name}`}>
                      {patient.name}
                    </span>
                  </div>
                  <div className={styles.patientDetails}>
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
                      label="Patient's Case"
                      value={patient.patient_case}
                    />
                    <KeyValuePairInline
                      label="Medications"
                      value="here"
                      valueStyle={styles.medications}
                      onClick={() => setMedicationsIsVisible(true)}
                    />
                  </div>
                  <div className="btn-row">
                    <MyButton text="drop patient" style="blueButton" />
                    <MyButton
                      text="add note"
                      style="btn-shadow"
                      onClick={() => setNoteFormVisible(true)}
                    />
                  </div>
                  {noteFormVisible && (
                    <div className={styles.modal}>
                      <div className={styles.modalContent}>
                        {error && <p className="error bold medium">{error}</p>}
                        <NoteForm
                          value={note}
                          onChange={handleNoteChange}
                          onSubmit={handleSubmitNote}
                          onCancel={handleCancelNote}
                        />
                      </div>
                    </div>
                  )}
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
