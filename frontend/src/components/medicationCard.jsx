import MyButton from "./button";

const MedicationCard = (props) => {
  return (
    <div className="row">
      <p>
        <span className={`bold medium`}>{props.medicationName} </span>
        <span className={`normal medium`}>--{props.medicationUsage}</span>
      </p>
      <MyButton text="drop" style="blueButton" onClick={props.onDrop} />
    </div>
  );
};

export default MedicationCard;
