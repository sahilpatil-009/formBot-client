import React, { useState } from "react";
import styles from "./pageStyles/settings.module.css";
import { SlLock } from "react-icons/sl";
import { FaRegUser } from "react-icons/fa";
import { BsEyeSlash } from "react-icons/bs";
import { PiEye } from "react-icons/pi";
import { FiLogOut } from "react-icons/fi";
import { UpdateUser } from "../services/user.services";
import { useNavigate, useParams } from "react-router-dom";
const Settings = () => {

  // get userId form url using params
  const { userId }  = useParams();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [userData, setUserData] = useState({
    Newusername: "",
    Newemail: "",
    oldpassword: "",
    newpassword: "",
  });

  // Update user details
  const handelOnSubmit = async(e) => {
    e.preventDefault();
    try {
      const res = await UpdateUser(userId,userData);
      const data = await res.json();
      if(res == 200){
        alert(data.message);
      }else{
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }

    setUserData({
        Newusername: "",
        Newemail: "",
        newpassword: "",
        oldpassword: "",
      });

  };

  // handle User Logout
  const handleLogout = () => {
      localStorage.removeItem("token"); 
      alert("Logged out successfully");
      navigate("/"); 
    };

  return (
    <div className={styles.container}>
      <h2>Settings</h2>
      <form className={styles.UpdateFrom} onSubmit={handelOnSubmit}>
        <div className={styles.Inputdiv}>
          <FaRegUser size={25} color="#D0D0D0" />
          <input
            type="text"
            placeholder="Name"
            value={userData.Newusername}
            name="Newusername"
            onChange={(e) =>
              setUserData({ ...userData, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div className={styles.Inputdiv}>
          <SlLock size={30} color="#D0D0D0" />
          <input
            type="email"
            placeholder="Update Email"
            value={userData.Newemail}
            name="Newemail"
            onChange={(e) =>
              setUserData({ ...userData, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div className={styles.Inputdiv}>
          <SlLock size={30} color="#D0D0D0" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Old Password"
            value={userData.oldpassword}
            name="oldpassword"
            onChange={(e) =>
              setUserData({ ...userData, [e.target.name]: e.target.value })
            }
          />
          <label onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <BsEyeSlash size={30} color="#D0D0D0" />
            ) : (
              <PiEye size={30} color="#D0D0D0" />
            )}
          </label>
        </div>
        <div className={styles.Inputdiv}>
          <SlLock size={30} color="#D0D0D0" />
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="New Password"
            value={userData.newpassword}
            name="newpassword"
            onChange={(e) =>
              setUserData({ ...userData, [e.target.name]: e.target.value })
            }
          />
          <label onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? (
              <BsEyeSlash size={30} color="#D0D0D0" />
            ) : (
              <PiEye size={30} color="#D0D0D0" />
            )}
          </label>
        </div>
        <button className={styles.updetBtn} type="submit">
          Update
        </button>
      </form>
      <div className={styles.logout} onClick={handleLogout}>
        <FiLogOut size={35} color="red" />
        <p>Log Out</p>
      </div>
    </div>
  );
};

export default Settings;
