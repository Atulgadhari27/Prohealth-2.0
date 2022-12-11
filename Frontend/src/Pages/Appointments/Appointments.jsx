import { Divider } from '@material-ui/core'
import React from 'react'
import { AppointmentsCard } from '../../Components/AppointmentCard/AppointmentsCard'
import styles from "./Appointments.module.css"
import {useSelector} from 'react-redux';
// import {getUserAppointments, getIndvDocData} from "../../utils"
import axios from 'axios'


const getUserAppointments = (user_id) => {
    return axios.get(`http://localhost:5000/booking/${user_id}/userBookings`)
    .then((res) => {
        return res.data.data;
    })
}

const Appointments = () => {
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
          console.log(res.data);
        })
    }
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    
    const [appointments ,setAppointments] = React.useState([]);
    const listItems = appointments.map((appt) =>  
                <AppointmentsCard data = {appt} key={appt._id} handleConfirmCancel = {handleConfirmCancel}/> 
            );

    React.useEffect(() => {
        getUserAppointments(userInfo._id)
        .then((data) => {
            // console.log(data);
            setAppointments(data);
        })
    },[appointments])

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
                            <p><b>{userInfo.name}</b></p>
                            <p>{userInfo.email}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.main}>
                <div className={styles.main_left}>
                    <Divider/>
                    <div className={styles.menu_item}>
                        <p>Medical records</p>
                    </div>
                    <Divider/>
                    <div className={styles.active}>
                        <p>Appointments</p>
                    </div>
                    <Divider/>
                    <div className={styles.menu_item}>
                        <p>Lab Tests</p>
                    </div>
                    <Divider/>
                    <div className={styles.menu_item}>
                        <p>Payment</p>
                    </div>
                    <Divider/>
                    <div className={styles.menu_item}>
                        <p>Medical records</p>
                    </div>
                    <Divider/>
                </div>
                <div className={styles.main_right}>
                        {
                            listItems
                        }
                </div>
            </div>
        </div>            
        </div>
    )
}

export {Appointments}
