import styles from "./keyValuePair.module.css";

const KeyValuePair = (props) => {
  return (
    <div className={`medium ${styles.card}`}>
      <span className={`bold ${styles.left}`}>{props.label}</span>
      <span className={`normal ${styles.right}`}>{props.value}</span>
    </div>
  );
};

export default KeyValuePair;
