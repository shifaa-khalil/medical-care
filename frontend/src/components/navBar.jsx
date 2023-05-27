import { useNavigate } from "react-router-dom";
import styles from "./navBar.module.css";

const NavBar = () => {
  const userName = localStorage.getItem("name");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className={styles.bar}>
      {userName ? (
        <div className={styles.column}>
          <span className="big">Welcome, {userName.split(" ")[0]}</span>
          <span className={styles.logout} onClick={handleLogout}>
            Logout
          </span>
        </div>
      ) : null}
    </div>
  );
};

export default NavBar;
