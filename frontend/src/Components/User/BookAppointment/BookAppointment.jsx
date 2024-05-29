import React, { useEffect, useContext, useState } from 'react';
import DatePicker from "react-multi-date-picker";
import Icon from "react-multi-date-picker/components/icon";
import './BookAppointment.scss';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../../App';
import { ButtonData } from '../../Doctor/Profile/TimeAndChart/ButtonData';
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
        const backendResponse = await fetch("http://localhost:8080/getSpecialisation", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "authorization": sessionStorage.getItem("AccessToken"),
          },
        });
        const backendResponseData = await backendResponse.json();
        setDoctorData(backendResponseData.data);
      }
      catch (error) {
        console.log(error);
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
        const backendResponse = await fetch("http://localhost:8080/getTime", {
          method: "POST",
          body:JSON.stringify({date:date,doctorCategory:category}),
          headers: {
            "Content-Type": "application/json",
            "authorization": sessionStorage.getItem("AccessToken"),
          },
        });
        const backendResponseData = await backendResponse.json();
        if (backendResponseData.timeData){
          const Time = ButtonData.filter((item,index)=>{
            return !backendResponseData.timeData.includes(item);
          });
          setTimingSlot(Time);
        }
        else if (backendResponseData.EmptyArray){
          setTimingSlot(ButtonData);
        }
        else{
          SetError(backendResponseData.Error);
        }
      }
      catch (error) {
        console.log(error);
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
        <select onChange={(event)=>setCategory(event.target.value) } className={dateFlag ? "appointmentInput appointmentSelectInput" : "appointmentInput appointmentSelectInput disabled"}>
          <option selected disabled hidden>Speciality</option>
          {
            doctorData.map((item, index) => {
              return (
                <option key={index}>{item.speciallisation}</option>
              )
            })
          }
        </select>
        <select name='timingSlot' onChange={handleOnChange} className={dateFlag && doctorFlag ? "appointmentInput appointmentSelectInput" : "appointmentInput appointmentSelectInput disabled"}>
          <option selected disabled hidden>Timing Slot</option>
          {
            timingSlot ? timingSlot.map((item, index) => {
              return (
                <option key={index}>{item}</option>
              )
            }) : <option>There is No Slot available</option>
          }
        </select>
        <button className='bookButton'>Book</button>
        <div className='errorDiv'>{error}</div>
      </form>
    </div>
  )
}
