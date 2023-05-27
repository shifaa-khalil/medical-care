import styles from "./keyValuePairInline.module.css";

const KeyValuePairInline = (props) => {
  return (
    <div className={`medium ${styles.card}`}>
      <span className={`bold medium`}>{props.label}: </span>
      <span
        className={`normal medium ${props.valueStyle}`}
        onClick={props.onClick}
      >
        {props.value}
      </span>
    </div>
  );
};

export default KeyValuePairInline;
