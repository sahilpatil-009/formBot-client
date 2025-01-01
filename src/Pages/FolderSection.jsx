import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import WorkSpaceNavbar from "../components/WorkSpaceNavbar";
import styles from "./pageStyles/folderSection.module.css";
import { deleteForm, getAllFolder, getFormById } from "../services/admin.services";
import { FaPlus } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import FormmFormat from "../components/FormmFormat";
import Loader from "../components/Loder";

const FolderSection = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [allFolders, setAllFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [allForms, setAllForms] = useState([]);

  const navigate = useNavigate();

  const getAllfolders = async () => {
    try {
      setLoading(true);
      const res = await getAllFolder();
      const data = await res.json();
      setAllFolders(data.folders);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleDeleteForm = async (id) => {
    try {
      setLoading(true);
      const res = await deleteForm(id);
      const data = await res.json();
      if (res.status == 200) {
        alert(data.message);
        getAllfolders();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllfolders();
  }, []);

  useEffect(() => {
    if (id && allFolders.length > 0) {
      const folder = allFolders.find((folder) => folder._id === id);
      setSelectedFolder(folder);
    }
  }, [id, allFolders]);

  return (
    <div className={styles.container}>
      <WorkSpaceNavbar />
      {loading ? <Loader /> : <>
      <div className={styles.foldersNav}>
        <div
          className={styles.folderName}
          onClick={() => navigate("/workspace")}
        >
          <FaArrowLeftLong size={24} /> Back to WorkSpace
        </div>
        {allFolders &&
          allFolders.map((folder) => (
            <div
              key={folder._id}
              className={`${styles.folderName} ${
                id === folder._id ? styles.activeFolder : ""
              }`}
              onClick={() => navigate(`/workspace/${folder._id}`)}
            >
              <p>{folder.folderName}</p>
            </div>
          ))}
      </div>
      <div className={styles.WorkSpace}>
        <div className={styles.formCollect}>
          <div
            className={styles.folder}
            onClick={() => navigate(`/form-create/${id}`)}
          >
            <FaPlus size={30} />
            <p>Create a typebot</p>
          </div>
          {selectedFolder &&
            selectedFolder.form.map((form, index) => (
              <FormmFormat
                key={index}
                form={form}
                handleDeleteForm={handleDeleteForm}
              />
            ))}
        </div>
      </div>
      </>}
    </div>
  );
};

export default FolderSection;
