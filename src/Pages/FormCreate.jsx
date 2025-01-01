import React, { useContext, useEffect, useState } from "react";
import styles from "./pageStyles/Form.module.css";
import { GrFlagFill } from "react-icons/gr";
import FormmNav from "../components/FormmNav";
import UserTookKit from "./formComponents/UserTookKit";
import { useNavigate, useParams } from "react-router-dom";
import { createForm, getFormById } from "../services/admin.services";
import { LuMessageSquare } from "react-icons/lu";
import { GoImage } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ThemeContext } from "../Contexts/ThemeProvider";
import FormAnalytics from "./FormAnalytics";
import Loader from "../components/Loder";

const FormCreate = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState([]);
  const [formName, setFormName] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [flowTab, setFlowTab] = useState(true);
  var { folderid } = useParams();
  const { formid } = useParams();
  const [counts, setCounts] = useState({ Bubbles: {}, Inputs: {} });

  const navigate = useNavigate();

  useEffect(() => {
    if (formid) {
      handelGetFromById(formid);
      setShowForm(true);
    }
  }, [formid]);

  // get formdetails by id
  const handelGetFromById = async (id) => {
    try {
      setLoading(true);
      const res = await getFormById(id);
      const data = await res.json();
      if (res.status == 200) {
        setFormName(data.formData.formName);
        setFormData(data.formData.formDetails);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const incrementCount = (type, category) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [category]: {
        ...prevCounts[category],
        [type]: (prevCounts[category][type] || 0) + 1,
      },
    }));
    return counts[category][type] + 1 || 1;
  };

  const addNewBubble = (type) => {
    const count = incrementCount(type, "Bubbles");
    setFormData((prev) => [
      ...prev,
      {
        inputType: "Bubble",
        type,
        name: `${type.charAt(0).toUpperCase() + type.slice(1)} ${count}`,
        showValue: "",
      },
    ]);
  };

  const addNewInput = (type) => {
    const count = incrementCount(type, "Inputs");
    setFormData((prev) => [
      ...prev,
      {
        inputType: "Input",
        type,
        name: `${type.charAt(0).toUpperCase() + type.slice(1)} Input ${count}`,
        showValue: "",
      },
    ]);
  };

  const handleDelete = (index) => {
    setFormData((prev) => prev.filter((_, mIndex) => mIndex !== index));
  };

  const handleInputChange = (index, value) => {
    setFormData((prev) =>
      prev.map((item, mIndex) =>
        mIndex === index ? { ...item, showValue: value } : item
      )
    );
  };

  const hasEmptyBubble = formData.some(
    (field) =>
      field.inputType === "Bubble" &&
      (field.type === "text" || field.type === "image") &&
      !field.showValue.trim()
  );

  const handleSaveForm = async () => {
    if (!formName) {
      return alert("Form Name is Required !");
    }
    if (formData.length < 2) {
      return alert("Form must contain at least one field!");
    }

    if (hasEmptyBubble) {
      return alert("All Bubble fields must have a value!");
    }

    const adjustedFolderId = folderid === "workspace" ? null : folderid;

    const fomrData = {
      formName,
      formDetail: formData,
      folderId: adjustedFolderId,
    };

    try {
      const res = await createForm(fomrData);
      const data = await res.json();
      if (res.status === 200) {
        alert(data.message);
        navigate(-1);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }

    // console.log(fomrData);
  };

  const handleCopyLink = () => {
    const link = `${window.location.origin}/form-bot/${formid}`;
    navigator.clipboard
      .writeText(link)
      .then(() => {
        alert("Form link copied to clipboard!");
      })
      .catch((err) => {
        alert("Failed to copy the link: " + err);
      });
  };

  const getHintMessage = (type) => {
    switch (type) {
      case "text":
        return "Hint : User will input a text on his form";
      case "number":
        return "Hint : User will input a number on his form";
      case "email":
        return "Hint : User will input a email on his form";
      case "phone":
        return "Hint : User will input a phone on his form";
      case "date":
        return "Hint : User will select a date";
      case "rating":
        return "Hint : User will input a Rating on his form";
      case "button":
        return "Hint : User will click button to submit his form";
    }
  };

  const isSaveEnabled = () => {
    return formData.some(
      (item) => item.inputType === "Input" && item.type === "button"
    );
  };

  return (
    <div className={styles.container}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <FormmNav
            setFormName={setFormName}
            formName={formName}
            handleSaveForm={handleSaveForm}
            saveButtonDisabled={showForm || !isSaveEnabled()}
            showForm={showForm}
            formid={formid}
            handleCopyLink={handleCopyLink}
            setFlowTab={setFlowTab}
            flowTab={flowTab}
          />
          {flowTab ? (
            <div className={styles.formCreatinSpace}>
              <UserTookKit
                addNewBubble={addNewBubble}
                addNewInput={addNewInput}
              />
              <div className={styles.FormSection}>
                <div className={styles.startFlag}>
                  <GrFlagFill size={22} />
                  Start
                </div>

                {formData &&
                  formData.map((item, index) => {
                    switch (item.inputType) {
                      case "Bubble": {
                        switch (item.type) {
                          case "text":
                            return (
                              <div key={index} className={styles.UserFields}>
                                {!showForm && (
                                  <div
                                    className={styles.dlticon}
                                    onClick={() => handleDelete(index)}
                                  >
                                    <RiDeleteBin6Line size={20} color="red" />
                                  </div>
                                )}
                                <p className={styles.selectedFields}>
                                  {item.name}
                                </p>
                                <div
                                  className={styles.msgField}
                                  style={{
                                    border:
                                      item.showValue.trim() == ""
                                        ? "1px solid red"
                                        : "",
                                  }}
                                >
                                  <LuMessageSquare size={20} color="#4B83FF" />
                                  <input
                                    type="text"
                                    placeholder="Click here to edit"
                                    value={item.showValue}
                                    onChange={(e) =>
                                      handleInputChange(index, e.target.value)
                                    }
                                  />
                                </div>
                                <p
                                  className={styles.worningMsg}
                                  style={{
                                    visibility:
                                      item.showValue.trim() == ""
                                        ? "visible"
                                        : "hidden",
                                  }}
                                >
                                  Required Field
                                </p>
                              </div>
                            );

                          case "image":
                            return (
                              <div key={index} className={styles.UserFields}>
                                {!showForm && (
                                  <div
                                    className={styles.dlticon}
                                    onClick={() => handleDelete(index)}
                                  >
                                    <RiDeleteBin6Line size={20} color="red" />
                                  </div>
                                )}
                                <p className={styles.selectedFields}>
                                  {item.name}
                                </p>
                                <div
                                  className={styles.msgField}
                                  style={{
                                    border:
                                      item.showValue.trim() == ""
                                        ? "1px solid red"
                                        : "",
                                  }}
                                >
                                  <GoImage size={20} color="#4B83FF" />
                                  <input
                                    type="text"
                                    placeholder="Click here to add link"
                                    value={item.showValue}
                                    onChange={(e) =>
                                      handleInputChange(index, e.target.value)
                                    }
                                  />
                                </div>
                                <p
                                  className={styles.worningMsg}
                                  style={{
                                    visibility:
                                      item.showValue.trim() == ""
                                        ? "visible"
                                        : "hidden",
                                  }}
                                >
                                  Required Image URL
                                </p>
                              </div>
                            );
                        }
                      }
                      case "Input":
                        return (
                          <div className={styles.UserFields} key={index}>
                            {!showForm && (
                              <div
                                className={styles.dlticon}
                                onClick={() => handleDelete(index)}
                              >
                                <RiDeleteBin6Line size={20} color="red" />
                              </div>
                            )}
                            <p className={styles.selectedFields}>{item.name}</p>
                            <p className={styles.hintInput}>
                              {getHintMessage(item.type)}
                            </p>
                          </div>
                        );
                    }
                  })}
              </div>
            </div>
          ) : (
            <FormAnalytics formid={formid} />
          )}
          <div></div>
        </>
      )}
    </div>
  );
};

export default FormCreate;
