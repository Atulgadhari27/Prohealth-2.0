
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from './Accordian.module.css'

const AccordianComp = () => {
    
    const prescriptions = JSON.parse(localStorage.getItem('userInfo')).prescriptions;
    console.log(prescriptions);
    return (
        <div>
            {
                prescriptions.map((data, i) => {
                    return (
                        <Accordion key={i}>
                            <AccordionSummary
                            expandIcon = ""
                            aria-controls={`panel${i + 1}a-content`}
                            id={`panel${i + 1}a-header`}>
                                <div className={styles.detailCont}>
                                    <div className={styles.date}>
                                        <h3>19</h3>
                                        <h5 className={styles.specialP}>Dec</h5>
                                    </div>
                                    <div className={styles.userDetails}>
                                        <p><b>{data.hospital.name}</b></p>
                                        <p>At {data.hospital.address},</p>
                                    </div>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails>
                                 
                                <div className={styles.userDetails}>
                                    <p><b>Complaints :</b></p>
                                </div>
                                {
                                    data.chiefComplaints.map((d, index) => {
                                        return (
                                            <div className={styles.complaints} key = {index}>
                                                <p><b>Type of Pain: </b> {d.complaint}</p>
                                                <p><b>Duration of Pain: </b>{d.duration}</p>
                                                <p><b>Finding: </b>{d.finding}</p>
                                            </div>
                                        )
                                    })
                                }
                                
                                <div className={styles.userDetails}>
                                    <p><b>Medicines :</b></p>
                                </div>
                                {
                                    data.medicines.map((d, id) => {
                                        return (
                                            <div className={styles.medicines} key= {id}>
                                                <p><b>Medicine 1 : </b>{d.medicineName}</p>
                                                <p>Dosage: {d.dosage.morning.quantity} Tab in Morning, {d.dosage.afternoon.quantity} Tab in Afternoon, {d.dosage.evening.quantity} Tab in Evening</p>
                                                <p>Duration: {d.duration} Days</p>
                                            </div>
                                        )
                                    })
                                }
                                <div className={styles.userDetails}>
                                    <p><b> Advices :</b></p>
                                </div>
                                {
                                    data.advices.map((d, id) => {
                                        return (
                                            <div className={styles.userDetails}>
                                                <p>Eat More Fruits</p>
                                            </div>
                                        )
                                    })
                                }
                            </AccordionDetails>
                        </Accordion>
                    )
                })

            }
        </div>
    )
}

export {AccordianComp}