import React from 'react'
import styles from "./LandingPage.module.css"
import {useHistory} from "react-router-dom";
import { useEffect, useState } from "react";
import FrontImg from "../assets/Banner.jpeg"
import { Navbar } from './Navbar/Navbar';
import findDoctor2 from '../assets/img/landingPage/find-doctors-2.webp'
import doctorOnline from '../assets/img/landingPage/doctor-online.webp'
import swachCard2 from '../assets/img/landingPage/swasth-card-2.webp'
import coronavirus from '../assets/img/landingPage/coronavirus.webp'
import irregularPeriod from '../assets/img/landingPage/irregular-painful+period.webp'
import Acne from '../assets/img/landingPage/Acne.webp'
import sexology from '../assets/img/landingPage/top-speciality-sexology.svg'
import padiatric from '../assets/img/landingPage/top-speciality-pediatric.svg'
import cough from '../assets/img/landingPage/coughing.webp';
import depression from '../assets/img/landingPage/12-mental-wellness.webp'
import dentist from '../assets/img/landingPage/sp-dentist@2x.jpg'
import gyna from '../assets/img/landingPage/sp-gynecologist@2x.jpg'
import dietician from '../assets/img/landingPage/sp-dietitian@2x.jpg';
import physio from '../assets/img/landingPage/sp-physiotherapist@2x.jpg'
import covid from '../assets/img/landingPage/covid.jpg'
import vitamins from '../assets/img/landingPage/vitamins.jpg'


const LandingPage = (props) => {

    const history = useHistory();
    
    useEffect(() => {
        const userInfo = localStorage.getItem("userInfo");

        if((userInfo)){
            history.push("/");
        }
    }, [history]);

    const findDoctors = () => {
        history.push("/doctors/allDoctor")
    }
    return (
        <>
        <Navbar settoastCondition={props.settoastCondition} setToastShow={props.setToastShow}/>
        <div className = {styles.container}>
            <div className={styles.topimage}>
                {/* <img src="https://www.practostatic.com/consumer-home/desktop/images/1597423628/banner.png" */}
                <img src={FrontImg}
                style={{height:"320px",width:"100%"}} alt="Banner"></img>
            </div>
            <div className={styles.neardoctor}>
                <img src={findDoctor2}
               style={{height:"225px"}} alt="dfdf" onClick={findDoctors}></img>
                <img src={doctorOnline}
               style={{height:"225px"}} alt="gfdhgf" onClick={findDoctors} ></img>
            </div>
            <div className={styles.covid}>
                <div className={styles.covidhead}>
                    <h2 style={{color:"white"}}>How Prohealth is Helping India Fight COVID-19</h2>
                </div>
                <div className={styles.coviddoctor}>
                    <img src={swachCard2}
                    style={{width:"360px"}} alt="ghi"></img>

                    <img src={swachCard2}
                    style={{width:"360px"}} alt="def"></img>
                    <img src={coronavirus}
                    style={{width:"360px"}} alt="abc"></img>
                </div>
            </div>
            <div className={styles.specialities}>
                <div style={{color:"#414146"}}>
                    <h2 style={{margin:"0"}}>Consult top doctors online for any health concern</h2>
                    <p>Private online consultations with verified doctors in all specialists</p>
                </div>
                <div className={styles.specialbtn}>
                    View All Specialities
                </div>
            </div>
            <div className={styles.consultations}>
                <div className={styles.consult}>
                    <img src={irregularPeriod}
                    style={{width:"150px"}} alt = "img"></img>
                    <h5>Period doubts</h5>
                    <h5>CONSULT NOW</h5>
                </div>
                <div className={styles.consult}>
                    <img src={Acne} style={{width:"150px"}} alt = "img"></img>
                    <h5>Acne,pimple or Skin issues</h5>
                    <h5>CONSULT NOW</h5>
                </div>
                <div className={styles.consult}>
                    <img src={sexology} style={{width:"150px"}} alt = "img"></img>
                    <h5>Performance issues in bed</h5>
                    <h5>CONSULT NOW</h5>
                </div>
                <div className={styles.consult}>
                    <img src={cough} style={{width:"150px"}} alt = "img"></img>
                    <h5>Cold,Cough or Fever</h5>
                    <h5>CONSULT NOW</h5>
                </div>
                <div className={styles.consult}>
                    <img src={padiatric} style={{width:"150px"}} alt = "img"></img>
                    <h5>Child not feeling well</h5>
                    <h5>CONSULT NOW</h5>
                </div>
                <div className={styles.consult}>
                    <img src={depression} style={{width:"150px"}} alt = "img"></img>
                    <h5>Depression or anxiety</h5>
                    <h5>CONSULT NOW</h5>
                </div>
            </div>
            <div style={{padding:"0px 50px"}}>
                <div className={styles.consultheading}>
                    <h2>Book an appointment for an in-clinic consultation</h2>
                    <p>Find experienced doctors across all specialties</p>
                </div>
                <div className={styles.consultdiff}>
                    <div className={styles.consultspecial}>
                        <img src={dentist} alt = "img"></img>
                        <h3>Dentist</h3>
                        <p>Teething troubles? Schedule a dental checkup</p>
                    </div>
                    <div className={styles.consultspecial}>
                        <img src={gyna} alt = "img"></img>
                        <h3>Gynecologist/Obstetrician</h3>
                        <p>Explore for women's health,pregnancy and infertility treatments</p>
                    </div>
                    <div className={styles.consultspecial}>
                        <img src={dietician} alt = "img"></img>
                        <h3>Dietitian/Nutrition</h3>
                        <p>Get guidance on eating right,weight management and sports nutrition</p>
                    </div>
                    <div className={styles.consultspecial}>
                        <img src={physio} alt = "img"></img>
                        <h3>Physiotherapist</h3>
                        <p>Pulled a muscle? Get it treated by a trained physiotherapist</p>
                    </div>
                </div>
            </div>
            <div className={styles.articleContainer}>
                <div className={styles.readarticle}>
                    <h1>Read top articles from health experts</h1>
                    <p>Health articles that keep you informed about good health practices and achieve your goals.</p>
                    <button>See all articles</button>
                </div>
                <div className={styles.article}>
                    <img src={covid} alt = "img"></img>
                    <h5 style={{color:"#079ac7"}}>CORONAVIRUS</h5>
                    <h5>12 Coronavirus Myths and Facts That You Should Be Aware Of</h5>
                    <p>Dr . Diana Borgio</p>
                </div>
                <div className={styles.article}>
                    <img src={vitamins} alt = "img"></img>
                    <h5 style={{color:"#079ac7"}}>VITAMINS AND SUPPLEMENTS</h5>
                    <h5>Eating Right to Build Immunity Againist Cold And Viral Infections</h5>
                    <p>Dr . Diana Borgio</p>
                </div>
            </div>
        </div>
        </>
    )
}

export default LandingPage
