import React, { useContext, useEffect, useState } from "react";
import styles from "./compStyles/workNav.module.css";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../Contexts/ThemeProvider";

const WorkSpaceNavbar = ({userData, setShowShareModel, myWorkSpaces, handleSelectedWorkSpace}) => {
  
  const{light, setLight}  = useContext(ThemeContext);
  console.log("linght->",light);
  
  const [toggelBack, settoggleBack] = useState(!light);

  useEffect(() => {
    if(light){
      document.documentElement.setAttribute("data-theme", "light");
    }else{
      document.documentElement.setAttribute("data-theme", "");
    }
  },[light]);


  const navigate = useNavigate();
  const handleSelectChange = (event) => {
    const value = event.target.value;
    if (value === "Settings") {
      navigate(`/settings/${userData.id}`);
    } else if (value === "Logout") {
      localStorage.removeItem("token"); // Clear token
      alert("Logged out successfully");
      navigate("/"); 
    } else{
      handleSelectedWorkSpace(value)
    }
  };

  const handleToggleChange = () => {
    settoggleBack((prev) => !prev);
    console.log("Toggle is now:", !toggelBack ? "Checked" : "Unchecked");
    setLight(!light)
  };


  return (
    <div className={styles.workNavbar}>
      <div className={styles.ctrlOptions}>
        <select onChange={handleSelectChange}>
          <option>{ userData && userData.username}'s workspace</option>
          {
            myWorkSpaces && myWorkSpaces.map((user,index)=>(
              <option value={user.userId._id} key={index}>{user.userId.username}'s workspace</option>
            ))
          }
          <option value="Settings" >Settings</option>
          <option value="Logout">Logout</option>
        </select>
      </div>
      <div className={styles.userCtrl}>
        {/* <div>Light and Dark</div> */}
        <div className={styles.toggle}>
          Light
          <input type="checkbox" name="checkbox" id="toggle" checked={toggelBack} onChange={handleToggleChange} />
          <label htmlFor="toggle"></label>
          Dark
        </div>
        <div className={styles.share}>
          {
            setShowShareModel &&
          <button onClick={()=>setShowShareModel(true)}>Share</button>
          }
        </div>
      </div>
    </div>
  );
};

export default WorkSpaceNavbar;
