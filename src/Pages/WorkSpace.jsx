import React, { useEffect, useState } from "react";
import styles from "./pageStyles/workspace.module.css";
import { FaPlus } from "react-icons/fa6";
import  Loader  from "../components/Loder"
import { AiOutlineFolderAdd } from "react-icons/ai";
import CreatFolder from "./modals/CreatFolder";
import {
  deleteFolder,
  deleteForm,
  getAllFolder,
  getFormById,
  getFormsAtWorkSpace,
} from "../services/admin.services";
import FolderFormat from "../components/FolderFormat";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteFolder from "./modals/DeleteFolder";
import { useNavigate } from "react-router-dom";
import WorkSpaceNavbar from "../components/WorkSpaceNavbar";
import FormmFormat from "../components/FormmFormat";
import { jwtDecode } from "jwt-decode";
import ShareWorkSpace from "./modals/ShareWorkSpace";
import {
  getMyWorkSpaces,
  getMyWorkSpacesFolderForms,
} from "../services/user.services";

const WorkSpace = () => {

  const [showCreateModel, setShowCreateModel] = useState(false);
  const [showDeleteModel, setDeleteCreateModel] = useState(false);
  const [showShareModel, setShowShareModel] = useState(false);
  const [loading, setLoading] = useState(true);

  const [folderToDelete, setFolderToDelete] = useState(null);
  const [allFolders, setAllFolders] = useState();
  const [globalForms, setGlobalForms] = useState([]);

  const [userData, setUserData] = useState();
  const [myWorkSpaces, setMyWorkSpaces] = useState([]);

  const navigate = useNavigate();

  // get all prevoius shared workspaces
  const getWorkSpaces = async () => {
    try {
      const res = await getMyWorkSpaces();
      const data = await res.json();
      if (res.status == 200) {
        setMyWorkSpaces(data.WorkSpaces);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // handle shared workspace selection
  const handleSelectedWorkSpace = async (userid) => {
    console.log(userid);

    try {
      const res = await getMyWorkSpacesFolderForms(userid);
      const workSpaceData = await res.json();
      console.log(workSpaceData);

      if(res.status == 200){
        setAllFolders();
        setGlobalForms([]);
        setAllFolders(workSpaceData.Userfolders);
        setGlobalForms(workSpaceData.GlobalForms);
      }else{
        console.log(res.message);
      }

      console.log(allFolders);
      console.log(globalForms);

    } catch (error) {
      console.log(error);
    }
  };

  // get All User Created folders
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

  // handle deletion for folder
  const handleFolderDelete = async (id) => {
    try {
      setLoading(true);
      const res = await deleteFolder(id);
      const data = await res.json();
      if (res.status === 200) {
        console.log(data.message);
        getAllfolders();
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  // get user created form at Workspace in global space
  const getGlobalForms = async () => {
    try {
      setLoading(true);
      const res = await getFormsAtWorkSpace();
      const data = await res.json();
      if (res.status == 200) {
        setGlobalForms(data.forms);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  // handle user created Form deletion
  const handleDeleteForm = async (id) => {
    try {
      setLoading(true);
      const res = await deleteForm(id);
      const data = await res.json();
      if (res.status == 200) {
        alert(data.message);
        getGlobalForms();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  // get User Details
  const getUserdetail = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodeToken = jwtDecode(token);
        setUserData(decodeToken);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getAllfolders();
  }, [showCreateModel]);

  useEffect(() => {
    getGlobalForms();
    getUserdetail();
    getWorkSpaces();
  }, []);


  return (
    <div className={styles.container}>
      <WorkSpaceNavbar
        userData={userData}
        setShowShareModel={setShowShareModel}
        myWorkSpaces={myWorkSpaces}
        handleSelectedWorkSpace={handleSelectedWorkSpace}
      />
      { loading ? <Loader /> : <>
      <div className={styles.foldersNav}>
        <div
          className={styles.folderName}
          onClick={() => setShowCreateModel(true)}
        >
          <AiOutlineFolderAdd size={25} />
          <p>Create a folder</p>
        </div>
        {allFolders &&
          allFolders.map((folder) => (
            <div key={folder._id} className={styles.folderName}>
              <p onClick={() => navigate(`/workspace/${folder._id}`)}>
                {folder.folderName}
              </p>
              <RiDeleteBin6Line
                size={18}
                color="#F55050"
                onClick={() => {
                  setFolderToDelete(folder._id);
                  setDeleteCreateModel(true);
                }}
              />
            </div>
          ))}
      </div>
      <div className={styles.WorkSpace}>
        <div className={styles.formCollect}>
          {allFolders ? (
            allFolders.map((folder) => (
              <FolderFormat folder={folder} key={folder._id} />
            ))
          ) : (
            <p>Loading ...</p>
          )}
          {globalForms &&
            globalForms.map((form, index) => (
              <FormmFormat
                key={index}
                form={form}
                handleDeleteForm={handleDeleteForm}
              />
            ))}

          <div
            className={styles.folder}
            onClick={() => navigate("/form-create/workspace")}
          >
            <FaPlus size={30} />
            <p>Create a typebot</p>
          </div>
        </div>
      </div>
      {showCreateModel && (
        <CreatFolder onClose={() => setShowCreateModel(false)} />
      )}
      {showDeleteModel && (
        <DeleteFolder
          onClose={() => setDeleteCreateModel(false)}
          onConfirm={() => {
            handleFolderDelete(folderToDelete);
            setDeleteCreateModel(false);
          }}
        />
      )}
      {showShareModel && (
        <ShareWorkSpace
          onClose={() => setShowShareModel(false)}
          userData={userData}
        />
      )}
      </> }
    </div>
  );
};

export default WorkSpace;
