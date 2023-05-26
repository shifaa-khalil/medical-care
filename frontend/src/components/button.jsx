import styles from "./button.module.css";
import "../App.css";

const MyButton = (props) => {
  return (
    <button
      className={`bold ${styles.button} ${props.style}`}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
};

export default MyButton;
