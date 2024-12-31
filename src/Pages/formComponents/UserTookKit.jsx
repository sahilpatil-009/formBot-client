import React from "react";
import styles from "../pageStyles/Form.module.css";
import { LuMessageSquare } from "react-icons/lu";
import { GoImage } from "react-icons/go";
import { RxText } from "react-icons/rx";
import { LuHash } from "react-icons/lu";
import { CiAt } from "react-icons/ci";
import { FiPhone } from "react-icons/fi";
import { CiCalendar } from "react-icons/ci";
import { IoIosStarOutline } from "react-icons/io";
import { FiCheckSquare } from "react-icons/fi";

const UserTookKit = ({ addNewBubble, addNewInput }) => {
  return (
    <div className={styles.Usertoolskit}>
      <div className={styles.bubble}>
        <p>Bubbles</p>
        <div className={styles.options}>
          <div
            className={styles.optionStyles}
            onClick={() => addNewBubble("text")}
          >
            <LuMessageSquare size={20} color="#4B83FF" />
            Text
          </div>
          <div
            className={styles.optionStyles}
            onClick={() => addNewBubble("image")}
          >
            <GoImage size={20} color="#4B83FF" />
            Image
          </div>
        </div>
      </div>
      <div className={styles.bubble}>
        <p>Inputes</p>
        <div className={styles.options}>
          <div
            className={styles.optionStyles}
            onClick={() => addNewInput("text")}
          >
            <RxText size={20} color="#FFA54C" />
            Text
          </div>
          <div
            className={styles.optionStyles}
            onClick={() => addNewInput("number")}
          >
            <LuHash size={20} color="#FFA54C" />
            Number
          </div>
          <div
            className={styles.optionStyles}
            onClick={() => addNewInput("email")}
          >
            <CiAt size={20} color="#FFA54C" />
            Email
          </div>
          <div
            className={styles.optionStyles}
            onClick={() => addNewInput("phone")}
          >
            <FiPhone size={20} color="#FFA54C" />
            Phone
          </div>
          <div
            className={styles.optionStyles}
            onClick={() => addNewInput("date")}
          >
            <CiCalendar size={20} color="#FFA54C" />
            Date
          </div>
          <div
            className={styles.optionStyles}
            onClick={() => addNewInput("rating")}
          >
            <IoIosStarOutline size={20} color="#FFA54C" />
            Rating
          </div>
          <div
            className={styles.optionStyles}
            onClick={() => addNewInput("button")}
          >
            <FiCheckSquare size={18} color="#FFA54C" />
            Buttons
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTookKit;
