import styles from "./noteForm.module.css";
import MyButton from "../components/button";
import { useTranslation } from "react-i18next";

const NoteForm = (props) => {
  const { t, i18n } = useTranslation();

  return (
    <div className={styles.form}>
      <p className={`normal medium`}>{t("notecontent") + ":"}</p>
      <textarea
        className={styles.textarea}
        value={props.value}
        onChange={props.onChange}
      />
      <div className={styles.btnRow}>
        <MyButton
          text={t("submit")}
          style="blueButton"
          onClick={props.onSubmit}
        />
        <span className="bold normal" onClick={props.onCancel}>
          {t("cancel")}
        </span>
      </div>
    </div>
  );
};

export default NoteForm;
