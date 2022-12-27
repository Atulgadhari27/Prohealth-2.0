import { Divider } from '@material-ui/core'
import React from 'react'
import { AppointmentsCard } from '../../Components/AppointmentCard/AppointmentsCard'
import styles from "./Admindashboard.module.css"
import {useSelector} from 'react-redux';
// import {getUserAppointments, getIndvDocData} from "../../utils"
import axios from 'axios'
// import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { AccordianComp } from '../../Components/Accordian/Accordian';
import moment from 'moment';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';


const getAllAppointments = () => {
    return axios.get(`http://localhost:5000/booking/all`)
    .then((res) => {
        console.log(res);
        return res.data.data;
    })
}

const getAllDoctors = () => {
    return axios.get(`http://localhost:5000/doctor/all`)
    .then((res) => {
        console.log(res);
        return res.data.data;
    })
}

const getAllPatients = () => {
    return axios.get(`http://localhost:5000/patient/all`)
    .then((res) => {
        console.log(res);
        return res.data.data;
    })
}

const Admindashboard = (props) => {

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
    const cancelAppointment = async (id) => {
        try {
          const config = {
            headers : {
              "Content-type": "application/json",
            }
          }
          const res = await axios.post(
            "http://localhost:5000/booking/updateStatus",
            {
              id
            },
            config
          )
          const data = res.data.book;
          const patient = await getPatientEmail(res.data.book.patient_id);
          const doctor = await getDoctorEmail(res.data.book.doctor_id)
          console.log(doctor);
          const doctorEmail = doctor.data.data.email;
          const doctorName = "Dr." + doctor.data.data[0].name.firstName + " " + doctor.data.data[0].name.surName;
          
          const mail = await axios.post(
            "http://localhost:5000/sendMail",
            {
                email: data.email,
                time: moment(data.time).format('MMMM Do YYYY, h:mm:ss a'),
                patientName: name,
                doctorName: doctorName,
                status: data.status
            },
            config
          )

          const mail2 = await axios.post(
            "http://localhost:5000/sendMail",
            {
                email: doctorEmail,
                time: moment(data.time).format('MMMM Do YYYY, h:mm:ss a'),
                patientName: name,
                doctorName: doctorName,
                status: data.status
            },
            config
          )
        } catch (error) {
          console.log(error)
        }
        
      }
      const handleConfirmCancel= (id) => {
        cancelAppointment(id)
        .then(res => {
          setC(!c);
        })
    }
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    // console.log(userInfo);
    const image_url = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
    const name = "Admin"
    const [c, setC] = React.useState(true);
    const [allDoctors, setAllDoctors] = React.useState([]);
    const [allPatients, setAllPatients] = React.useState([]);
    const [appointments ,setAppointments] = React.useState([]);
    const bookedItems = appointments.map((appt) =>  
                <AppointmentsCard data = {appt} key={appt._id} handleConfirmCancel = {handleConfirmCancel}/> 
            );
    const [cancelledAppointments, setCancelledAppointments] = React.useState([]);

    const cancelledItems = cancelledAppointments.map((appt) => {
        return <AppointmentsCard data = {appt} key={appt._id} handleConfirmCancel = {handleConfirmCancel}/> 
    });
    const setData = (data) => {
        const booked = data.filter((ele) => {
            return ele.status === true;
        })
        // console.log(booked);
        const cancel = data.filter((ele) => {
            return ele.status === false;
        })
        // console.log(cancel)

        setAppointments(booked);
        setCancelledAppointments(cancel);
    }
    React.useEffect(() => {
        // console.log(userInfo);
        getAllAppointments()
        .then((data) => {
            // console.log(data);
            setData(data);
        })

        getAllPatients()
        .then((data) => {
            setAllPatients(data);
        })

        getAllDoctors()
        .then((data) => {
            setAllDoctors(data);
        })
    },[c])

    const [active, setActive] = useState("Appointments");
    const handleActive = (str) => {
        setActive(str);
    }

    return (
        <div className={styles.background}>
        <div className={styles.appointmentCont}>
            <div className={styles.top}>
                <div className={styles.top_left}>
                    <h3>Your Drive</h3>
                </div>
                <div className={styles.top_right}>
                    <div className={styles.top_right_userDetails}>
                        <div className={styles.userDetails_left}>
                            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="avatar"/>
                        </div>
                        <div className={styles.userDetails_right}>
                            <p><b>{name}</b></p>
                            <p>admin@admin</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.main}>
                <div className={styles.main_left}>
                    <Divider/>
                    <div className={active === "Doctors" ? styles.active : styles.menu_item} onClick = {() => handleActive("Medical")}>
                        <p>Doctors</p>
                    </div>
                    <Divider/>
                    <div className={active === "Appointments" ? styles.active : styles.menu_item} onClick = {() => handleActive("Appointments")}>
                        <p>Appointments</p>
                    </div>
                    <Divider/>
                    <div className={active === "Patients" ? styles.active : styles.menu_item} onClick = {() => handleActive("Lab")}>
                        <p>Patients</p>
                    </div>
                    <Divider/>
                    <div className={active === "Cancelled" ? styles.active : styles.menu_item} onClick = {() => handleActive("Cancelled")}>
                        <p>Cancelled Appointments</p>
                    </div>
                    <Divider/>
                </div>
                <div className={styles.main_right}>
                        {
                            active == "Appointments" && 
                            bookedItems
                        }
                        {
                            active == "Cancelled" && 
                            cancelledItems
                        }
                        {
                            active == 'Doctors' && 
                            allDoctors.map((data, i) => {
                                let speciality = "";
                                    data.specialization.map((s) => {
                                        speciality += s.special + " ";
                                    });
                                return (
                                    <Accordion key={i}>
                                        <AccordionSummary
                                        expandIcon = ""
                                        aria-controls={`panel${i + 1}a-content`}
                                        id={`panel${i + 1}a-header`}>
                                            <div className={styles.detailCont}>
                                                <div className={styles.userDetails}>
                                                    <p><b>{`Dr. ${data.name.firstName} ${data.name.surName}`}</b></p>
                                                    <p>Clinic Name: {data.org}</p>
                                                    <p>Speciality: {speciality}</p>
                                                </div>
                                            </div>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <div className={styles.userDetails}>
                                                <p><b> Organization Address:</b> {data.org} {data.orgAddress.city} {data.orgAddress.pincode}</p>
                                            </div>
                                            <div className={styles.userDetails}>
                                                <p><b>Mobile No :</b> {data.mobile}</p>
                                            </div>
                                            <div className={styles.userDetails}>
                                                <p><b>Email :</b> {data.email}</p>
                                            </div>
                                            <div className={styles.userDetails}>
                                                <p><b>Organization No. :</b> {data.orgNumber}</p>
                                            </div>
                                        </AccordionDetails>
                                    </Accordion>
                                )
                            })
                        }
                        
                </div>
            </div>
        </div>            
        </div>
    )
}

export {Admindashboard}
