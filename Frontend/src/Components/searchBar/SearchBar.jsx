import React from 'react'
import styles from './SearchBar.module.css'
import { BiCurrentLocation, BiSearch } from 'react-icons/bi'
import { SearchResultCard } from '../searchResultCard/SearchResultCard'
import { useHistory } from 'react-router-dom'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const SearchBar = () => {
    const [mainQuery, setMainQuery] = React.useState("")
    const [reqDoctorsList, setReqDoctorsList] = React.useState([]);
    const [allDoctorsList, setAllDoctorsList] = React.useState({});

    // const dispatch = useDispatch()
    // const { doctorsList, isLoading } = useSelector(state => state.doctorsReducer, shallowEqual)
    const history = useHistory()

    //dynamic search request 

    const getDoctors = () => {
        const res = allDoctorsList.filter(data => {
            const name = data.name.firstName + " " + data.name.middleName + " " + data.name.surName;
            let speciality = "";
            data.specialization.map((s) => {
                speciality += s.special + " ";
            });
            return name.toLowerCase().indexOf(mainQuery.toLowerCase()) >= 0 || speciality.toLowerCase().indexOf(mainQuery.toLowerCase()) >= 0; 
        })
        
        // console.log(mainQuery);
        // console.log(res);
        return res;
    }

    React.useEffect(() => {
        if(mainQuery == ""){
            setReqDoctorsList([]);
        }
        else{
            // console.log("useEffect");
            setReqDoctorsList(getDoctors());
        }
    }, [mainQuery])


    React.useEffect(async () => {
        const res = await axios.get("http://localhost:5000/doctor/all");
        // console.log(res.data.data);
        setAllDoctorsList(res.data.data);
    }, [])

    
    // //on click of doctor
    const handleDoctorsPage = (id) => {
        history.push(`doctors/${id}/id`)
    }

    const handleSpeciality = (speciality) => {
        history.push(`doctors/${speciality}/speciality`)
    }



    const speciality = ["Dermatologist", "Pediatrician", "Dentist", "General physician", "ENT", "Gynecologist"]
    return (
        <div>
            <div className={styles.container}>
                <div className={styles.main}>
                    <span className={styles.search_icon}>
                        <BiSearch size="1.2em" />
                    </span>
                    
                    <input
                        type="text"
                        value={mainQuery}
                        onChange={(e) => setMainQuery(e.target.value)}
                        placeholder="Search doctors, clinics, etc.,"
                    />
                    <div className={styles.dropdown}>
                        {
                            // isLoading
                            //     ? <div style={{ padding: "15px 0" }}>Loading results...</div>
                                reqDoctorsList?.map((item) => {
                                    return (
                                        <SearchResultCard data = {item} onClick = {handleDoctorsPage} key = {item._id}/>
                                    )
                                })
                        }
                    </div>
                </div>
            </div>
            <div className={styles.speciality}>
                <strong>Speciality:</strong>
                {
                    speciality?.map((speciality, i) => {
                        return (
                            <span
                                key={i}
                                onClick= {() => handleSpeciality(speciality)}
                            >
                                {speciality}
                            </span>
                        )
                    })
                }
            </div>
            {/* <Snackbar open={open} autoHideDuration={10000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="info">
                    Hey! I have got your location, I'm using a free API so sometimes the location might not populate in the left part of the search bar.
                </Alert>
            </Snackbar> */}
        </div>
    )
}

export { SearchBar }

