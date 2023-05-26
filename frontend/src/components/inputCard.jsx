import { useNavigate } from "react-router-dom";
import styles from "./inputCard.module.css";

const InputCard = (props) => {
  const navigate = useNavigate();

  return (
    <div className={styles.card}>
      <p className={`normal medium`}>{props.label} </p>
      <input
        className={styles.input}
        type={props.type}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
};

export default InputCard;
