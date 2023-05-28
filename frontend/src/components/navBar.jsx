import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./navBar.module.css";

const NavBar = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const user = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    if (user) setUserName(user.name);
    else setUserName("");
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
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
