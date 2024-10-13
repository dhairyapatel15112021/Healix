import React, { useContext, useEffect, useState } from 'react';
import './LogIn.scss';
import { Link, useNavigate } from 'react-router-dom';
import { CheckLogIn } from '../../HelperFunction/CheckLogIn';
import { userContext } from '../../../App';
export const LogIn = () => {
    const navigate = useNavigate();
    const { userLoginData, setUserLoginData } = useContext(userContext);
    const [error, SetError] = useState("* All fields are required");
    const [userData, setUserData] = useState({});
    const [isChecked, setIsChecked] = useState(false);
    useEffect(() => {
        if (userLoginData.IsLogin && userLoginData.IsDoctor) {
            navigate("/doctor/dashboard");
        }
        else if (userLoginData.IsLogin && !userLoginData.IsDoctor) {
            navigate("/user/profile");
        }
    }, [userLoginData.IsLogin]);

    const handleOnChange = (event) => {
        setUserData({ ...userData, [event.target.name]: event.target.value });
    }
    const HandleOnSubmit = async (event) => {
        try {
            event.preventDefault();
            const checkLogInResponse = await CheckLogIn({ ...userData, IsChecked: isChecked });
            if (checkLogInResponse.error) {
                SetError(checkLogInResponse.error);
                return;
            }
            setUserLoginData({ IsLogin: true, IsDoctor: checkLogInResponse.IsDoctor, Name: checkLogInResponse.Name, UserId: checkLogInResponse.UserId });
            if (isChecked) {
                navigate("/doctor/dashboard");
            }
            else {
                navigate("/user/appointment");
            }
        }
        catch (err) {
            console.log(err);
            console.log("error while lognin");
        }
    }
    return (
        <div className='logInFormDiv'>
            <form onSubmit={HandleOnSubmit} autoComplete="off" className='logInForm'>
                <div className='welcomeText'>Welcome</div>
                <div className='memberLogin'>Member Login</div>
                <input name='Email' onChange={handleOnChange} type='text' placeholder='Email' className='loginInput' required></input>
                <input name='Password' onChange={handleOnChange} type='password' placeholder='Password' className='loginInput' required></input>
                <div className='checkboxDiv'>
                    <input name='DoctorCheckbox' onChange={(event) => setIsChecked(event.target.checked)} type='Checkbox' className='loginInput checkboxInput'></input>
                    <div className='checkboxText'>Doctor?</div>
                </div>
                <div className='signUpCheck'>
                    <div>New To Our Website?</div>
                    <div className='signUpLinkDiv'> <Link to="/signup" className='signUpLink'>SignUp</Link></div>
                </div>
                <div className='errorDiv'>{error}</div>
                <button type='submit' className='loginButton'>LOGIN</button>
            </form>
        </div>
    )
}
