import PatientCard from "../components/patientCard";
import styles from "./home.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <PatientCard />
        <PatientCard />
        <PatientCard />
        <PatientCard />
      </div>
      <p className="bold blue big">See all -></p>
    </div>
  );
};

export default Home;
