import styles from "./noteForm.module.css";
import MyButton from "../components/button";

const NoteForm = (props) => {
  return (
    <div className={styles.form}>
      <p className={`normal medium`}>Note Content:</p>
      <textarea
        className={styles.textarea}
        value={props.value}
        onChange={props.onChange}
      />
      <div className={styles.btnRow}>
        <MyButton text="Submit" style="blueButton" onClick={props.onSubmit} />
        <span className="bold normal" onClick={props.onCancel}>
          Cancel
        </span>
      </div>
    </div>
  );
};

export default NoteForm;
