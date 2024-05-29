import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Header.scss';
import { ToggleButton } from './ToggleButton/ToggleButton';
import { useWidth } from '../../Hooks/useWidth';
import { useUser } from '../../Hooks/useUser';
import { CheckLogout } from '../../HelperFunction/CheckLogout';
import { userContext } from '../../../App';

export const Header = () => {
  const navigate = useNavigate();
  const { userLoginData, setUserLoginData } = useContext(userContext);
  const [isMobile] = useWidth();
  const [user] = useUser();
  const logoutUser = async () => {
    try {
      const checkLogOutResponse = await CheckLogout();
      if (checkLogOutResponse.logoutSuccess) {
        setUserLoginData({ Email: "", UserId: "", IsDoctor: false, IsLogin: false });
        navigate("/");
      }
      else {
        alert("Not Logout " + checkLogOutResponse.error);
      }
    }
    catch (err) {
      alert("Error While Logout");
    }
  }
  return (
    <div className='header'>
      <div className='logo'></div>
      <ul className='navbar' style={{ width: isMobile ? "50vw" : "35vw" }}>
        <div className='line start'></div>
        <li><NavLink to="/"
          className={({ isActive }) => `${isActive ? "active" : ""} link`}>
          {isMobile ? <i className="fa-solid fa-house"></i> : "Home"} </NavLink>
        </li>
        <li>
          {
            user ?
              <NavLink to="/user/bookAppointment"
                className={({ isActive }) => `${isActive ? "active" : ""} link`}>
                {isMobile ? <i className="fa-solid fa-calendar-days"></i> : "Book"}</NavLink>
              :
              <NavLink to="/about"
                className={({ isActive }) => `${isActive ? "active" : ""} link`}>
                {isMobile ? <i className="fa-solid fa-circle-info"></i> : "About Us"}</NavLink>
          }
        </li>
        <li>
          {
            user ?
              <NavLink to="/user/appointment"
                className={({ isActive }) => `${isActive ? "active" : ""} link`}>
                {isMobile ? <i className="fa-solid fa-calendar-check"></i> : "Appointments"}</NavLink>
              :
              <NavLink to="/contact"
                className={({ isActive }) => `${isActive ? "active" : ""} link`}>
                {isMobile ? <i className="fa-solid fa-message"></i> : "Contact Us"}</NavLink>
          }

        </li>
        <li>
          {
            user ?
              <NavLink to="/user/profile"
                className={({ isActive }) => `${isActive ? "active" : ""} link`}>
                {isMobile ? <i className="fa-solid fa-newspaper"></i> : "Profile"}</NavLink>
              :
              <NavLink to="/blogs"
                className={({ isActive }) => `${isActive ? "active" : ""} link`}>
                {isMobile ? <i className="fa-solid fa-newspaper"></i> : "Blog"}</NavLink>
          }
        </li>
        <li className='logIn'>
          {
            user ?
              <div className="logInLink" onClick={logoutUser}>Log Out</div>
              :
              <Link to="/login" className="logInLink">Log In</Link>
          }
        </li>
        <div className='line end'></div>
      </ul>
      <div className='darkLightMode'><ToggleButton />
      </div>
    </div>
  )
}
