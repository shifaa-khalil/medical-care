import MyButton from "./button";

const MedicationCard = (props) => {
  return (
    <div className="row">
      <p>
        <span className={`bold medium`}>{props.medicationName} </span>
        <span className={`normal medium`}>--{props.medicationUsage}</span>
      </p>
      <div className="btn-row">
        <MyButton text="edit" style="btn-shadow" onClick={props.onEdit} />
        <MyButton text="drop" style="blueButton" onClick={props.onDrop} />
      </div>
    </div>
  );
};

export default MedicationCard;
