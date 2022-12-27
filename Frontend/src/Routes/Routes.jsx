import React from 'react'
import {Switch, Route} from 'react-router-dom'
import { Navbar } from '../Components/Navbar/Navbar'
import LandingPage from '../Components/LandingPage'
import { Footer } from '../Components/Footer/Footer'
import {LoginPage} from '../Pages/LoginPage/LoginPage'
import { RegisterPage } from '../Pages/RegisterPage/RegisterPage'
import { DoctorSearch } from '../Components/doctorSearch/DoctorSearch'
import  DoctorResultPage from '../Pages/DoctorResultPage/DoctorResultPage'
import {Appointments} from '../Pages/Appointments/Appointments'
import { BookingCard } from '../Components/bookingCard/BookingCard'
import BookingDetails from '../Components/BookingDetails/BookingDetails'
import DoctorResultBySpeciality from '../Pages/DoctorResultPage/DoctorResultBySpeciality'
import AllDoctor from '../Pages/DoctorResultPage/AllDoctor'
import { Consult } from '../Components/Consult/Consult'
import { Prescription } from '../Components/Prescription/Prescription'
import { Admindashboard } from '../Pages/AdminDashboard/Admindashboard'



const Routes = (props) => {
  // toast.configure();
  // console.log(props);
    return  (
        <Switch>
            <Route exact path = '/'>
                <LandingPage settoastCondition={props.settoastCondition} setToastShow={props.setToastShow}/>
                <Footer/>
            </Route>
            <Route exact path = '/login'>
                <LoginPage settoastCondition={props.settoastCondition} setToastShow={props.setToastShow} setUser = {props.setUser}/>
                <Footer/>
            </Route>
            <Route exact path = '/register'>
                <RegisterPage settoastCondition={props.settoastCondition} setToastShow={props.setToastShow} setUser = {props.setUser}/>
                <Footer/>
            </Route>
            <Route exact path = '/doctors'>
                <Navbar/>
                <DoctorSearch/>
                <Footer/>
            </Route>
            <Route exact path = '/consult'>
                <Navbar/>
                <Consult settoastCondition={props.settoastCondition} setToastShow={props.setToastShow} user = {props.user}/>
                <Footer/>
            </Route>
            <Route exact path = '/doctors/allDoctor'>
                <Navbar/>
                <AllDoctor/>
                <Footer/>
            </Route>
            <Route exact path = "/doctors/:id/id">
                <Navbar/>
                <DoctorResultPage />
                <Footer/>   
            </Route>
            <Route exact path = "/doctors/:speciality/speciality">
                <Navbar/>
                <DoctorResultBySpeciality />
                <Footer/>   
            </Route>
            <Route exact path = "/prescription/:id/id">
                <Navbar/>
                <Prescription/>
                <Footer/>
            </Route>
            <Route exact path = "/admin/dashboard">
                <Navbar/>
                <Admindashboard/>
                <Footer/>
            </Route>
            <Route exact path = "/appointments">
                <Navbar settoastCondition={props.settoastCondition} setToastShow={props.setToastShow} setUser = {props.setUser}/>
                <Appointments user = {props.user} />
                <Footer/>
            </Route>
            <Route exact path = "/appointments/:id/:time">
                <Navbar />
                <BookingDetails />
                <Footer/>
            </Route>
            <Route exact path = "/appointments/:id/id/time">
                <Navbar />
                <BookingCard />
                <Footer/>
            </Route>
        </Switch>
    )
}

export {Routes}