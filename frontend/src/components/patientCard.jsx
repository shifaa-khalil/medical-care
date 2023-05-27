import { useNavigate } from "react-router-dom";
import styles from "./patientCard.module.css";
import KeyValuePair from "./keyValuePair";

const PatientCard = (props) => {
  const navigate = useNavigate();

  return (
    <div className={styles.card}>
      <KeyValuePair label="Patient Name: " value={props.name} />
      <KeyValuePair label="Added in: " value={props.added_in} />
      <KeyValuePair label="Patient's Case: " value={props.patient_case} />
      <p
        className={`normal ${styles.moreDetails}`}
        onClick={() => navigate(`/patient/${props.patient_id}`)}
      >
        More Details
      </p>
    </div>
  );
};

export default PatientCard;
