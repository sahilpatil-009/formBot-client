import React from "react";
import styles from "./compStyles/formmFormat.module.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const FormmFormat = ({ form, handleDeleteForm }) => {

  const navigate = useNavigate();

  const handelDeleteClick = (e) =>{
    e.stopPropagation();  // Prevent event bubbling to the parent div
    handleDeleteForm(form._id);
  }

  // navigate(`/workspace/${folder._id}`

  return (
    <div className={styles.file} onClick={()=>navigate(`/form-get/${form._id}`)} >
      <div
        className={styles.dlticon}
        onClick={handelDeleteClick}
      >
        <RiDeleteBin6Line size={20} color="red" />
      </div>
      <p>{form.formName}</p>
    </div>
  );
};

export default FormmFormat;
