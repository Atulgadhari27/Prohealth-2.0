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
    const [docData, setDocData] = React.useState(null);
    const [name, setName] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [email, setEmail] = React.useState("");

    const user = useSelector(state => state.authReducer.currentUser);

    const history = useHistory();

    React.useEffect(async () => {
        const res = await axios.get(`http://localhost:5000/doctor/${id}/id`);
        console.log(res);
        setDocData(res.data.data[0]);
    }, [])

    const handleChangeTime = () => {
        history.push(`/appointments/${id}/id/time`);
    }

    const getPatientEmail = async (id) => {
        try{
            const res = await axios.get(`http://localhost:5000/patient/${id}/id`);
            return res;
        }catch(err){
            console.log(err);
        }
    }
    const getDoctorEmail = async (id) => {
        try{
            const res = await axios.get(`http://localhost:5000/doctor/${id}/id`);
            return res;
        }catch(err){
            console.log(err);
        }
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
                        patient_id: userInfo._id,
                        email: email,
                    },
                    config
                )
                
                const patient = await getPatientEmail(userInfo._id);
                const doctor = await getDoctorEmail(docData._id)
                const doctorEmail = doctor.data.data.email;
                const doctorName = "Dr." + doctor.data.data[0].name.firstName + " " + doctor.data.data[0].name.surName;
                
                const mail = await axios.post(
                    "http://localhost:5000/sendMail",
                    {
                        email: email,
                        time: moment(time).format('MMMM Do YYYY, h:mm:ss a'),
                        patientName: name,
                        doctorName: doctorName,
                        status: true,
                    },
                    config
                  )
        
                  const mail2 = await axios.post(
                    "http://localhost:5000/sendMail",
                    {
                        email: doctorEmail,
                        time: moment(time).format('MMMM Do YYYY, h:mm:ss a'),
                        patientName: name,
                        doctorName: doctorName,
                        status: true,
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

    const image_url = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
    let docName = "";
    let speciality = "";
    if(docData != null){
        docName = docData.name.firstName + " " + docData.name.middleName + " " + docData.name.surName;
        
        docData.specialization.map((s) => {
            speciality += s.special + " ";
        });
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
                            <img src={image_url} style={{width:"130px"}} alt = "avatar"></img>
                            </div>
                            <div style={{marginLeft:"20px"}}>
                                <h3>{docName}</h3>
                                <p>{speciality}</p>
                                <p>Experience of 10 years</p>
                            </div>
                        </div>
                        <div className={styles.hospital}>
                            <div>
                                <img src="https://revcycleintelligence.com/images/site/article_headers/_normal/hospital%2C_green.jpg"
                                style={{width:"130px"}} alt = "hospital img"></img>
                            </div>
                            <div style={{marginLeft:"20px"}}>
                                {docData && <h3>{docData.org}</h3>}
                                {docData &&     <p>{docData.address.district}, {docData.address.city}</p>}
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
                            <input type="email" className={styles.name} value={email}  onChange={(e) => setEmail(e.target.value)} placeholder="Enter Your Email ID "></input>
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
