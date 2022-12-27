import styles from './Consult.module.css'
import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { ConsultCard } from '../ConsultCard/ConsultCard';

const getUserAppointments = (user_id, suffix) => {
    return axios.get(`http://localhost:5000/booking/${user_id}${suffix}`)
    .then((res) => {
        console.log(res);
        return res.data.data;
    })
}

const Consult = (props) => {

    const history = useHistory();
    const[bookedData, setBookedData] = useState([]);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    
    const setData = (data) => {
        const booked = data.filter((ele) => {
            return ele.status === true;
        })
        setBookedData(booked);
    }
    React.useEffect(() => {
        console.log(userInfo);
        if(userInfo == null){
            props.settoastCondition({
                status: "warning",
                message: "Login Required!!!",
                });
            props.setToastShow(true);
            history.push("/")
        }
        else if(props.user == "Patient"){
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
    },[])
    return (
        <div>
            <div className={styles.header}>
                <span>Scheduled Appointments</span>
            </div>
            <div className={styles.mid}>
                {
                    bookedData.map((data, i) => {
                        return(
                            <ConsultCard data = {data} key = {i} user = {props.user}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

export {Consult}