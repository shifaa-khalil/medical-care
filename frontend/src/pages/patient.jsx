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
import { useTranslation } from "react-i18next";

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
  const { t, i18n } = useTranslation();

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
        navigate("/home");
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
          if (error.response) {
            if (error.response.data.message == "Unauthorized")
              navigate("/noaccess", { replace: true });
          }
        });
    } else navigate("/");
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
          if (error.response) {
            if (error.response.data.message == "Unauthorized")
              navigate("/noaccess", { replace: true });
          }
        });
    }
  }, [medicationsIsVisible]);

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
            <div className={styles.card}>
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
                      <p>{t("nodata")}</p>
                    )}
                  </div>
                  <MyButton
                    text={t("addmedication")}
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
                          label={t("medicationname")}
                          type="text"
                          value={medicationName}
                          onChange={(e) => {
                            setMedicationName(e.target.value);
                            setError("");
                          }}
                        />
                        <InputCard
                          label={t("medicationusage")}
                          type="text"
                          value={medicationUsage}
                          onChange={(e) => {
                            setMedicationUsage(e.target.value);
                            setError("");
                          }}
                        />
                        <div className={styles.btnRow}>
                          <MyButton
                            text={t("submit")}
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
                            {t("cancel")}
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
                    <span
                      className={styles.back}
                      onClick={() => navigate("/home")}
                    >
                      {i18n.language == "ar" ? (
                        <span>&#x2192;</span>
                      ) : (
                        <span>&#x2190;</span>
                      )}
                    </span>
                    <span className={`bold big ${styles.name}`}>
                      {patient.name}
                    </span>
                  </div>
                  <div className={styles.details}>
                    <KeyValuePairInline
                      label={t("gender")}
                      value={t(patient.gender)}
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
                      label={t("patientcase")}
                      value={patient.patient_case}
                    />
                    <KeyValuePairInline
                      label={t("medications")}
                      value={t("here")}
                      valueStyle={styles.medications}
                      onClick={() => setMedicationsIsVisible(true)}
                    />
                  </div>
                  <div className="btn-row">
                    <MyButton
                      text={t("droppatient")}
                      style="blueButton"
                      onClick={() => handleDropPatient(patient_id)}
                    />
                    <MyButton
                      text={t("addnote")}
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
