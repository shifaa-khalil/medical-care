import PatientCard from "../components/patientCard";
import styles from "./home.module.css";
import NavBar from "../components/navBar";

const Home = () => {
  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles.body}>
        <PatientCard />
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
