import React from 'react'
import styles from './RegisterPage.module.css'
import ReactLoading from 'react-loading'
import axios from 'axios'
import { useHistory, Link } from 'react-router-dom'
import { useEffect } from 'react'
import Form from "react-bootstrap/Form"
import { isAuth } from '../../assets/isAuth'

const RegisterPage = ({ }) => {
  // // const [patient, setPatient] = useState({
  // //     name: {
  // //       firstName: "",
  // //       middleName: "",
  // //       surName: "",
  // //     },
  // //     dob: "",
  // //     mobile: "",
  // //     email: "",
  // //     adharCard: "",
  // //     bloodGroup: "",
  // //     address: {
  // //       building: "",
  // //       city: "",
  // //       taluka: "",
  // //       district: "",
  // //       state: "",
  // //       pincode: "",
  // //     },
  // //     password: "",
  // //     diseases: diseaseList,
  // //     contactPerson: {
  // //       name: {
  // //         firstName: "",
  // //         surName: "",
  // //       },
  // //       mobile: "",
  // //       email: "",
  // //       relation: "",
  // //       address: {
  // //         building: "",
  // //         city: "",
  // //         taluka: "",
  // //         district: "",
  // //         state: "",
  // //         pincode: "",
  // //       },
  // //     },
  // //   });


  // const handleOnSubmit = async (e) => {
  //     e.preventDefault();

  //     if (password !== confirmPassword) {
  //         setMessage(true)
  //     }
  //     else {
  //         setMessage(false);
  //         try {
  //             const config = {
  //                 headers: {
  //                     "Content-type": "application/json",
  //                 }
  //             };

  //             const { data } = await axios.post(
  //                 "http://localhost:5000/auth/register",
  //                 {
  //                     name,
  //                     email,
  //                     password,
  //                 },
  //                 config
  //             );

  //             localStorage.setItem("userInfo", JSON.stringify(data));
  //             // isAuth();
  //             console.log(data);
  //             history.push("/");

  //         } catch (error) {
  //             console.log("Error Occurred")
  //         }
  //     }
  // }

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
            src=""
            alt="profile pic"
            className={styles.profile_img}
          />
          <form className={styles.form} >
            <div className={styles.input_field}>
              <label className={styles.form_label}>
                First Name: 
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
                Middle Name: 
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
                Last Name: 
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
            <div className={styles.input_field}>
              <label className={styles.form_label}>
                Birthdate: 
              </label>
              <div className={styles.flex_col}>
              <input
                type="date"
                name="username"
                id="username"
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
                className={styles.form_input}
                required
              />
              <span className={styles.form_error}></span>
              </div>
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

          <button
            type="submit"
            className={styles.btn_submit}
          >
            Register
          </button>
          </form>
      </div>

    </>
  );
}

export { RegisterPage }