import React, { useState, useContext, useEffect } from 'react';
import './Profile.scss';
import { Sidebar } from '../Sidebar/Sidebar';
import { ToggleButton } from '../../OuterComponents/Header/ToggleButton/ToggleButton';
import { TimeAndChart } from './TimeAndChart/TimeAndChart';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../../App';
import { PatientInitialValues } from './PatientInitialValues';
import { GetDoctorProfile } from '../../HelperFunction/GetDoctorProfile';
import { UpdateDoctor } from '../../HelperFunction/UpdateDoctor';
import { DeleteDoctor } from '../../HelperFunction/DeleteDoctor';
export const Profile = () => {
  const [disabled, setDisabled] = useState(true);
  const [formData, setFormData] = useState( {PatientInitialValues});
  const [error, SetError] = useState("* Name, Email, Speciallisation, fields are required");
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const { userLoginData, setUserLoginData } = useContext(userContext);
  const getprofile = async () => {
    try {
      const profileResponse = await GetDoctorProfile();
      if (profileResponse.profileData) {
        console.log(profileResponse.profileData);
        setFormData(profileResponse.profileData);
      }
      else{
        SetError(profileResponse.error);
        navigate('/login');
      }
    }
    catch (error) {
      console.log("Error While Getting Profile");
    }
  }
  useEffect(() => {
    userLoginData.IsLogin ? navigate("/doctor/profile") : navigate("/login");
    getprofile();
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
      setFormData({...formData,...userData});
      setUserData({});
      SetError("* Name, Email, Speciallisation, fields are required");
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
        setFormData(PatientInitialValues);
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
    <div className='profileDiv'>
      <Sidebar />
      <ToggleButton />
      <div className='profile'>
        <div className='profileText'>Profile</div>
        <div className='profileAndInfo'>
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
                <div className='uploadedPhoto'>DP</div>
              </div>
              <div className='personalDetails'>
                <input autoComplete='off' type='text' name='name' onChange={handleOnChange} placeholder={formData.name || "Name"} className={disabled ? "notDisabled profileInput nameInput" : "profileInput nameInput"} required></input>
                <input autoComplete='off' type='number' name='age' onChange={handleOnChange} placeholder={formData.age || "Age"} className={disabled ? "notDisabled profileInput ageInput" : "profileInput ageInput"}></input>
                <select name='gender' onChange={handleOnChange} className={disabled ? "notDisabled profileInput profileSelectInput" : "profileInput profileSelectInput"}>
                  <option selected disabled hidden>{formData.gender || "Gender"}</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Not Disclose</option>
                </select>
                <input autoComplete='off' type='text' name='email' onChange={handleOnChange} placeholder={formData.email || "Email"} className={disabled ? "notDisabled profileInput" : "profileInput"} required></input>
                <input autoComplete='off' type='text' name='contact' onChange={handleOnChange} placeholder={formData.contact || "Contact"} className={disabled ? "notDisabled profileInput" : "profileInput"} style={{ width: "44%" }}></input>
              </div>
              <div className='professionalDetails'>
                <div className='professionalText'>Professional Information</div>
                <div className='professionalContentDetails'>
                  <textarea type='text' name='bio' onChange={handleOnChange} placeholder={formData.bio || "Bio"} className={disabled ? "notDisabled professionalInput bioInput" : "professionalInput bioInput"}></textarea>
                  <input autoComplete='off' type='text' name='degree' onChange={handleOnChange} placeholder={formData.degree || "Degree"} className={disabled ? "notDisabled professionalInput" : "professionalInput"}></input>
                  <input autoComplete='off' type='text' name='speciallisation' onChange={handleOnChange} placeholder={formData.speciallisation || "Speciallisation "} className={disabled ? "notDisabled professionalInput" : "professionalInput"} required></input>
                  <input autoComplete='off' type='text' name="experience" onChange={handleOnChange} placeholder={formData.experience || "Experience"} className={disabled ? "notDisabled professionalInput" : "professionalInput"}></input>
                  <input autoComplete='off' type='text' name='address' onChange={handleOnChange} placeholder={formData.address || "Address"} className={disabled ? "notDisabled professionalInput" : "professionalInput"}></input>
                  <input autoComplete='off' type='text' name='location' onChange={handleOnChange} placeholder={formData.location || "location"} className={disabled ? "notDisabled professionalInput" : "professionalInput"} style={{ width: "100%" }}></input>
                </div>
              </div>
              <div className='errorDiv'>{error}</div>
            </div>
          </div>
          <div className='timeAndChart'>
            <TimeAndChart />
          </div>
        </div>
      </div>
    </div>
  )
}
