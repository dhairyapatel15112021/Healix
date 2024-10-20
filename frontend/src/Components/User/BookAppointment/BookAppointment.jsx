import React, { useEffect, useContext, useState } from 'react';
import DatePicker from "react-multi-date-picker";
import Icon from "react-multi-date-picker/components/icon";
import './BookAppointment.scss';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../../App';
import { ButtonData } from '../../Doctor/Profile/TimeAndChart/ButtonData';
import axios from 'axios';
export const BookAppointment = () => {
  const navigate = useNavigate();
  const [error, SetError] = useState("* All fields are required");
  const { userLoginData, setUserLoginData } = useContext(userContext);
  const [dateFlag, setDateFlag] = useState(false);
  const [doctorFlag, setDoctorFlag] = useState(false);
  const [doctorData, setDoctorData] = useState([]);
  const [timingSlot,setTimingSlot] = useState(ButtonData);
  const [date,setDateHook] = useState(new Date());
  const [category,setCategory] = useState("");
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const getSpecialisation = async () => {
      try {
        const backendResponse = await axios.get("http://localhost:8080/getSpecialisation",{
          headers : {Authorization : sessionStorage.getItem("AccessToken")}
        });
        setDoctorData(backendResponse.data.data);
      }
      catch (error) {
        console.log(error.response.data || error.message);
      }
    }
    getSpecialisation();
  }, []);
  const setDate = (event) => {
    setDateFlag(true);
    setDateHook(new Date(event));
  }
  useEffect(()=>{
    const setSpeciality = async() => {
      try {
        setDoctorFlag(true);
        const backendResponse = await axios.post("http://localhost:8080/getTime",{date : date , id : category},{
          headers : {Authorization : sessionStorage.getItem("AccessToken")}
        });
        if (backendResponse.data.timeData){
          const Time = ButtonData.filter((item)=>{
            return !backendResponse.data.timeData.includes(item);
          });
          setTimingSlot(Time);
        }
        else if (backendResponse.EmptyArray){
          setTimingSlot(ButtonData);
        }
      }
      catch (error) {
        console.log(error.response.data || error.message);
      }
    }
    setSpeciality();
  },[date,category]);
  
  useEffect(() => {
    userLoginData.IsLogin ? navigate("/user/bookAppointment") : navigate("/login");
  }, [userLoginData.IsLogin]);
  const handleOnChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  }
  return (
    <div className='bookAppointmentDiv'>
      <div className='fillText'>Book your</div>
      <div className='bookAppointmentText'>Appointment Now !!</div>
      <form className='bookAppointmentForm' autoComplete='off'>
        <input name='firstname' type='text' placeholder='First Name' onChange={handleOnChange} className="appointmentInput" />
        <input name='lastname' type='text' placeholder='Last Name' onChange={handleOnChange} className="appointmentInput" />
        <input name='age' type='text' placeholder='Age' onChange={handleOnChange} className="appointmentInput" />
        <input name='weight' type='text' placeholder='Weight' onChange={handleOnChange} className="appointmentInput" />
        <select name='gender' className="appointmentInput appointmentSelectInput" onChange={handleOnChange}>
          <option selected disabled hidden>Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Not to Disclose</option>
        </select>
        <input name='address' type='text' placeholder='Address' className="appointmentInput" onChange={handleOnChange}/>
        <input name='contact' type='text' placeholder='Contact' className="appointmentInput" onChange={handleOnChange}/>
        <div className='selectDateDiv'>
          <div>Select The Date</div>
          <div><DatePicker onChange={setDate} render={<Icon/>} /></div>
        </div>
        <select onChange={(event)=>{ 
          const index = event.target.selectedIndex;
          const children = event.target.children.item(index);
            setCategory(()=>children.getAttribute("data-id")) }} className={dateFlag ? "appointmentInput appointmentSelectInput" : "appointmentInput appointmentSelectInput disabled"}>
          <option selected disabled hidden>Speciality</option>
          {
            doctorData.map((item) => {
              return (
                <option key={item._id} data-id={item._id}>{item.speciallisation}</option>
              )
            })
          }
        </select>
        <select name='time' onChange={handleOnChange} className={dateFlag && doctorFlag ? "appointmentInput appointmentSelectInput" : "appointmentInput appointmentSelectInput disabled"}>
          <option selected disabled hidden>Timing Slot</option>
          {
            timingSlot ? timingSlot.map((item, index) => {
              return (
                <option key={index}>{item}</option>
              )
            }) : <option>There is No Slot available</option>
          }
        </select>
        <button className='bookButton' onClick={async ()=>{
          try{
            const backendResponse = await axios.post("http://localhost:8080/bookAppointment",{...userData , date : date , doctorId : category},{
              headers : {Authorization : sessionStorage.getItem("AccessToken")}
            });
            console.log(backendResponse.data.appointment);
          }
          catch(err){
            console.log(err.response.data || err.message);
          }
        }}>Book</button>
        <div className='errorDiv'>{error}</div>
      </form>
    </div>
  )
}
