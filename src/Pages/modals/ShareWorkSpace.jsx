import React, { useRef, useState } from "react";
import styles from "../modals/shareWork.module.css";
import { RxCross2 } from "react-icons/rx";
import { ShareWorkSpaceViaMail } from "../../services/user.services";

const ShareWorkSpace = ({ onClose, userData }) => {
  const modelRef = useRef();
  const closeModel = (e) => {
    if (modelRef.current === e.target) {
      onClose();
    }
  };

  const [email, setEmail] = useState();
  const [permission, setPermissoin] = useState("View");

  const handleSubmitShare = async () => {
    const data = {
      email,
      permission,
    };

    try {
      const res = await ShareWorkSpaceViaMail(userData.id, data);
      const resData = await res.json();
      if (res.status == 200) {
        alert(resData.message);
      } else {
        alert(resData.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.main} ref={modelRef} onClick={closeModel}>
      <div className={styles.container}>
        <div className={styles.crossBtn}>
          <button onClick={() => onClose()}>
            <RxCross2 size={24} color="red" />
          </button>
        </div>
        <div className={styles.InviteByMail}>
          <div className={styles.headEmail}>
            <h1>Invited By Email</h1>
            <select
              defaultValue={permission}
              onChange={(e) => setPermissoin(e.target.value)}
            >
              <option value="View">View</option>
              <option value="Edit">Edit</option>
            </select>
          </div>
          <div className={styles.emailInvSend}>
            <input
              type="email"
              required
              placeholder="Enter email id"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleSubmitShare}>Send Invite</button>
          </div>
        </div>
        <div className={styles.inviteByLink}>
          <h1>Invite by link</h1>
          <button className={styles.copyLink}>Copy link</button>
        </div>
      </div>
    </div>
  );
};

export default ShareWorkSpace;
