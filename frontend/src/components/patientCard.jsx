import styles from "./patientCard.module.css";
const PatientCard = () => {
  return (
    <div className={styles.card}>
      <p className="medium">
        <span className="bold">Patient Name: </span>
        <span className="normal">John Doe</span>
      </p>
      <p className="medium">
        <span className="bold">Added in: </span>
        <span className="normal">May-25-2023</span>
      </p>
      <p className="medium">
        <span className="bold">Patient's Case: </span>
        <span className="normal">heart attack</span>
      </p>
      <p className={`normal ${styles.moreDetails}`}>More Details</p>
    </div>
  );
};

export default PatientCard;
