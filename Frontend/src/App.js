import './App.css';
import { Routes } from './Routes/Routes';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from 'react';


function App() {

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [user, setUser] = useState(() => {
    if(userInfo == null){
      return ""
    }
    else{
      if("healthID" in userInfo){
        return "Patient"
      }
      else
        return "Doctor"
    }
  });
  const [prescriptionID, setPrescriptionID] = useState("");
  const [toastShow, setToastShow] = useState(false);
  const [toastCondition, settoastCondition] = useState({
    status: "",
    message: "",
  });
  if (toastShow) {
    if (toastCondition.status === "success") {
      toast.success(toastCondition.message);
    } else if (toastCondition.status === "error") {
      toast.error(toastCondition.message);
    } else if (toastCondition.status === "warning") {
      toast.warn(toastCondition.message);
    } else if (toastCondition.status == "info") {
      toast.info(toastCondition.message);
    }
    settoastCondition({
      status: "",
      message: "",
    });
    setToastShow(false);
  }
  return (
    <div className="container">
      <Routes settoastCondition={settoastCondition} setToastShow={setToastShow} setUser = {setUser} user = {user}/>
      <ToastContainer/>
    </div>
  );
}

export default App;
