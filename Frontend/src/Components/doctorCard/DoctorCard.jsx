import moment from 'moment'
import React from 'react'
import { useHistory } from 'react-router-dom'
// import { BookingCard } from '../bookingCard/BookingCard';
import styles from './DoctorCard.module.css'

const DoctorCard = ({data}) => {
    const history = useHistory();
    console.log(data);
    const image_url = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
    const name = data.name.firstName + " " + data.name.middleName + " " + data.name.surName;
    let speciality = "";
    data.specialization.map((s) => {
        speciality += s.special + " ";
    });

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
                        src = {image_url}
                        alt = "avatar"
                    />
                    <div className = {styles.badge}></div>
                </div>
                <div className = {styles.mid}> 
                    <h1>{name}</h1>
                    <p className = {styles.grey}>{speciality}</p>
                    <p className = {styles.grey}>10 years</p>
                    <p><strong>{data.orgAddress.taluka}, {data.orgAddress.city}</strong> ♦️ {data.org}</p>
                    <p>Rs.200 Consultation fee at clinic</p>
                    <div className = {styles.line_break}></div>
                    <div className = {styles.ratings}>
                        👍 10000
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
