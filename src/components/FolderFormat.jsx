import React from "react";
import styles from "./compStyles/folder.module.css";
import { useNavigate } from "react-router-dom";

const FolderFormat = ({ folder }) => {
  const navigate = useNavigate();

  return (
    <div
      key={folder._id}
      className={styles.folder}
      onClick={() => navigate(`/workspace/${folder._id}`)}
    >
      <p>{folder.folderName}</p>
    </div>
  );
};

export default FolderFormat;

