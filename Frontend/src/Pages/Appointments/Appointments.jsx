import { Divider } from '@material-ui/core'
import React from 'react'
import { AppointmentsCard } from '../../Components/AppointmentCard/AppointmentsCard'
import styles from "./Appointments.module.css"
import {useSelector} from 'react-redux';
// import {getUserAppointments, getIndvDocData} from "../../utils"
import axios from 'axios'
// import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { AccordianComp } from '../../Components/Accordian/Accordian';


const getUserAppointments = (user_id, suffix) => {
    return axios.get(`http://localhost:5000/booking/${user_id}${suffix}`)
    .then((res) => {
        // console.log(res);
        return res.data.data;
    })
}

const Appointments = (props) => {
    const cancelAppointment = async (id) => {
        try {
          const config = {
            headers : {
              "Content-type": "application/json",
            }
          }
          const res = axios.post(
            "http://localhost:5000/booking/updateStatus",
            {
              id
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
    const name = userInfo.name.firstName + " " + userInfo.name.middleName + " " + userInfo.name.surName;
    const [c, setC] = React.useState(true);
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
        if(props.user == "Patient"){
            getUserAppointments(userInfo._id, "/userBookings")
            .then((data) => {
                // console.log(data);
                setData(data);
            })
        }
        else{
            getUserAppointments(userInfo._id, "/doctorBookings")
            .then((data) => {
                // console.log(data);
                setData(data);
            })
        }
    },[appointments])

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
                            <p>{userInfo.email}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.main}>
                <div className={styles.main_left}>
                    <Divider/>
                    <div className={active === "Medical" ? styles.active : styles.menu_item} onClick = {() => handleActive("Medical")}>
                        <p>Medical records</p>  
                    </div>
                    <Divider/>
                    <div className={active === "Appointments" ? styles.active : styles.menu_item} onClick = {() => handleActive("Appointments")}>
                        <p>Appointments</p>
                    </div>
                    <Divider/>
                    <div className={active === "Lab" ? styles.active : styles.menu_item} onClick = {() => handleActive("Lab")}>
                        <p>Lab Tests</p>
                    </div>
                    <Divider/>
                    <div className={active === "Payment" ? styles.active : styles.menu_item} onClick = {() => handleActive("Payment")}>
                        <p>Payment</p>
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
                            active == 'Medical' && 
                            <AccordianComp/>
                        }
                </div>
            </div>
        </div>            
        </div>
    )
}

export {Appointments}
