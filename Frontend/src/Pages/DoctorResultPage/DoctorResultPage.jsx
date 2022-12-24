import React from 'react'
import styles from './DoctorResultPage.module.css'
import {DoctorCard} from '../../Components/doctorCard/DoctorCard'
import axios from 'axios'
import { useParams } from 'react-router'



const DoctorResultPage =  () => {
    const {id} = useParams()
    const [doctor, setDoctor] = React.useState(null)

    React.useEffect(() => {
        const getData = async () => {
            try {
              const res = await axios.get(
                `http://localhost:5000/doctor/${id}/id`,
              );
              setDoctor(res.data.data[0]);
            } catch (e) {
              console.log(e);
            }
          };

          getData();
      }, [id]);
    console.log(doctor);
    return (
        <div>
          {doctor && <DoctorCard data = {doctor}/>}
        </div>
    )
}

export default DoctorResultPage;