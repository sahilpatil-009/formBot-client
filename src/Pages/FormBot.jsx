import React, { useEffect, useState } from "react";
import styles from "./pageStyles/formbot.module.css";
import Loader from "../components/Loder";
import logo from "../assets/formBotLogo.png";
import { IoSend } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { getFormDetailsForBot } from "../services/admin.services";
import {
  submitResponse,
  trackFormStart,
  trackLinkClicked,
} from "../services/response.services";

const FormBot = () => {
  var { formid } = useParams();

  const [loading, setLoading] = useState(true);
  const [userResponse, setUserResponse] = useState([]); // Store all user responses
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentInput, setCurrentInput] = useState("");
  const [waitingForInput, setWaitingForInput] = useState(false);
  const [selectedRating, setSelectedRating] = useState(null);
  const [formName, setFormName] = useState("");
  const [randomId, setRandomId] = useState("");
  const [ResonSubmit, setResonSubmit] = useState(false);
  const [formStarted, setFormStarted] = useState(false);

  const [formDetails, setFormformDetails] = useState();

  const getFormDetails = async () => {
    setLoading(true);
    try {
      const res = await getFormDetailsForBot(formid);
      const data = await res.json();
      if (res.status == 200) {
        setFormformDetails(data.formDetails);
        setFormName(data.formName);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    // Generate a random ID when the component mounts
    if (!randomId) {
      const generateRandomId = () => {
        return Math.random().toString(36).substr(2, 9);
      };
      setRandomId(generateRandomId());
    }
  }, []);

  const FormClickCount = async () => {
    try {
      const res = await trackLinkClicked(formid);
      const data = await res.json();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFormDetails();
    FormClickCount();
  }, []);

  useEffect(() => {
    if (formDetails && currentIndex < formDetails.length) {
      const currentBubble = formDetails[currentIndex];
      if (currentBubble.inputType === "Input") {
        setWaitingForInput(true);
      } else {
        const timer = setTimeout(() => {
          setCurrentIndex((prev) => prev + 1);
        }, 500);
        return () => clearTimeout(timer);
      }
    }
  }, [currentIndex, formDetails]);

  const handleInputChange = (e) => {
    setCurrentInput(e.target.value); // Update temporary input state
  };

  const handleRatingClick = (rating) => {
    setSelectedRating(rating);
  };

  const handleSubmitResponse = () => {
    const currentBubble = formDetails[currentIndex];
    if (currentBubble.type === "rating" && selectedRating) {
      setUserResponse((prevResponses) => [
        ...prevResponses,
        { name: currentBubble.name, value: selectedRating },
      ]);
      setSelectedRating(null);
    } else if (currentInput.trim() !== "") {
      setUserResponse((prevResponses) => [
        ...prevResponses,
        { name: currentBubble.name, value: currentInput },
      ]);
      setCurrentInput("");
    }
    setWaitingForInput(false);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const handleSubmit = async () => {
    if (!ResonSubmit) {
      const ResponseData = {
        randomId,
        formName,
        userResponse,
        form: formid,
      };

      try {
        setLoading(true);
        const res = await submitResponse(ResponseData);
        const data = await res.json();
        if (res.status == 200) {
          alert(data.message);
          setResonSubmit(true);
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("form Already Submitted");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (userResponse.length === 1 && !formStarted) {
      const trackStart = async () => {
        try {
          const res = await trackFormStart(formid);
          const data = res.json();
          if (res.status == 200) {
            setFormStarted(true);
          } else {
            console.log(data.message);
          }
        } catch (error) {
          console.log(error);
        }
      };
      trackStart();
    }
  }, [userResponse, formStarted, formid, randomId]);

  return (
    <div className={styles.container}>
      {loading ? (
        <Loader />
        ) : (
        <div className={styles.FormContainer}>
          {formDetails &&
            formDetails.map((bubble, index) => {
              if (index <= currentIndex) {
                switch (bubble.inputType) {
                  case "Bubble":
                    return bubble.type === "image" ? (
                      <div key={index} className={styles.bubble}>
                        <div className={styles.botImg}>
                          <img src={logo} alt="Bot" />
                        </div>
                        <div className={styles.bubbleImage}>
                          <img src={bubble.showValue} alt={bubble.name} />
                        </div>
                      </div>
                    ) : (
                      <div key={index} className={styles.bubble}>
                        <div className={styles.botImg}>
                          <img src={logo} alt="Bot" />
                        </div>
                        <p>{bubble.showValue}</p>
                      </div>
                    );

                  case "Input":
                    const existingResponse = userResponse.find(
                      (response) => response.name === bubble.name
                    );

                    if (bubble.type === "button") {
                      return (
                        <div key={index} className={styles.UserInput}>
                          <button
                            className={styles.SubmtBtn}
                            onClick={handleSubmit}
                            style={{ borderRadius: "10px" }}
                          >
                            Submit
                          </button>
                        </div>
                      );
                    }

                    if (bubble.type === "rating" && !existingResponse) {
                      return (
                        <div key={index} className={styles.UserInput}>
                          <div className={styles.ratings}>
                            {[1, 2, 3, 4, 5].map((rating) => (
                              <div
                                key={rating}
                                className={`${styles.ratingItem} ${
                                  selectedRating === rating
                                    ? styles.selectedRating
                                    : ""
                                }`}
                                onClick={() => handleRatingClick(rating)}
                              >
                                {rating}
                              </div>
                            ))}
                          </div>
                          <button onClick={handleSubmitResponse}>
                            <IoSend />
                          </button>
                        </div>
                      );
                    }

                    return existingResponse ? (
                      <div className={styles.UserInput} key={index}>
                        <p>{existingResponse.value}</p>
                      </div>
                    ) : (
                      waitingForInput && (
                        <div className={styles.UserInput} key={index}>
                          <div className={styles.userResponse}>
                            <input
                              type={bubble.type}
                              name={bubble.name}
                              onChange={handleInputChange}
                            />
                            <button onClick={handleSubmitResponse} disabled={!currentInput.trim()} >
                              <IoSend />
                            </button>
                          </div>
                        </div>
                      )
                    );

                  default:
                    return null;
                }
              }
              return null;
            })}
        </div>
      )}
    </div>
  );
};

export default FormBot;
