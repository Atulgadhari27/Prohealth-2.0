import React from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
// import { logout_user } from '../../redux/auth/action'
import styles from './Navbar.module.css'
import {useState} from 'react'
import { isAuth } from '../../assets/isAuth'
import { useEffect } from 'react'
import logo from '../../assets/download.jpg'

const Navbar = (props) => {
    const history = useHistory()
    const [isLoggedIn, setIsLoggedIn] = useState(isAuth());

    const handleLogout = () => {
        localStorage.removeItem("userInfo");
        props.settoastCondition({
            status: "success",
            message: "Logged out Successfully!!!",
          });
        props.setToastShow(true);
    }

    useEffect(() => {   
        setIsLoggedIn(isAuth());
    }, [history])
    return (
        <nav className = {styles.nav}>
            <div 
                className = {styles.logo}
                onClick = {() => history.push("/")}
            >
                <img
                    src = {logo}
                    alt = "logo"
                />
            </div>
            <div 
                className = {styles.left} 
                onClick = {() => history.push("/doctors")}>
                <strong>
                    Doctors
                </strong>
                <br/>
                <span>Book an appointment</span>
            </div>
            <div className = {styles.left}
                onClick = {() => history.push("/consult")}>
                <strong>
                    Consult
                </strong>
                <br/>
                <span>Consult with top doctors</span>
            </div>
            <div className = {styles.left}
                onClick = {() => {props.settoastCondition({
                        status: "success",
                        message: "Logged in Successfully!!!",
                    });
                    props.setToastShow(true);
                    }
                  }>
                <strong>
                    Pharmacy
                </strong>
                <br/>
                <span>Medicine & health products</span>
            </div>
            <div className = {styles.left}
                onClick = {() => history.push("/doctors")}>
                <strong>
                    Diagonistics
                </strong>
                <br/>
                <span>Book test & checkups</span>
            </div>
            <div className = {styles.flex_grow}></div>
            {
                isAuth()
                ?
                    <div className = {styles.right}
                    onClick = {() => history.push("/appointments")}>
                        My bookings
                    </div>
                :  <div></div>
            }   
            <div className = {styles.right}>
                {
                    isAuth()
                    ? 
                        <button className = {styles.login_btn}
                                onClick = {handleLogout}>
                            Logout
                        </button>
                    : <div>
                        <button
                            className = {styles.login_btn}
                            onClick = {() => history.push("/login")}
                        >
                            Login
                        </button>
                        <button
                            className = {styles.login_btn}
                            onClick = {() => history.push("/register")}
                        >
                            Signup
                        </button>
                    </div>
                }
            </div>
        </nav>
    )
}

export {Navbar}
