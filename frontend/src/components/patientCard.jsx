import styles from "./patientCard.module.css";
const PatientCard = () => {
  return (
    <div className={styles.card}>
      <div className={`medium ${styles.oneLine}`}>
        <span className={`bold ${styles.left}`}>Patient Name: </span>
        <span className={`normal ${styles.right}`}>John Doe</span>
      </div>
      <div className={`medium ${styles.oneLine}`}>
        <span className={`bold ${styles.left}`}>Added in: </span>
        <span className={`normal ${styles.right}`}>May-25-2023</span>
      </div>
      <div className={`medium ${styles.oneLine}`}>
        <span className={`bold ${styles.left}`}>Patient's Case: </span>
        <span className={`normal ${styles.right}`}>heart attack</span>
      </div>
      <p className={`normal ${styles.moreDetails}`}>More Details</p>
    </div>
  );
};

export default PatientCard;
