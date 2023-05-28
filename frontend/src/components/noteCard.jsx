import styles from "./noteCard.module.css";

const NoteCard = (props) => {
  return (
    <div className={`row ${styles.card}`}>
      <div className={styles.noteContent}>
        <span className={`bold medium`}>{props.count}- </span>
        <span className={`normal medium`}>{props.content}</span>
      </div>

      <span className={`normal medium`}>{props.date}</span>
    </div>
  );
};

export default NoteCard;
