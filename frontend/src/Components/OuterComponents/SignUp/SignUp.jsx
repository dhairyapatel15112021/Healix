import React, { useState } from 'react';
import './SignUp.scss';
import { Link, useNavigate } from 'react-router-dom';
import { CheckSignUp } from '../../HelperFunction/CheckSignUp';
export const SignUp = () => {
    const navigate = useNavigate();
    const [error, SetError] = useState("* All fields are required");
    const [userData, setUserData] = useState({});
    const handleOnChange = (event) => {
        setUserData({...userData,[event.target.name]:event.target.value});
    }
    const HandleOnSubmit = async (event) => {
        try {
            event.preventDefault();
            const ErrorMessage = await CheckSignUp(userData);
            if (ErrorMessage) {
                SetError(ErrorMessage);
            }
            else {
                setUserData({});
                navigate("/login");
            }
        } catch (error) {
            SetError('An error occurred during sign up');
        }
    }
    return (
        <div className='signUpFormDiv'>
            <form onSubmit={HandleOnSubmit} className='signUpForm' autoComplete='off'>
                <div className='welcomeText'>Welcome</div>
                <div className='createAccountText'>Create a new account</div>
                <div className='inputDiv'>
                    <input type='text' name='Name' placeholder='Name' onChange={handleOnChange} className='signUpInput' required></input>
                    <select defaultValue="DEFAULT" name='Gender' className='signUpInput signUpSelectInput' onChange={handleOnChange} required>  
                        <option value="DEFAULT" disabled className='signUpInput'>Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Not Disclose</option>
                    </select>
                    <input name='Email' type='text' placeholder='Email' className='signUpInput' onChange={handleOnChange} required></input>
                    <input name='Password' type='password' placeholder='Password' className='signUpInput' onChange={handleOnChange} required></input>
                    <input name='ConfirmPassword' type='password' placeholder='Confirm Password' onChange={handleOnChange} className='signUpInput confirmPassword' required></input>
                    <div className='error'>{error}</div>
                </div>
                <div className='logInCheck'>
                    <div>Already User?</div>
                    <div className='logInLinkDiv'> <Link to="/login" className='logInLink'>LogIn</Link></div>
                </div>
                <button type='submit' className='signUpButton'>SIGNUP</button>
            </form>
        </div>
    )
}
