import React from 'react'
import styles from './DoctorResultPage.module.css'
import {DoctorCard} from '../../Components/doctorCard/DoctorCard'
import axios from 'axios'
import { useParams } from 'react-router'

function getDoctor(){
    // console.log("inside")
    return axios.get(`http://localhost:5000/doctor/all`)
    .then((res) => {
        // console.log(res.data.data);
        return res.data.data;
    })
}

const AllDoctor = () => {
    const [doctor, setDoctor] = React.useState([])

    React.useEffect(() => {
        getDoctor()
        .then((data) => {
          setDoctor(data);
        })
        .catch((err) => {
          console.log(err)
        })
      }, [])
    
    return (
        <div>
            {
              doctor.length != 0 ? 
                doctor.map((data, i) => {
                    return(
                        <DoctorCard data = {data} key={i}/>
                    )
                })
                :
                <h1 style={{display:"flex", justifyContent: "center"}}>No Doctors Available</h1>
            }
        </div>
    )
}

export default AllDoctor;