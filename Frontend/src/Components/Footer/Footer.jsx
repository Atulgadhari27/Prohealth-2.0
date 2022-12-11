import React from 'react'
import styles from './Footer.module.css'
import logo from '../../assets/download.jpg'

const Footer = () => {
    const Practo = ["About", "Blog", "Careers", "Press", "Contact Us"]

    const ForPatients = ["Ask free health queries", "Search for doctors", "Search for clinics", "Search for hospitals", 
    "Book Diagonistic Tests"]

    const ForDoctors = [ "Prohealth Consult", "Prohealth Health Feed", "Prohealth Profile" ]
    const ForClinics = ["Prohealth Prime", "Ray by Prohealth", "Prohealth Reach","Ray Tab", "Practo Pro"]

    const ForHospitals = [ "Insta by Prohealth", "Qikwell by Prohealth", "Querent by Prohealth", "Prohealth Profile", "Prohealth Reach", "Prohealth Drive" ]

    const More = ["Help", "Developers", "Privacy Policy", "Terms & Conditions", "Healthcare Directory", "Prohealth Health Wiki"]

    const Social = ["Facebook", "Twitter", "LinkedIn", "Youtube", "Github"]

    return (
        <div className = {styles.container}>
            <div className = {styles.top}>
                <div className = {styles.column}>
                    <h3>ProHealth</h3>
                    {
                        Practo.map((item, i) => {
                            return(
                                <div key = {i}>{item}</div>
                            )
                        })
                    }
                </div>
                <div className = {styles.column}>
                    <h3>For Patients</h3>
                    {
                        ForPatients.map((item, i) => {
                            return(
                                <div key = {i}>{item}</div>
                            )
                        })
                    }
                </div>
                <div className = {styles.column}>
                    <h3>For Doctors</h3>
                    {
                        ForDoctors.map((item, i) => {
                            return(
                                <div key = {i}>{item}</div>
                            )
                        })
                    }
                    <h3>For Clinics</h3>
                    {
                        ForClinics.map((item, i) => {
                            return(
                                <div key = {i}>{item}</div>
                            )
                        })
                    }
                </div>
                <div className = {styles.column}>
                    <h3>For Hospitals</h3>
                    {
                        ForHospitals.map((item, i) => {
                            return(
                                <div key = {i}>{item}</div>
                            )
                        })
                    }
                </div>
                <div className = {styles.column}>
                    <h3>More</h3>
                    {
                        More.map((item, i) => {
                            return(
                                <div key = {i}>{item}</div>
                            )
                        })
                    }
                </div>
                <div className = {styles.column}>
                    <h3>Social</h3>
                    {
                        Social.map((item, i) => {
                            return(
                                <div key = {i}>{item}</div>
                            )
                        })
                    }
                </div>   
            </div>
            <div className = {styles.bottom}>
                <img 
                    src = {logo}
                    alt = "logo"
                />
                <div>
                    Copyrights &#169; 2021, Prohealth. All rights reserved.
                </div>
            </div>
        </div>
    )
}

export {Footer}
