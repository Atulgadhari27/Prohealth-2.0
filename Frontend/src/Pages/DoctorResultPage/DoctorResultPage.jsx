import React from 'react'
import styles from './DoctorResultPage.module.css'
import {DoctorCard} from '../../Components/doctorCard/DoctorCard'
import axios from 'axios'
import { useParams } from 'react-router'

function getDoctorByID(id){
    console.log("inside")
    return axios.get(`http://localhost:5000/doctors/${id}/id`)
    .then((res) => {
        return res.data.doctor[0];
    })
}

const DoctorResultPage =  () => {
    const {id} = useParams()
    const [doctor, setDoctor] = React.useState({})

    React.useState(() => {
        getDoctorByID(id)
        .then((data) => {
          setDoctor(data)
        })
        .catch((err) => {
          console.log(err)
        })
      }, [])
    
    return (
        <div>
          <DoctorCard data = {doctor}/>
        </div>
    )
}

export default DoctorResultPage;