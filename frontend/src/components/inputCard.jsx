import { useNavigate } from "react-router-dom";
import styles from "./inputCard.module.css";
import { useTranslation } from "react-i18next";

const InputCard = (props) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  return (
    <div className={styles.card}>
      <p className={`normal medium`}>{props.label}</p>
      <input
        className={styles.input}
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default InputCard;
