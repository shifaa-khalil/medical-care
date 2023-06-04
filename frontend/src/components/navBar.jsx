import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import styles from "./navBar.module.css";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../LanguageContext";

const lngs = [
  { code: "en", native: "English" },
  { code: "tr", native: "Türkçe" },
  { code: "ar", native: "العربية" },
];

const NavBar = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const user = JSON.parse(localStorage.getItem("userData"));
  const { t, i18n } = useTranslation();
  const { language, changeLanguage } = useContext(LanguageContext);

  useEffect(() => {
    if (user) setUserName(user.name);
    else setUserName("");
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    navigate("/");
  };

  return (
    <div className={styles.bar}>
      <select
        value={language}
        className={styles.language}
        onChange={(e) => {
          i18n.changeLanguage(e.target.value);
          changeLanguage(e.target.value);
        }}
      >
        {lngs.map((lng, i) => {
          return <option value={lng.code}>{lng.native}</option>;
        })}
      </select>
      {/* <h2 onClick={navigate("/home")}>Home</h2> */}
      {userName && (
        <div
          className={`${styles.column} ${i18n.language == "ar" && styles.rtl}`}
        >
          <span className="big">
            {t("welcome")},
            <span className={styles.name}> {userName.split(" ")[0]}</span>
          </span>
          <span className={styles.logout} onClick={handleLogout}>
            {t("logout")}
          </span>
        </div>
      )}
    </div>
  );
};

export default NavBar;
