import React from 'react'
import styles from "./ConsultCard.module.css"
import Button from '@material-ui/core/Button';
import moment from "moment";
// import {cancelAppointment} from "../../utils"
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import Typography from '@material-ui/core/Typography';
import { Divider, Paper } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));


function getDoctorByID(id){
  // console.log("inside")
  return axios.get(`http://localhost:5000/doctor/${id}/id`)
  .then((res) => {
      return res.data.data[0];
  })  
}

const ConsultCard = ({data}) => {
  const [open, setOpen] = React.useState(false);
  
  const [doctor, setDoctor] = React.useState(null)

    let docName = "";
    let orgAddress = "";
    if(doctor != null){
        console.log(doctor);
        docName = doctor.name.firstName + " " + doctor.name.surName;
        orgAddress = doctor.orgAddress.building + ", " + doctor.orgAddress.city + " " + doctor.orgAddress.pincode;
    }
    React.useEffect(() => {
        getDoctorByID(data.doctor_id)
        .then((data) => {
          setDoctor(data)
        })
        .catch((err) => {
          console.log(err)
        })
      }, [])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const [dialogDelete, setDeleteDialog] = React.useState(false);

  const handleDeleteDialogOpen = () => {
    setDeleteDialog(true);
  }

  const handleDeleteDialogClose = () => {
      setDeleteDialog(false);
  }

  const handleJoin = () => {
    handleDeleteDialogOpen();
  }

  const handleDelete = () => {
    setDeleteDialog(false); 
  }


  return (
    <div className={styles.detailCont}>
      <div className={styles.date}>
          <h3>{moment(data.time).format('D')}</h3>
          <h5 className={styles.specialP}>{moment(data.time).format('MMM')}</h5>
      </div>
      <div className={styles.userDetails}>
        <p><b>DR. {docName}</b></p>
        <p className={styles.specialP}>On {moment(data.time).format('LT')}</p>
        <div className={styles.specialP}>
          <p>{orgAddress}</p>
        </div>
        <div className={styles.active}>
          {
            data.status === true &&
            <p>Active</p>
          }
        </div>
        <div className={styles.cancelled}>
          {
            data.status === false &&
            <p>Cancelled</p>
          }
        </div>
      </div>
      <div className={styles.action}> 
        {/* <Button variant="outlined" color="primary" style={{marginRight: "1em"}}>
          View Details
        </Button> */}
        {
          data.status === true &&
          <Button variant="outlined" color="primary" onClick={handleJoin}>
            Join Now
          </Button>
        }
      </div>
      <Dialog
          open={dialogDelete}
          onClose={handleDeleteDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
      >
          <DialogTitle id="alert-dialog-title">
              <ErrorOutlineIcon/>
              <Typography component={'div'} variant="subtitle1">
                  Are you sure you want to delete?
              </Typography>
          </DialogTitle>
          <Divider/>
          <DialogActions>
          <Button onClick={handleDeleteDialogClose} variant="outlined">
              Cancel
          </Button>
          <Button color="secondary" variant="contained" onClick={handleDelete}>
              Delete
          </Button>
          </DialogActions>
      </Dialog>
    </div>
  )
}

export {ConsultCard}
