import React, { useEffect, useContext, useState } from 'react';
import DatePicker from "react-multi-date-picker";
import Icon from "react-multi-date-picker/components/icon";
import './BookAppointment.scss';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../../App';
import { ButtonData } from '../../Doctor/Profile/TimeAndChart/ButtonData';
import axios from 'axios';
import { SubmitAppointment } from '../../HelperFunction/SubmitAppointment';

export const BookAppointment = () => {
  const navigate = useNavigate();
  const [error, SetError] = useState("* All fields are required");
  const { userLoginData, setUserLoginData } = useContext(userContext);
  const [dateFlag, setDateFlag] = useState(false);
  const [doctorFlag, setDoctorFlag] = useState(false);
  const [doctorData, setDoctorData] = useState([]);
  const [timingSlot, setTimingSlot] = useState(ButtonData);
  const [date, setDateHook] = useState(new Date());
  const [category, setCategory] = useState("");
  const [userData, setUserData] = useState({});

  const getSpecialisation = async () => {
    try {
      const backendResponse = await axios.get("http://localhost:8080/getSpecialisation", {
        headers: { Authorization: sessionStorage.getItem("AccessToken") }
      });
      setDoctorData(backendResponse.data.data);
    }
    catch (error) {
      SetError(error.response.data || error.message);
      console.log(error.response.data || error.message);
    }
  }

  const setSpeciality = async () => {
    try {
      setDoctorFlag(true);
      const backendResponse = await axios.post("http://localhost:8080/getTime", { date: date, id: category }, {
        headers: { Authorization: sessionStorage.getItem("AccessToken") }
      });
      if (backendResponse.data.timeData) {
        const Time = ButtonData.filter((item) => {
          return !backendResponse.data.timeData.includes(item);
        });
        setTimingSlot(Time);
      }
      else if (backendResponse.EmptyArray) {
        setTimingSlot(ButtonData);
      }
    }
    catch (error) {
      console.log(`set speciallity function error ${error.response.data || error.message}`);
    }
  }

  useEffect(() => {
    setSpeciality();
  }, [date, category]);

  useEffect(() => {   
    getSpecialisation();
  }, []);

  useEffect(() => {
    userLoginData.IsLogin ? navigate("/user/bookAppointment") : navigate("/login");
  }, [userLoginData.IsLogin]);

  const setDate = (event) => {
    setDateFlag(true);
    setDateHook(new Date(event));
  }

  const handleOnChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  }

  const submitForm = async () => {
      try{
        const reponse = await SubmitAppointment({...userData, date : date , doctorId : category});
        if(reponse.data){
          navigate("/user/appointment");
        }
        else{
          SetError(reponse.error);
        }
      }
      catch(err){
        console.log("Error in the frontend while Booking form");
      }
  }

  const getDate = () => {
    const today = new Date().toISOString().split("T")[0];
    const selectedDate = new Date(date).toISOString().split("T")[0];
    return today === selectedDate ? "Select The Date" : selectedDate;
  }

  return (
    <div className='bookAppointmentDiv'>
      <div className='fillText'>Book your</div>
      <div className='bookAppointmentText'>Appointment Now !!</div>
      <div className='bookAppointmentForm'>
        <input name='firstname' type='text' placeholder='First Name' onChange={handleOnChange} className="appointmentInput" autoComplete='off' />
        <input name='lastname' type='text' placeholder='Last Name' onChange={handleOnChange} className="appointmentInput" autoComplete='off' />
        <input name='age' type='text' placeholder='Age' onChange={handleOnChange} className="appointmentInput" autoComplete='off' />
        <input name='weight' type='text' placeholder='Weight' onChange={handleOnChange} className="appointmentInput" autoComplete='off' />
        <select name='gender' className="appointmentInput appointmentSelectInput" onChange={handleOnChange} autoComplete='off'>
          <option selected disabled>Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Not to Disclose</option>
        </select>
        <input name='address' type='text' placeholder='Address' className="appointmentInput" onChange={handleOnChange} autoComplete='off' />
        <input name='contact' type='text' placeholder='Contact' className="appointmentInput" onChange={handleOnChange} autoComplete='off' />
        <div className='selectDateDiv'>
          <div>{getDate()}</div>
          <div><DatePicker onChange={setDate} render={<Icon />} /></div>
        </div>
        <select onChange={(event) => {
          const index = event.target.selectedIndex;
          const children = event.target.children.item(index);
          setCategory(() => children.getAttribute("data-id"));
        }} className={dateFlag ? "appointmentInput appointmentSelectInput" : "appointmentInput appointmentSelectInput disabled"} autoComplete='off'>
          <option selected disabled >Speciality</option>
          {
            doctorData.map((item) => {
              return (
                <option key={item._id} data-id={item._id}>{item.speciallisation}</option>
              )
            })
          }
        </select>
        <select name='time' onChange={handleOnChange} className={dateFlag && doctorFlag ? "appointmentInput appointmentSelectInput" : "appointmentInput appointmentSelectInput disabled"} autoComplete='off'>
          <option selected disabled>Timing Slot</option>
          {
            timingSlot ? timingSlot.map((item, index) => {
              return (
                <option key={index}>{item}</option>
              )
            }) : <option>There is No Slot available</option>
          }
        </select>
        <button className='bookButton' onClick={submitForm}>Book</button>
        <div className='errorDiv'>{error}</div>
      </div>
    </div>
  )
}
