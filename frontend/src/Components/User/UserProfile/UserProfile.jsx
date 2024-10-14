import React, { useState,useEffect, useContext} from 'react';
import './UserProfile.scss';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../../App';
import { ProfileInitialValues } from './ProfileInitialValues';
import { GetDoctorProfile } from '../../HelperFunction/GetDoctorProfile';
import { UpdateDoctor } from '../../HelperFunction/UpdateDoctor';
import { DeleteDoctor } from '../../HelperFunction/DeleteDoctor';
export const UserProfile = () => {
  const navigate = useNavigate();
  const {userLoginData, setUserLoginData} = useContext(userContext);
  const [disabled, setDisabled] = useState(true);
  const [passwordDisabled, setPasswordDisabled] = useState(true);
  const [formData, setFormData] = useState( {ProfileInitialValues});
  const [error, SetError] = useState("* Email field are required");
  const [userData, setUserData] = useState({});
  const getprofile = async () => {
    try {
      const profileResponse = await GetDoctorProfile();
      if (profileResponse.profileData) {
        console.log(profileResponse.profileData);
        setFormData(profileResponse.profileData);
      }
    }
    catch (error) {
      console.log("Error While Getting Profile");
      navigate('/login');
    }
  }
  useEffect(() => {
    userLoginData.IsLogin ? getprofile() : navigate("/login");
  }, [userLoginData.IsLogin,disabled]);
  const handleOnChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  }
  const HandleOnUpdate = async () => {
    try {
      if (disabled) {
        return;
      }
      console.log(userData);
      const updateResponse = await UpdateDoctor({...formData,...userData});
      if (updateResponse.error) {
        SetError(updateResponse.error);
        return;
      }
      setDisabled(true);
      setPasswordDisabled(true);
      setFormData({...formData,...userData});
      setUserData({});
      SetError("* Email, field are required");
      alert("Update Succesfully");
    }
    catch (err) {
      console.log(err);
      console.log("error while Update The Doctor");
    }
  }
  const HandleOnDelete = async () => {
    try {
      const deleteResponse = await DeleteDoctor();
      if (deleteResponse.error) {
        SetError(deleteResponse.error);
      }
      else if(deleteResponse.deleteSuccess){
        setFormData(ProfileInitialValues);
        setUserData({});
        navigate("/");
        alert("logout Succesfully");
      } 
      else{
        alert("Not LogOut");
      }
    }
    catch (err) {
      console.log(err);
      console.log("error while Delete Doctor");
    }
  }
  return (
        <div className='UserProfileDiv'>
          <div className='profileAndButtonDiv'>
            <div className='buttonsDiv'>
              <button className='editButton profileButton' onClick={() => setDisabled(false)}>
                <div>Edit</div>
                <div><i class="fa-solid fa-pen"></i></div>
              </button>
              <button className='profileButton editButton' onClick={HandleOnUpdate}>
                <div>Update</div>
                <div><i class="fa-solid fa-arrows-rotate"></i></div>
              </button>
              <button className='profileButton editButton' onClick={HandleOnDelete}>
                <div>Delete</div>
                <div><i class="fa-solid fa-trash"></i></div>
              </button>
            </div>
            <div className="profileContentDiv">
              <div className='personalAndPhoto'>
                <div className='personalText'>Personal Information</div>
                <div className='uploadedPhoto'>DP</div>
              </div>
              <div className='personalDetails'>
                <input name='name' autoComplete='off' type='text' onChange={handleOnChange} placeholder={formData.name || "Name"} className={disabled ? "notDisabled profileInput nameInput" : "profileInput"}></input>
                <input name='age' autoComplete='off' type='text' onChange={handleOnChange} placeholder={formData.age || "Age"} className={disabled ? "notDisabled profileInput ageInput" : "profileInput ageInput"}></input>
                <input name='contact' autoComplete='off' type='text' onChange={handleOnChange} placeholder={formData.contact || "Contact"} className={disabled ? "notDisabled profileInput contactInput" : "profileInput contactInput"}></input>
                <select name='gender' onChange={handleOnChange} className={disabled ? "notDisabled profileInput" : "profileInput"}>
                  <option selected disabled hidden>Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Not Disclose</option>
                </select>
                <input name='email' autoComplete='off' type='text' onChange={handleOnChange} placeholder={formData.email || "Email"} className={disabled ? "notDisabled profileInput" : "profileInput"}></input>
                <button className={disabled ? "notDisabled changePassword" : "changePassword"} onClick={() => setPasswordDisabled(false)}>Change Password</button>
                {!passwordDisabled && <input autoComplete='off' name='password' onChange={handleOnChange} type='password' placeholder='New Password' className={disabled ? "notDisabled profileInput" : "profileInput"}></input>}
                <div className='errorDiv'>{error}</div>
              </div>
            </div>
          </div>
        </div>

  )
}
