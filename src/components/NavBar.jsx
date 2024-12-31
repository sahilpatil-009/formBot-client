import React from "react";
import styles from "./compStyles/navbar.module.css";
import formBotLogo from "../assets/formBotLogo.png";
import { useNavigate } from "react-router-dom";
const NavBar = () => {

  const navigate = useNavigate();
  return (
    <div className={styles.navContainer}>
      <div className={styles.logo}>
        <div className={styles.logoImg}>
          <img src={formBotLogo} alt="" />
        </div>
        <div className={styles.logoName}>
          <p>FormBot</p>
        </div>
      </div>
      <div className={styles.userButtons}>
        <button className={styles.LogIn} onClick={()=>navigate("/login")}>Sign in</button>
        <button className={styles.signIn} onClick={()=>navigate("/register")}>Create a FormBot</button>
      </div>
    </div>
  );
};

export default NavBar;
