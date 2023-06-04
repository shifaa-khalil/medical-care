import { useNavigate } from "react-router-dom";
import styles from "./patientCard.module.css";
import KeyValuePair from "./keyValuePair";
import { useTranslation } from "react-i18next";

const PatientCard = (props) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  return (
    <div className={styles.card}>
      <KeyValuePair label={t("patientname") + ":"} value={props.name} />
      <KeyValuePair label={t("addedin")} value={props.added_in} />
      <KeyValuePair label={t("patientcase")} value={props.patient_case} />
      <p
        className={`normal ${styles.moreDetails}`}
        onClick={() => navigate(`/patient/${props.patient_id}`)}
      >
        {t("moredetails")}
      </p>
    </div>
  );
};

export default PatientCard;
