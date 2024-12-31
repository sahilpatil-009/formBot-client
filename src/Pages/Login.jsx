import React, { useEffect, useState } from "react";
import styles from "./pageStyles/login.module.css";
import triangle2 from "../assets/triangle2.png";
import circle1 from "../assets/Ellipse 1.png";
import circle2 from "../assets/Ellipse 2.png";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../services/user.services";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const navigate = useNavigate();

  // if user already login mot require to login again 
  // via token directly naviagte to user workspace
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/workspace");
    }
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  // validate user input 
  const validationInput = () => {
    const newError = {};
    if (!email.trim()) newError.email = "Email is required !";
    if (!password.trim()) newError.password = "Password is required !";
    setErrors(newError);
    return Object.keys(newError).length === 0;
  };

  // handle user Login
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!validationInput()) {
      return console.log("All fields Required !");
    }

    try {
      const loginData = {
        email: email,
        password: password,
      };
      const res = await userLogin(loginData);
      const data = await res.json();

      if (res.status === 200) {
        localStorage.setItem("token", data.token);
        alert(data.message);
        navigate("/workspace");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className={styles.BackArro}>
        <FaArrowLeft size={28} onClick={() => navigate("/")} />
      </div>
      <div className={styles.container}>
        <form onSubmit={handleLoginSubmit}>
          <div className={styles.logindiv}>
            <div className={styles.email}>
              <label style={errors.email && { color: "red" }}>Email</label>
              <input
                type="text"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                style={errors.email && { border: "1px solid red" }}
              />
              <p style={{ visibility: errors.email ? "visible" : "hidden" }}>
                {errors.email || "Field Requires"}
              </p>
            </div>
            <div>
              <label style={errors.password && { color: "red" }}>
                Password
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
                style={errors.password && { border: "1px solid red" }}
              />
              <p style={{ visibility: errors.password ? "visible" : "hidden" }}>
                {errors.password || "Field Requires"}
              </p>
            </div>
            <div>
              <button className={styles.loginButton} type="submit">
                Log in
              </button>
            </div>
            <div
              style={{
                textAlign: "center",
                fontSize: "15px",
                fontWeight: "200",
              }}
            >
              OR
            </div>
            <div>
              <button className={styles.loginButton}>
                <div>
                  <FcGoogle size={30} />
                </div>
                Sign in with google
              </button>
            </div>
          </div>
          <div className={styles.register}>
            <p>
              Don't have an account?{" "}
              <a onClick={() => navigate("/register")}>Register Now</a>
            </p>
          </div>
        </form>
      </div>
      <div className={styles.triangle}>
        <img src={triangle2} />
      </div>
      <div className={styles.circleOne}>
        <img src={circle1} />
      </div>
      <div className={styles.circleTwo}>
        <img src={circle2} />
      </div>
    </>
  );
};

export default Login;
