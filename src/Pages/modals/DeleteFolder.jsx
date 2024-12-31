import React, { useRef } from "react";
import styles from "./createfolder.module.css";

const DeleteFolder = ({ onClose, onConfirm}) => {
    const modelRef = useRef();
      const closeModel = (e) => {
        if (modelRef.current === e.target) {
          onClose();
        }
      };
  return (
    <div className={styles.main} ref={modelRef} onClick={closeModel}>
      <div className={styles.container} style={{justifyContent:"space-evenly"}}>
        <h1 style={{textAlign:"center"}}>Are you sure you want to delete this Folder ?</h1>
        <div className={styles.userBtns}>
          <button onClick={onConfirm}>Confirm</button>
          <button onClick={onClose}>Cancle</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteFolder;
