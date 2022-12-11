import moment from 'moment'
import React from 'react'
import { useHistory } from 'react-router-dom'
// import { BookingCard } from '../bookingCard/BookingCard';
import styles from './DoctorCard.module.css'

const DoctorCard = ({data}) => {
    const history = useHistory();

    const handleBooking = () => {
        const time = moment().format('llll');
        history.push(`/appointments/${data._id}/${time}`);
    }

    return (
        <>
            <div className = {styles.card}>
                <div className = {styles.left}>
                    <img 
                        className = {styles.avatar}
                        src = {data.image_url}
                        alt = "avatar"
                    />
                    <div className = {styles.badge}></div>
                </div>
                <div className = {styles.mid}> 
                    <h1>{data.name}</h1>
                    <p className = {styles.grey}>{data.specialization}</p>
                    <p className = {styles.grey}>{data.experience} years</p>
                    <p><strong>{data.area}, {data.city}</strong> ♦️ {data.clinic_name}</p>
                    <p>Rs.{data.consulting_fee} Consultation fee at clinic</p>
                    <div className = {styles.line_break}></div>
                    <div className = {styles.ratings}>
                        👍 {data.likes}
                    </div>
                </div>
                <div className = {styles.right}> 
                    <button className = {styles.book_btn} onClick = {handleBooking}>Book Appointment</button>
                </div>
            </div>
            {/* <div>
            {
                open && <BookingCard doctors_id ={data._id}/>
            }
            </div> */}
        </>
    )
}

export {DoctorCard}
