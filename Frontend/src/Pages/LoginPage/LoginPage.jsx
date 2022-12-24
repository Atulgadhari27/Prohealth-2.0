import React from 'react'
import styles from './LoginPage.module.css'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import {useHistory, Link} from 'react-router-dom'
import Form from "react-bootstrap/Form"
import { isAuth } from '../../assets/isAuth'
import { useState } from 'react'
import ReactLoading from 'react-loading'
import profile from '../../assets/profile.png'

const LoginPage = (props) => {
    const [email, setEmail] = React.useState("")
    // const [password, setPassword] = React.useState("")
    const [message, setMessage] = useState(false)
    const [Loading, setLoading] = useState(false);
    const [Toggle, setToggle] = useState("Patient");
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const history = useHistory();

    const handlePatientLogin = async (healthID, password) => {
      setLoading(true);
      const res = await axios.post('http://localhost:5000/login/patient', 
        {
          healthID,
          password
        },
        {
          headers: {
            "Content-type" : "application/json",
          }
        }
      )

      console.log(res);
      const data = res.data;
      if (data.errors) {
        setUsernameError(data.errors.healthID);
        setPasswordError(data.errors.password);
        setLoading(false);
      } else {
        setLoading(false);
        props.settoastCondition({
          status: "success",
          message: "Logged in Successfully!!!",
        });
        setUsernameError("");
        setPasswordError("");
        props.setToastShow(true);
        localStorage.setItem("userInfo", JSON.stringify(data));
        // console.log(data);
        history.push("/");
      }
    }

    const handleLogin = async (e) => {
      e.preventDefault();
      switch (Toggle) {
        case "Patient":
          handlePatientLogin(username, password);
          break;
        case "Doctor":
          // handleDoctorAdminLogin(username, password, "/login/doctor");
          break;
        case "Admin":
          // handleDoctorAdminLogin(username, password, "/login/admin");
          break;
        default:
          break;
      }
    }
    return (
        <>
            <div className = {styles.header}>
                <span>Login</span>
            </div>
            <div className = {styles.mid}>
                <div className = {styles.left}>
                    <img
                        src = "https://accounts.practo.com/static/images/illustration.png"
                        alt = "illustration"
                    />
                </div>
                <div className = {styles.right}>
                    
                <div className={styles.toggle}>
                  <button
                    className={
                      Toggle === "Patient"
                        ? styles.toggle_btn_active
                        : styles.toggle_btn
                    }
                    onClick={() => {
                      setToggle("Patient");
                      setUsername("");
                      setPassword("");
                      setUsernameError("");
                      setPasswordError("");
                    }}
                  >
                    Patient
                  </button>
                  <button
                    onClick={() => {
                      setToggle("Doctor");
                      setUsername("");
                      setPassword("");
                      setUsernameError("");
                      setPasswordError("");
                    }}
                    className={
                      Toggle === "Doctor"
                        ? styles.toggle_btn_active
                        : styles.toggle_btn
                    }
                  >
                    Doctor
                  </button>
                  <button
                    onClick={() => {
                      setToggle("Admin");
                      setUsername("");
                      setPassword("");
                      setUsernameError("");
                      setPasswordError("");
                    }}
                    className={
                      Toggle === "Admin"
                        ? styles.toggle_btn_active
                        : styles.toggle_btn
                    }
                  >
                    Admin
                  </button>
                </div>
                <img
                  src={profile}
                  alt="profile pic"
                  className= {styles.profile_img}
                />
                <form className={styles.form} onSubmit={handleLogin}>
                  <label
                    htmlFor="email"
                    className={styles.form_label}
                  >
                    {Toggle === "Patient" ? "Health Id" : "Email"}
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className={styles.form_input}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  <span className={styles.form_error}>{usernameError}</span>
                  <label
                    htmlFor="password"
                    className={styles.form_label}
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className={styles.form_input}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <span className={styles.form_error}>{passwordError}</span>

                  {Loading ? (
                    <div className={styles.loading}>
                      <ReactLoading
                        type={"bubbles"}
                        color={"color"}
                        height={"10%"}
                        width={"10%"}
                      />
                    </div>
                  ) : (
                    <button
                      type="submit"
                      className={styles.btn_submit}
                    >
                      Login
                    </button>
                  )}
                </form>
                <h1 className={styles.text}>
                  New User, <Link to="/Register">Register here</Link>
                </h1>
                </div>
            </div>
        </>
    );
};

export {LoginPage};