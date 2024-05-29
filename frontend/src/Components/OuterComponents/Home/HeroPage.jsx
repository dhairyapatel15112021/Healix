import React, { useContext } from 'react'
import './HeroPage.scss'
import { useWidth } from '../../Hooks/useWidth'
import { userContext } from '../../../App';
import { useNavigate } from 'react-router-dom';
export const HeroPage = () => {
  const navigate = useNavigate();
  const [isMobile] = useWidth();
  const {userLoginData, setUserLoginData} = useContext(userContext);
  const bookAppointment = ()=>{
    if (userLoginData.IsLogin && !(userLoginData.IsDoctor)){
      navigate("/user/appointment");
    }
    else if(!userLoginData.IsLogin){
      navigate("/login");
    }
  }
  return (
    <div className='heroPage'>
      <div className="textContent">
        <div className='heading'>Effortless Doctor <span className='appointmentHeading'>Appointments</span> with a tap
          {/* icon of tap something like that? */}</div>
        <div className='description'>
          <div className='descriptionContent'>At Healix, access top medical professionals, gain insights, and connect seamlessly. Explore our range for personalized care and wellness support</div>
          <button className='appointmentButton' onClick={bookAppointment}>
            <div className='circleButton'><i className="fa-solid fa-right-long circleButtonIcon"></i></div>
            <div className='buttonContent'>Book Appointment</div></button>
        </div>
      </div>
      {!isMobile && <div className="imageContent"></div>}
    </div>
  )
}
