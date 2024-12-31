import React, { useRef, useState } from "react";
import styles from "./createfolder.module.css";
import { createFolder } from "../../services/admin.services";

const CreatFolder = ({ onClose }) => {
  const modelRef = useRef();
  const closeModel = (e) => {
    if (modelRef.current === e.target) {
      onClose();
    }
  };

  const [folderName, setFolderName] = useState();
  const [worning, setWorning] = useState("");

  const handleCreateFolder = async () => {
    if (!folderName) {
      return setWorning("All fields Required");
    }
    try {
      const res = await createFolder({folderName});
      const data = await res.json();
      if (res.status == 200) {
        alert("Folder create Succesfully");
        onClose();
      }
      if (res.status == 400) {
        setWorning(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.main} ref={modelRef} onClick={closeModel}>
      <div className={styles.container}>
        <h1>Create New Folder</h1>
        <input
          type="text"
          placeholder="Enter folder name"
          onChange={(e) => setFolderName(e.target.value)}
        />
        <p
          className={styles.worningMsg}
          style={{ visibility: worning ? "visible" : "hidden" }}
        >
          {worning}{" "}
        </p>
        <div className={styles.userBtns}>
          <button onClick={handleCreateFolder}>Done</button>
          <button onClick={onClose}>Cancle</button>
        </div>
      </div>
    </div>
  );
};

export default CreatFolder;
