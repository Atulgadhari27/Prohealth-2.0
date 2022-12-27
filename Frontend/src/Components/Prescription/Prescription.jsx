import React, { useState } from 'react'
import styles from './Prescription.module.css'
import ReactLoading from 'react-loading'
import axios from 'axios'
import { useHistory, Link } from 'react-router-dom'
import { useEffect } from 'react'
import Form from "react-bootstrap/Form"

import profile from '../../assets/profile.png'
import { isAuth } from '../../assets/isAuth'

const Prescription = (props) => {

  const [diseaseList, setDiseaseList] = useState([{ disease: "", yrs: "1" }]);
  const history = useHistory();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [Loading, setLoading] = useState(false);
  const [patient, setPatient] = useState({
      name: {
        firstName: "",
        middleName: "",
        surName: "",
      },
      dob: "",
      mobile: "",
      email: "",
      adharCard: "",
      bloodGroup: "A+",
      address: {
        building: "",
        city: "",
        taluka: "",
        district: "",
        state: "",
        pincode: "",
      },
      password: "",
      diseases: diseaseList,
      contactPerson: {
        name: {
          firstName: "",
          surName: "",
        },
        mobile: "",
        email: "",
        relation: "",
        address: {
          building: "",
          city: "",
          taluka: "",
          district: "",
          state: "",
          pincode: "",
        },
      },
    });


  const handleRegister = async (e) => {
      e.preventDefault();
      setLoading(true)
      if (patient.password !== confirmPassword) {
        props.settoastCondition({
          status: "error",
          message: "Password and Confirm Password does not match",
        });
        setLoading(false);
      }
      else {
          try {
              const config = {
                  headers: {
                      "Content-type": "application/json",
                  }
              };

              const res = await axios.post(
                  "http://localhost:5000/register/patient",
                  {
                      patient
                  },
                  config
              );

              const data = res.data.patient;
              if (data.errors) {
                props.settoastCondition({
                  status: "error",
                  message: "Please Enter All Fields Correctly",
                });
                setLoading(false);
              } else {
                setLoading(false);
                props.settoastCondition({
                  status: "success",
                  message: "Registered and Logged in Successfully!!!",
                });
                props.setUser("Patient")
                props.setToastShow(true);
                localStorage.setItem("userInfo", JSON.stringify(data));
                // console.log(data);
                history.push("/");
              }

          } catch (error) {
              
              console.log(error)
          }
      }
  }

  // React.useEffect(() => {
  //     if(isAuth()){
  //         history.goBack()
  //     }
  // }, [isAuth()])

  return (
    <div>
      <div className={styles.header}>
        <span>Write Prescription</span>
      </div>
      <div className={styles.mid}>
          <form className={styles.form}>
            <label className={styles.form_label}>
                Complaints: 
            </label>
            <div className={styles.input_field}>
              <label className={styles.form_label}>
                Type of Pain: 
              </label>
              <div className={styles.flex_col}>
              <input
                type="text"
                name="username"
                id="username"
                className={styles.form_input}
                required
              />
              <span className={styles.form_error}></span>
              </div>
              <label className={styles.form_label}>
                Duration of Pain: 
              </label>
              <div className={styles.flex_col}>
              <input
                type="text"
                name="username"
                id="username"
                
                className={styles.form_input}
                required
              />
              <span className={styles.form_error}></span>
              </div>
              <label className={styles.form_label}>
                Finding: 
              </label>
              <div className={styles.flex_col}>
              <input
                type="text"
                name="username"
                id="username"
                className={styles.form_input}
                required
              />
              <span className={styles.form_error}></span>
              </div>
            </div>
            <label className={styles.form_label}>
                Medicines: 
            </label>
            <div className={styles.input_field}>
              <label className={styles.form_label}>
                Name: 
              </label>
              <div className={styles.flex_col}>
              <input
                type="text"
                name="username"
                id="username"
                className={styles.form_input}
                required
              />
              <span className={styles.form_error}></span>
              </div>
              <label className={styles.form_label}>
                Dosage: 
              </label>
              <div className={styles.flex_col}>
              <input
                type="text"
                name="username"
                id="username"
                
                className={styles.form_input}
                required
              />
              <span className={styles.form_error}></span>
              </div>
              <label className={styles.form_label}>
                Duration: 
              </label>
              <div className={styles.flex_col}>
              <input
                type="text"
                name="username"
                id="username"
                className={styles.form_input}
                required
              />
              <span className={styles.form_error}></span>
              </div>
            </div>
            <label className={styles.form_label}>
                Advice: 
              </label>
              <div className={styles.flex_col}>
              <input
                type="text"
                name="username"
                id="username"
                
                className={styles.form_input}
                required
              />
              <span className={styles.form_error}></span>
              </div>
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
                      Write
                    </button>
                  )}
          </form>
      </div>

    </div>
  );
}

export { Prescription }