import React, { useState } from 'react'
import styles from './RegisterPage.module.css'
import ReactLoading from 'react-loading'
import axios from 'axios'
import { useHistory, Link } from 'react-router-dom'
import { useEffect } from 'react'
import Form from "react-bootstrap/Form"

import profile from '../../assets/profile.png'
import { isAuth } from '../../assets/isAuth'

const RegisterPage = (props) => {

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
    <>
      <div className={styles.header}>
        <span>Register</span>
      </div>
      <div className={styles.mid}>
          <img
            src={profile}
            alt="profile pic"
            className={styles.profile_img}
          />
          <form className={styles.form} onSubmit={handleRegister}>
            <div className={styles.input_field}>
              <label className={styles.form_label}>
                First Name: 
              </label>
              <div className={styles.flex_col}>
              <input
                type="text"
                name="username"
                id="username"
                value={patient.name.firstName}
                onChange = {(e) => {
                  let tempPatient = {...patient};
                  tempPatient.name.firstName = e.target.value;
                  setPatient(tempPatient);
                }}
                className={styles.form_input}
                required
              />
              <span className={styles.form_error}></span>
              </div>
              <label className={styles.form_label}>
                Middle Name: 
              </label>
              <div className={styles.flex_col}>
              <input
                type="text"
                name="username"
                id="username"
                value={patient.name.middleName}
                onChange = {(e) => {
                  let tempPatient = {...patient};
                  tempPatient.name.middleName = e.target.value;
                  setPatient(tempPatient);
                }}
                className={styles.form_input}
                required
              />
              <span className={styles.form_error}></span>
              </div>
              <label className={styles.form_label}>
                Last Name: 
              </label>
              <div className={styles.flex_col}>
              <input
                type="text"
                name="username"
                id="username"
                className={styles.form_input}
                value={patient.name.surName}
                onChange = {(e) => {
                  let tempPatient = {...patient};
                  tempPatient.name.surName = e.target.value;
                  setPatient(tempPatient);
                }}
                required
              />
              <span className={styles.form_error}></span>
              </div>
            </div>
            <div className={styles.input_field}>
              <label className={styles.form_label}>
                Birthdate: 
              </label>
              <div className={styles.flex_col}>
              <input
                type="date"
                name="username"
                id="username"
                value = {patient.dob}
                onChange = {(e) => {
                  let tempPatient = {...patient};
                  tempPatient.dob = e.target.value;
                  setPatient(tempPatient);
                }}
                className={styles.form_input}
                required
              />
              <span className={styles.form_error}></span>
              </div>
            </div>
            <div className={styles.input_field}>
              <label className={styles.form_label}>
                Mobile No: 
              </label>
              <div className={styles.flex_col}>
              <input
                type="number"
                name="username"
                id="username"
                value = {patient.mobile}
                onChange = {(e) => {
                  let tempPatient = {...patient};
                  tempPatient.mobile = e.target.value;
                  setPatient(tempPatient);
                }}
                className={styles.form_input}
                required
              />
              <span className={styles.form_error}></span>
              </div>
            </div>
            <div className={styles.input_field}>
              <label className={styles.form_label}>
                Aadhar Card No: 
              </label>
              <div className={styles.flex_col}>
              <input
                type="number"
                name="username"
                id="username"
                value = {patient.adharCard}
                onChange = {(e) => {
                  let tempPatient = {...patient};
                  tempPatient.adharCard = e.target.value;
                  setPatient(tempPatient);
                }}
                className={styles.form_input}
                required
              />
              <span className={styles.form_error}></span>
              </div>
            </div>
            <div className={styles.input_field}>
              <label className={styles.form_label}>
                Email: 
              </label>
              <div className={styles.flex_col}>
              <input
                type="email"
                name="username"
                id="username"
                value = {patient.email}
                onChange = {(e) => {
                  let tempPatient = {...patient};
                  tempPatient.email = e.target.value;
                  setPatient(tempPatient);
                }}
                className={styles.form_input}
                required
              />
              <span className={styles.form_error}></span>
              </div>
            </div>
            <div className={styles.input_field}>
              <label className={styles.form_label}>
                City: 
              </label>
              <div className={styles.flex_col}>
              <input
                type="text"
                name="username"
                id="username"
                value = {patient.address.city}
                onChange = {(e) => {
                  let tempPatient = {...patient};
                  tempPatient.address.city = e.target.value;
                  setPatient(tempPatient);
                }}
                className={styles.form_input}
                required
              />
              <span className={styles.form_error}></span>
              </div>
              <label className={styles.form_label}>
                State: 
              </label>
              <div className={styles.flex_col}>
              <input
                type="text"
                name="username"
                id="username"
                value = {patient.address.state}
                onChange = {(e) => {
                  let tempPatient = {...patient};
                  tempPatient.address.state = e.target.value;
                  setPatient(tempPatient);
                }}
                className={styles.form_input}
                required
              /></div>
              </div>
              <div className={styles.input_field}>
              <label className={styles.form_label}>
                Taluka: 
              </label>
              <div className={styles.flex_col}>
              <input
                type="text"
                name="username"
                id="username"
                value = {patient.address.taluka}
                onChange = {(e) => {
                  let tempPatient = {...patient};
                  tempPatient.address.taluka = e.target.value;
                  setPatient(tempPatient);
                }}
                className={styles.form_input}
                required
              />
              <span className={styles.form_error}></span>
              </div>
              <label className={styles.form_label}>
                District: 
              </label>
              <div className={styles.flex_col}>
              <input
                type="text"
                name="username"
                id="username"
                value = {patient.address.district}
                onChange = {(e) => {
                  let tempPatient = {...patient};
                  tempPatient.address.district = e.target.value;
                  setPatient(tempPatient);
                }}
                className={styles.form_input}
                required
              /></div>
              </div>
              <div className={styles.input_field}>
              <label className={styles.form_label}>
                Building: 
              </label>
              <div className={styles.flex_col}>
              <input
                type="text"
                name="username"
                id="username"
                value = {patient.address.building}
                onChange = {(e) => {
                  let tempPatient = {...patient};
                  tempPatient.address.building = e.target.value;
                  setPatient(tempPatient);
                }}
                className={styles.form_input}
                required
              />
              <span className={styles.form_error}></span>
              </div>
              <label className={styles.form_label}>
                Pincode: 
              </label>
              <div className={styles.flex_col}>
              <input
                type="text"
                name="username"
                id="username"
                value = {patient.address.pincode}
                onChange = {(e) => {
                  let tempPatient = {...patient};
                  tempPatient.address.pincode = e.target.value;
                  setPatient(tempPatient);
                }}
                className={styles.form_input}
                required
              /></div>
              </div>
              <div className={styles.input_field}>
              <label className={styles.form_label}>
                Password: 
              </label>
              <div className={styles.flex_col}>
              <input
                type="password"
                name="password"
                id="username"
                className={styles.form_input}
                value={patient.password}
                onChange = {(e) => {
                  let tempPatient = {...patient};
                  tempPatient.password = e.target.value;
                  setPatient(tempPatient);
                }}
                required
              />
              <span className={styles.form_error}></span>
              </div>
              </div>
              <div className={styles.input_field}>
              <label className={styles.form_label}>
                Confirm Password: 
              </label>
              <div className={styles.flex_col}>
              <input
                type="password"
                name="password"
                id="username"
                value = {confirmPassword}
                onChange = {(e) => setConfirmPassword(e.target.value)}
                className={styles.form_input}
                required
              />
              <span className={styles.form_error}></span>
              </div>
              </div>
              <div className={styles.input_field}>
              <label className={styles.form_label}>
                Name of any permanant disease (if any) 
              </label>
              <div className={styles.flex_col}>
              <input
                type="text"
                name="username"
                id="username"
                value={diseaseList[0].disease}
                onChange = {(e) => {
                  let tempDiseaseList = {...diseaseList};
                  tempDiseaseList[0].disease = e.target.value;
                  setDiseaseList(tempDiseaseList)
                  let tempPatient = {...patient}
                  tempPatient.diseases = diseaseList;
                  setPatient(tempPatient);
                }}
                className={styles.form_input}
                required
              />
              <span className={styles.form_error}></span>
              </div>
              </div>
              <div className={styles.input_field}>
              <label className={styles.form_label2}>
                Emergency Contact Details 
              </label></div>
              <div className={styles.input_field}>
              <label className={styles.form_label}>
                First Name: 
              </label>
              <div className={styles.flex_col}>
              <input
                type="text"
                name="username"
                id="username"
                value={patient.contactPerson.name.firstName}
                onChange = {(e) => {
                  let tempPatient = {...patient};
                  tempPatient.contactPerson.name.firstName = e.target.value;
                  setPatient(tempPatient);
                }}
                className={styles.form_input}
                required
              />
              <span className={styles.form_error}></span>
              </div>
              <label className={styles.form_label}>
                Last Name: 
              </label>
              <div className={styles.flex_col}>
              <input
                type="text"
                name="username"
                id="username"
                value={patient.contactPerson.name.surName}
                onChange = {(e) => {
                  let tempPatient = {...patient};
                  tempPatient.contactPerson.name.surName = e.target.value;
                  setPatient(tempPatient);
                }}
                className={styles.form_input}
                required
              /></div></div>
              <div className={styles.input_field}>
              <label className={styles.form_label}>
                Mobile No: 
              </label>
              <div className={styles.flex_col}>
              <input
                type="number"
                name="username"
                id="username"
                value={patient.contactPerson.mobile}
                onChange = {(e) => {
                  let tempPatient = {...patient};
                  tempPatient.contactPerson.mobile = e.target.value;
                  setPatient(tempPatient);
                }}
                className={styles.form_input}
                required
              />
              <span className={styles.form_error}></span>
              </div></div>
              <div className={styles.input_field}>
              <label className={styles.form_label}>
                Email: 
              </label>
              <div className={styles.flex_col}>
              <input
                type="email"
                name="username"
                id="username"
                value={patient.contactPerson.email}
                onChange = {(e) => {
                  let tempPatient = {...patient};
                  tempPatient.contactPerson.email = e.target.value;
                  setPatient(tempPatient);
                }}
                className={styles.form_input}
                required
              />
              <span className={styles.form_error}></span>
              </div>
            </div>
            <div className={styles.input_field}>
              <label className={styles.form_label}>
                Relationship with patient 
              </label>
              <div className={styles.flex_col}>
              <input
                type="text"
                name="username"
                id="username"
                value={patient.contactPerson.relation}
                onChange = {(e) => {
                  let tempPatient = {...patient};
                  tempPatient.contactPerson.relation = e.target.value;
                  setPatient(tempPatient);
                }}
                className={styles.form_input}
                required
              /></div></div>
              <div className={styles.input_field}>
              <label className={styles.form_label}>
                City: 
              </label>
              <div className={styles.flex_col}>
              <input
                type="text"
                name="username"
                id="username"
                value={patient.contactPerson.address.city}
                onChange = {(e) => {
                  let tempPatient = {...patient};
                  tempPatient.contactPerson.address.city = e.target.value;
                  setPatient(tempPatient);
                }}
                className={styles.form_input}
                required
              />
              <span className={styles.form_error}></span>
              </div>
              <label className={styles.form_label}>
                State: 
              </label>
              <div className={styles.flex_col}>
              <input
                type="text"
                name="username"
                id="username"
                value={patient.contactPerson.address.state}
                onChange = {(e) => {
                  let tempPatient = {...patient};
                  tempPatient.contactPerson.address.state = e.target.value;
                  setPatient(tempPatient);
                }}
                className={styles.form_input}
                required
              /></div>
              </div>
              <div className={styles.input_field}>
              <label className={styles.form_label}>
                Taluka: 
              </label>
              <div className={styles.flex_col}>
              <input
                type="text"
                name="username"
                id="username"
                value={patient.contactPerson.address.taluka}
                onChange = {(e) => {
                  let tempPatient = {...patient};
                  tempPatient.contactPerson.address.taluka = e.target.value;
                  setPatient(tempPatient);
                }}
                className={styles.form_input}
                required
              />
              <span className={styles.form_error}></span>
              </div>
              <label className={styles.form_label}>
                District: 
              </label>
              <div className={styles.flex_col}>
              <input
                type="text"
                name="username"
                id="username"
                value={patient.contactPerson.address.district}
                onChange = {(e) => {
                  let tempPatient = {...patient};
                  tempPatient.contactPerson.address.district = e.target.value;
                  setPatient(tempPatient);
                }}
                className={styles.form_input}
                required
              /></div>
              </div>
              <div className={styles.input_field}>
              <label className={styles.form_label}>
                Building: 
              </label>
              <div className={styles.flex_col}>
              <input
                type="text"
                name="username"
                id="username"
                value={patient.contactPerson.address.building}
                onChange = {(e) => {
                  let tempPatient = {...patient};
                  tempPatient.contactPerson.address.building = e.target.value;
                  setPatient(tempPatient);
                }}
                className={styles.form_input}
                required
              />
              <span className={styles.form_error}></span>
              </div>
              <label className={styles.form_label}>
                Pincode: 
              </label>
              <div className={styles.flex_col}>
              <input
                type="text"
                name="username"
                id="username"
                value={patient.contactPerson.address.pincode}
                onChange = {(e) => {
                  let tempPatient = {...patient};
                  tempPatient.contactPerson.address.pincode = e.target.value;
                  setPatient(tempPatient);
                }}
                className={styles.form_input}
                required
              /></div>
              </div>
            {/* {Loading ? (
                    <div className={styles.loading}>
                      <ReactLoading
                        type={"bubbles"}
                        color={"color"}
                        height={"10%"}
                        width={"10%"}
                      />
                    </div>
                  ) : ( */}

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
                      Register
                    </button>
                  )}
          </form>
      </div>

    </>
  );
}

export { RegisterPage }