import React from 'react'
import styles from './SearchResultCard.module.css'

const SearchResultCard = ({data, onClick}) => {
    const name = data.name.firstName + " " + data.name.middleName + " " + data.name.surName;
    let speciality = "";
    data.specialization.map((s) => {
        speciality += s.special + " ";
    });
    // console.log(data);
    const image_url = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
    return (
        <div className = {styles.card} onClick = {() => onClick(data._id)}>
            <div className = {styles.left}>
                <img
                    src = {image_url}
                    alt = "avatar"
                />
            </div>
            <div className = {styles.right}>
                <div className = {styles.name}>{name}</div>
                <div className = {styles.spec}>{speciality}</div>
            </div>
        </div>
        
    )
}

export {SearchResultCard}
