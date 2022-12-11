import React from 'react'
import styles from "./BookingDetails.module.css"
import { useParams } from 'react-router'
// import {getDocData} from "../utils";
import {useSelector} from 'react-redux';
// import {bookSlot} from "../utils";
import { useHistory } from "react-router-dom";
import moment from 'moment';
import axios from 'axios';


const BookingDetails = () => {
    const {id, time} = useParams();
    const [docData, setDocData] = React.useState({});
    const [name, setName] = React.useState("");
    const [phone, setPhone] = React.useState("");

    const user = useSelector(state => state.authReducer.currentUser);

    const history = useHistory();

    React.useEffect(async () => {
        const res = await axios.get(`http://localhost:5000/doctors/${id}/id`);
        setDocData(res.data.doctor[0]);
    }, [])

    const handleChangeTime = () => {
        history.push(`/appointments/${id}/id/time`);
    }

    const handleBookAppointment = async () => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        console.log(userInfo);
        if(userInfo){
            try {
                const config = {
                    headers: {
                        "Content-type" : "application/json",
                    }
                }

                const res = await axios.post(
                    "http://localhost:5000/booking/book",
                    {
                        doctor_id: docData._id,
                        name: name,
                        contact: phone,
                        time: moment(time).format("LLL"),
                        status: true,
                        user_id: userInfo._id,
                    },
                    config
                )
                
                history.push("/");
                
            } catch (error) {
                
            }
        }
        else{

        }
    }

    return (
        <div className = {styles.container}>
            <div className={styles.content}>
                <div className={styles.form}>
                    <div className={styles.left}>
                        <div className={styles.appoint}>
                            <h3>Appointment Details</h3>
                        </div>
                        <div className={styles.timings}>
                            <div>
                                <div className={styles.date}>
                                    {/* <p>On <span style={{fontSize:"16px",fontWeight:"700",color: "#414146"}}>{moment(time).format("MMMM Do")}</span></p> */}
                                    <p>On <span style={{fontSize:"16px",fontWeight:"700",color: "#414146"}}>{moment(time).format("MMMM Do")}</span></p>
                                </div>
                                <div className={styles.time}>
                                    {/* <p>At <span style={{fontSize:"16px",fontWeight:"700",color: "#414146"}}>{time.substring(11, 16)} {Number(time.substring(11, 13)) >= 12 ? 'PM' : 'AM'}</span></p> */}
                                    <p>At <span style={{fontSize:"16px",fontWeight:"700",color: "#414146"}}>{moment(time).format('LT')}</span></p>
                                </div>
                            </div>
                            <button className = {styles.button} onClick = {handleChangeTime} >Change Date & Time</button>
                        </div>
                        <div className={styles.doctor}>
                            <div>
                            <img src={docData.image_url} style={{width:"130px"}} alt = "avatar"></img>
                            </div>
                            <div style={{marginLeft:"20px"}}>
                                <h3>{docData.name}</h3>
                                <p>{docData.specialization}</p>
                                <p>Experience of {docData.experience} years</p>
                            </div>
                        </div>
                        <div className={styles.hospital}>
                            <div>
                                <img src="https://revcycleintelligence.com/images/site/article_headers/_normal/hospital%2C_green.jpg"
                                style={{width:"130px"}} alt = "hospital img"></img>
                            </div>
                            <div style={{marginLeft:"20px"}}>
                                <h3>{docData.clinic_name}</h3>
                                <p>{docData.area}, {docData.city}</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.right}>
                        <div className={styles.patienthead}>
                            <h3 style={{color:"#414146"}}>Patient Details</h3>
                            <h5>This is an in-clinic appointment</h5>
                            <h5>Please provide following information about patient</h5>
                        </div>
                        <div>
                            <p>FullName<span style={{color:"red"}}>*</span></p>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Your FullName" className={styles.name}></input>
                        </div>
                        <div>
                            <p>Mobile<span style={{color:"red"}}>*</span></p>
                            <input type="tel" pattern="[0-9]{10}" className={styles.name} value={phone}  onChange={(e) => setPhone(e.target.value)}   placeholder="Enter Mobile No."></input>
                        </div>
                        <div>
                            <p>Your Email</p>
                            <input type="email" className={styles.name} placeholder="Enter Your Email ID (Optional)"></input>
                        </div>
                        <div>
                            <button className = {styles.confirm} onClick = {handleBookAppointment}>Book Appointment</button>
                        </div>
                        <div className={styles.conditions}>
                            <p>1. Updates will be sent to {user.email}</p>
                            <p>By booking this appointment, you agree to Practo’s<span style={{color:"#03a9f4"}}>Terms and Conditions.</span> </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookingDetails
