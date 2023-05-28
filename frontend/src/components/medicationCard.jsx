import MyButton from "./button";
import styles from "./medicationCard.module.css";

const MedicationCard = (props) => {
  return (
    <div className="row">
      <p>
        <span className={`bold medium`}>{props.medicationName} </span>
        <span className={`normal medium`}>--{props.medicationUsage}</span>
      </p>
      <div className="btn-row">
        <MyButton
          text="edit"
          style={`btn-shadow ${props.buttonStyle}`}
          onClick={props.onEdit}
        />
        <MyButton
          text="drop"
          style={`blueButton ${props.buttonStyle}`}
          onClick={props.onDrop}
        />
      </div>
    </div>
  );
};

export default MedicationCard;
