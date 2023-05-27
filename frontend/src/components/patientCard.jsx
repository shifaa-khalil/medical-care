import { useNavigate } from "react-router-dom";
import styles from "./patientCard.module.css";

const PatientCard = (props) => {
  const navigate = useNavigate();

  return (
    <div className={styles.card}>
      <div className={`medium ${styles.oneLine}`}>
        <span className={`bold ${styles.left}`}>Patient Name: </span>
        <span className={`normal ${styles.right}`}>{props.name}</span>
      </div>
      <div className={`medium ${styles.oneLine}`}>
        <span className={`bold ${styles.left}`}>Added in: </span>
        <span className={`normal ${styles.right}`}>{props.added_in}</span>
      </div>
      <div className={`medium ${styles.oneLine}`}>
        <span className={`bold ${styles.left}`}>Patient's Case: </span>
        <span className={`normal ${styles.right}`}>{props.patient_case}</span>
      </div>
      <p
        className={`normal ${styles.moreDetails}`}
        onClick={() => navigate("/patient")}
      >
        More Details
      </p>
    </div>
  );
};

export default PatientCard;
