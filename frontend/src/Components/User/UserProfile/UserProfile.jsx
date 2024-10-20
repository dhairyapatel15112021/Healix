import React, { useState,useEffect, useContext} from 'react';
import './UserProfile.scss';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../../App';
import { ProfileInitialValues } from './ProfileInitialValues';
import { GetDoctorProfile } from '../../HelperFunction/GetDoctorProfile';
import { UpdateDoctor } from '../../HelperFunction/UpdateDoctor';
import { DeleteDoctor } from '../../HelperFunction/DeleteDoctor';
import { GetUserName } from '../../HelperFunction/GetUserName';

export const UserProfile = () => {

  const navigate = useNavigate();
  const {userLoginData, setUserLoginData} = useContext(userContext);
  const [disabled, setDisabled] = useState(true);
  const [passwordDisabled, setPasswordDisabled] = useState(true);
  const [formData, setFormData] = useState(ProfileInitialValues);
  const [error, SetError] = useState("* Email field are required");
  const [userData, setUserData] = useState({});

  const getprofile = async () => {
    try {
      const profileResponse = await GetDoctorProfile();
      if (profileResponse.profileData) {
        setFormData({...formData , ...profileResponse.profileData});
      }
      else{
        SetError(profileResponse.error);
        navigate('/login');
      }
    }
    catch (error) {
      console.log("Error While Getting Profile");
      navigate('/login');
    }
  }

  useEffect(() => {
    userLoginData.IsLogin ? navigate("/user/profile") : navigate("/login");
    userLoginData.IsLogin && getprofile();
  }, [userLoginData.IsLogin,disabled]);

  const handleOnChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  }

  const HandleOnUpdate = async () => {
    try {
      if (disabled) {
        return;
      }
      const updateResponse = await UpdateDoctor(userData);
      if (updateResponse.successUpdate) {
        setDisabled(true);
        setPasswordDisabled(true);
        setFormData({...formData,...userData});
        setUserData({});
        SetError("* Email, field are required");
        alert("Update Succesfully");      
        return;
      }
      SetError(updateResponse.error);
    }
    catch (err) {
      console.log(`error while Update The Doctor ${err}`);
    }
  }

  const HandleOnDelete = async () => {
    try {
      const deleteResponse = await DeleteDoctor();
      if(deleteResponse.deleteSuccess){
        setFormData(ProfileInitialValues);
        setUserData({});
        navigate("/");
        setUserLoginData({})
        alert("Delete Succesfully");
      }
      else if (deleteResponse.error) {
        SetError(deleteResponse.error);
      }
      else{
        alert("Not LogOut");
      }
    }
    catch (err) {
      console.log("error while Delete User");
    }
  }

  return (
        <div className='UserProfileDiv'>
          <div className='profileAndButtonDiv'>
            <div className='buttonsDiv'>
              <button className='editButton profileButton' onClick={() => setDisabled(false)}>
                <div>Edit</div>
                <div><i className="fa-solid fa-pen"></i></div>
              </button>
              <button className='profileButton editButton' onClick={HandleOnUpdate}>
                <div>Update</div>
                <div><i className="fa-solid fa-arrows-rotate"></i></div>
              </button>
              <button className='profileButton editButton' onClick={HandleOnDelete}>
                <div>Delete</div>
                <div><i className="fa-solid fa-trash"></i></div>
              </button>
            </div>
            <div className="profileContentDiv">
              <div className='personalAndPhoto'>
                <div className='personalText'>Personal Information</div>
                <div className='uploadedPhoto'>{(formData.name && GetUserName(formData.name))||"U"}</div>
              </div>
              <div className='personalDetails'>
                <input name='name' autoComplete='off' type='text' onChange={handleOnChange} placeholder={formData.name || "Name"} className={disabled ? "notDisabled profileInput nameInput" : "profileInput"}></input>
                <input name='age' autoComplete='off' type='text' onChange={handleOnChange} placeholder={formData.age || "Age"} className={disabled ? "notDisabled profileInput ageInput" : "profileInput ageInput"}></input>
                <input name='contact' autoComplete='off' type='text' onChange={handleOnChange} placeholder={formData.contact || "Contact"} className={disabled ? "notDisabled profileInput contactInput" : "profileInput contactInput"}></input>
                <select value={formData.gender} name='gender' onChange={handleOnChange} className={disabled ? "notDisabled profileInput" : "profileInput"}>
                  <option value="DEFAULT" disabled>Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Not Disclose">Not Disclose</option>
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
