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
  const [medicationAction, setMedicationAction] = useState("add");
  const [medicationId, setMedicationId] = useState("");
  const [error, setError] = useState("");
  const { patient_id } = useParams();

  const handleDropPatient = (patient_id) => {
    axios
      .delete(`http://localhost:3000/patient/${patient_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        alert(
          `Patient "${patient.name}" is dropped successfully!\nThey will be notified by an email.`
        );
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
          alert(
            `Medication for patient "${patient.name}" is added successfully!\nThey will be notified by an email.`
          );
          window.location.reload();
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

  const handleEditMedication = (medication_id) => {
    if (!medicationName || !medicationUsage)
      setError("All fields are required");
    else {
      const data = { name: medicationName, usage: medicationUsage };
      axios
        .put(`http://localhost:3000/medication/${medication_id}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          alert(
            `Medication for patient "${patient.name}" is updated successfully!\nThey will be notified by an email.`
          );
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleDropMedication = (medication_id) => {
    axios
      .delete(`http://localhost:3000/medication/${medication_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        alert(
          `Medication for patient "${patient.name}" is dropped successfully!\nThey will be notified by an email.`
        );
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
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
          alert(
            `Note for patient "${patient.name}" is added successfully!\nThey will be notified by an email.`
          );
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
      axios
        .get(`http://localhost:3000/medications/${patient_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setMedications(response.data);
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
                  <div className={styles.patientHeader}>
                    <span
                      className={styles.back}
                      onClick={() => setMedicationsIsVisible(false)}
                    >
                      &#x2190;
                    </span>
                    <span className={`bold big ${styles.name}`}>
                      {patient.name}
                    </span>
                  </div>
                  <div className={styles.details}>
                    {medications ? (
                      medications.map((m) => (
                        <MedicationCard
                          key={m._id}
                          medicationName={m.name}
                          medicationUsage={m.usage}
                          onDrop={() => handleDropMedication(m._id)}
                          onEdit={() => {
                            setMedicationFormVisible(true);
                            setMedicationId(m._id);
                            setMedicationName(m.name);
                            setMedicationUsage(m.usage);
                            setMedicationAction("edit");
                          }}
                        />
                      ))
                    ) : (
                      <p>no data</p>
                    )}
                  </div>
                  <MyButton
                    text="add medication"
                    style="blueButton"
                    onClick={() => {
                      setMedicationFormVisible(true);
                      setMedicationAction("add");
                    }}
                  />

                  {medicationFormVisible && (
                    <div className={styles.modal}>
                      <div className={styles.modalContent}>
                        {error && <p className="error bold medium">{error}</p>}
                        <InputCard
                          label="Medication name"
                          type="text"
                          value={medicationName}
                          onChange={(e) => {
                            setMedicationName(e.target.value);
                            setError("");
                          }}
                        />
                        <InputCard
                          label="Medication usage"
                          type="text"
                          value={medicationUsage}
                          onChange={(e) => {
                            setMedicationUsage(e.target.value);
                            setError("");
                          }}
                        />
                        <div className={styles.btnRow}>
                          <MyButton
                            text="Submit"
                            style="blueButton"
                            onClick={
                              medicationAction == "edit"
                                ? () => handleEditMedication(medicationId)
                                : handleSubmitMedication
                            }
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
                  <div className={styles.details}>
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
                  </div>
                  {noteFormVisible && (
                    <div className={styles.modal}>
                      <div className={styles.modalContent}>
                        {error && <p className="error bold medium">{error}</p>}
                        <NoteForm
                          value={note}
                          onChange={(e) => {
                            setNote(e.target.value);
                            setError("");
                          }}
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
