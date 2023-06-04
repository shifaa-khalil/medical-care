import MyButton from "./button";
import { useTranslation } from "react-i18next";

const MedicationCard = (props) => {
  const { t, i18n } = useTranslation();

  return (
    <div className="row">
      <p>
        <span className={`bold medium`}>{props.medicationName} </span>
        <span className={`normal medium`}>--{props.medicationUsage}</span>
      </p>
      <div className="btn-row">
        <MyButton
          text={t("editmedication")}
          style={`btn-shadow ${props.buttonStyle}`}
          onClick={props.onEdit}
        />
        <MyButton
          text={t("dropmedication")}
          style={`blueButton ${props.buttonStyle}`}
          onClick={props.onDrop}
        />
      </div>
    </div>
  );
};

export default MedicationCard;
