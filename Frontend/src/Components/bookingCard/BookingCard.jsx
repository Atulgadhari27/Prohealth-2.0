import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import moment from "moment";
import Button from '@material-ui/core/Button';
// import { getBookedSlots } from "../../utils";
import styles from "./BookingCard.module.css"
import WbSunnyOutlinedIcon from '@material-ui/icons/WbSunnyOutlined';
import FlareOutlinedIcon from '@material-ui/icons/FlareOutlined';
import Brightness2OutlinedIcon from '@material-ui/icons/Brightness2Outlined';
import NightsStayOutlinedIcon from '@material-ui/icons/NightsStayOutlined';
import { Divider } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { useParams } from 'react-router'
import axios from 'axios';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
 
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={'div'} >{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '80%',
    margin: "auto"
  },
  slotsCont: {
    display: "flex",
    flexWrap: "wrap",
  },
  icon: {
    color: "#414146"
  },
  slotItem: {
    margin: "0.5em"
  }
}));

const getBookedSlots = (doctor_id) => {
  return axios.get(`http://localhost:5000/booking/${doctor_id}/allbookings`);
}
const BookingCard = () => {
  const {id} = useParams();
  const history = useHistory();
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [docData, setDocData] = React.useState({});
  const [date, setDate] = React.useState(moment().format());
  const [bookedSlots, setBookedSlots] = React.useState([]);
  // console.log(moment().format("LT"));

  
  const checkIsBooked = (bookedSlots, item, value) => {
    const t = moment(item.time, "HH:mm").format("LLL")
    const time = moment(t).add(value, "days").format('LLL');
    // console.log(time);

    if(bookedSlots.includes(time)){
      return true;
    }

    return false;
  }

  const slotArray = [
    {
      time: "9:30",
      timeStr: "09:30",
      type: 0
    },
    {
      time: "10:00",
      timeStr: "10:00",
      type: 0
    },
    {
      time: "10:30",
      timeStr: "10:30",
      type: 0
    },
    {
      time: "11:30",
      timeStr: "11:30",
      type: 0
    },
    {
      time: "12:00",  
      timeStr: "12:00",
      type: 1
    },
    {
      time: "12:30",
      timeStr: "12:30",
      type: 1
    },
    {
      time: "13:00",
      timeStr: "1:00",
      type: 1
    },
    {
      time: "13:30",
      timeStr: "1:30",
      type: 1
    },
    {
      time: "16:00",
      timeStr: "4:00",
      type: 2
    },
    {
      time: "16:30",
      timeStr: "4:30",
      type: 2
    },
    {
      time: "17:00",
      timeStr: "5:00",
      type: 2
    },
    {
      time: "17:30",
      timeStr: "5:30",
      type: 2
    },
    {
      time: "18:00",
      timeStr: "6:00",

      type: 2
    },
    {
      time: "18:30",
      timeStr: "6:30",
      type: 2
    },
    {
      time: "19:00",
      timeStr: "7:00",
      type: 2
    },
    {
      time: "20:00",
      timeStr: "8:00",
      type: 3
    },
    {
      time: "20:30",
      timeStr: "8:30",
      type: 3
    },
    {
      time: "21:00",
      timeStr: "9:00",
      type: 3
    }
  ]
  
  const [slots, setSlots] = React.useState([...slotArray]);
  const [allSlots, setAllSlots] = React.useState([]);
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  const handleBookedSlots = (data) => {
    let slot = [];

    data.map(item => {
      if(item.status == true)
        slot.push(item.time);
      // console.log(typeof(item.time));
    })
    // console.log(slot);
    setBookedSlots(slot);
  }

  const compareTime = (time1) => {
    // console.log(time1 + " " + time2)
    
    const time = moment().format("HH:mm");
    // console.log(time);
    time1 = Number(time1.split(":")[0]) * 60 + Number(time1.split(":")[1]);
    const time2 = Number(time.split(" ")[0].split(":")[0]) * 60 + Number(time.split(" ")[0].split(":")[1]);
    return time1 < time2;
  }
  
  React.useEffect(() => {
    getBookedSlots(id)
      .then(res => {
        handleBookedSlots(res.data.data);
        // console.log(res.data.data);
      })
  }, [value])

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setDate(moment().add(newValue, "days").format());
    handleBookedSlots(allSlots, newValue);
  };

  const handleBookSlot = (time) => {
    const dateTimeStr = date.substring(0, 11) + time + ":00+05:30"
    console.log(dateTimeStr)
    history.push(`/appointments/${id}/${dateTimeStr}`)

  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Today" {...a11yProps(0)} />
          <Tab label="Tomorrow" {...a11yProps(1)} />
          <Tab label={moment().add(2, "days").format('ddd, MMM Do')} {...a11yProps(2)} />
          <Tab label={moment().add(3, "days").format('ddd, MMM Do')} {...a11yProps(3)} />
          <Tab label={moment().add(4, "days").format('ddd, MMM Do')} {...a11yProps(4)} />
          <Tab label={moment().add(5, "days").format('ddd, MMM Do')} {...a11yProps(5)} />
        </Tabs>
      </AppBar>
      {
        arr.map(idx => (
          <TabPanel value={value} index={idx} className={classes.tabPanel} key={idx}>
            <Box className={classes.slotsCont}>
              <div className={styles.slotsCont_time}>
                <WbSunnyOutlinedIcon className={styles.icon} color="action" />
                <p>Morning</p>
              </div>
              <div className={styles.slotsCont_slots}>
                {
                  [...slots].map(item => (
                    // console.log(Number(date.substring(11, 13)+ date.substring(14, 16)) , Number(item.time.substring(0, 2) + item.time.substring(3, 5)));
                    item.type === 0 && !checkIsBooked(bookedSlots, item, value)
                    && <Button variant="outlined" className={classes.slotItem} key={item.time} value={item.time} color="primary" onClick={() => handleBookSlot(item.time)} disabled={
                      value === 0 ? compareTime(item.time) ? true : false : false
                    }>{item.timeStr}</Button>
                  ))
                }
              </div>
            </Box>
            <Divider />
            <Box className={classes.slotsCont}>
              <div className={styles.slotsCont_time}>
                <FlareOutlinedIcon className={styles.icon} color="action" />
                <p>Afternoon</p>
              </div>
              <div className={styles.slotsCont_slots}>
                {
                  [...slots].map(item => (
                    item.type === 1 && !checkIsBooked(bookedSlots, item, value)
                    && <Button variant="outlined" className={classes.slotItem} key={item.time} value={item.time} color="primary" onClick={() => handleBookSlot(item.time)} disabled={
                      value === 0 ? compareTime(item.time) ? true : false : false
                    }>{item.timeStr}</Button>
                  ))
                }
              </div>
            </Box>
            <Divider />
            <Box className={classes.slotsCont}>
              <div className={styles.slotsCont_time}>
                <Brightness2OutlinedIcon className={styles.icon} color="action" />
                <p>Evening</p>
              </div>
              <div className={styles.slotsCont_slots}>
                {
                  [...slots].map(item => (
                    item.type === 2 && !checkIsBooked(bookedSlots, item, value)
                    && <Button variant="outlined" className={classes.slotItem} key={item.time} value={item.time} color="primary" onClick={() => handleBookSlot(item.time)} disabled={
                      value === 0 ? compareTime(item.time) ? true : false : false
                    }>{item.timeStr}</Button>
                  ))
                }
              </div>
            </Box>
            <Divider />
            <Box className={classes.slotsCont}>
              <div className={styles.slotsCont_time}>
                <NightsStayOutlinedIcon className={styles.icon} color="action" />
                <p>Night</p>
              </div>
              <div className={styles.slotsCont_slots}>
                {
                  slots.map(item => (
                    // console.log(Number(date.substring(11, 13)+ date.substring(15, 16)), Number(item.time.substring(0, 2) + item.time.substring(3, 4)))
                    item.type === 3 && !checkIsBooked(bookedSlots, item, value)
                    && <Button variant="outlined" className={classes.slotItem} key={item.time} value={item.time} color="primary" onClick={() => handleBookSlot(item.time)} disabled={
                      value === 0 ? compareTime(item.time) ? true : false : false
                    }>{item.timeStr}</Button>
                  ))
                }
              </div>
            </Box>
          </TabPanel>
        ))
      }
    </div>
  );
}
export { BookingCard }

