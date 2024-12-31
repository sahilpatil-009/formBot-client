import React, { useContext, useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import styles from "../Pages/pageStyles/Form.module.css";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../Contexts/ThemeProvider";

const FormmNav = ({
  setFormName,
  formName,
  handleSaveForm,
  saveButtonDisabled,
  showForm,
  formid,
  handleCopyLink,
  setFlowTab,
  flowTab,
}) => {
  const { light, setLight } = useContext(ThemeContext);
  useEffect(() => {
    if (light) {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.setAttribute("data-theme", "");
    }
  }, [light]);

  const navigate = useNavigate();
  const isInvalid = !formName.trim();

  const [toggelBack, settoggleBack] = useState(!light);

  const isSaveButtonDisabled = saveButtonDisabled || showForm;

  const handleToggleChange = () => {
    settoggleBack((prev) => !prev);
    console.log("Toggle is now:", !toggelBack ? "Checked" : "Unchecked");
    setLight(!light);
  };

  return (
    <div className={styles.workNavbar}>
      <div className={styles.search}>
        <input
          type="text"
          placeholder="Enter Form Name"
          style={{
            border: isInvalid ? "1px solid red" : "1px solid #000",
          }}
          onChange={(e) => setFormName(e.target.value)}
          value={formName}
        />
      </div>
      <div className={styles.ctrlOptions}>
        <button className={!flowTab && styles.activSection} onClick={()=> setFlowTab(false)}>Response</button>
        <button className={flowTab && styles.activSection} onClick={()=> setFlowTab(true)} >Flow</button>
      </div>
      <div className={styles.toggle}>
        Light
        <input
          type="checkbox"
          name="checkbox"
          id="toggle"
          checked={toggelBack}
          onChange={handleToggleChange}
        />
        <label htmlFor="toggle"></label>
        Dark
      </div>
      <div className={styles.userCtrl}>
        {showForm ? (
          <button
            // disabled={saveButtonDisabled}
            style={{ backgroundColor: "#1A5FFF" }}
            onClick={() => {
              // navigate(`/form-bot/${formid}`);
              handleCopyLink();
            }}
          >
            Share
          </button>
        ) : (
          <button
            disabled={saveButtonDisabled}
            style={{
              backgroundColor: saveButtonDisabled ? "#848890" : "#1A5FFF",
            }}
          >
            Share
          </button>
        )}
        <button
          onClick={handleSaveForm}
          disabled={isSaveButtonDisabled}
          style={{
            backgroundColor: saveButtonDisabled ? "#848890" : "",
            cursor: saveButtonDisabled ? "not-allowed" : "",
          }}
        >
          Save
        </button>
        <button onClick={() => navigate(-1)}>
          <RxCross2 color="red" size={35} />
        </button>
      </div>
    </div>
  );
};

export default FormmNav;
