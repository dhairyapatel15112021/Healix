import React, { useContext } from 'react';
import './Sidebar.scss';
import { IconData } from './IconData';
import { useWidth } from '../../Hooks/useWidth';
import { NavLink,useNavigate  } from 'react-router-dom';
import { CheckLogout } from '../../HelperFunction/CheckLogout';
import { toggleContext } from '../../../App';
import { userContext } from '../../../App';
export const Sidebar = () => {
    const navigate = useNavigate();
    const { userLoginData, setUserLoginData } = useContext(userContext);
    const {isOpen,setIsopen} = useContext(toggleContext);
    const [isMobile] = useWidth();
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
        <div style={{ width:  isMobile? "12vw" : (isOpen? "17vw" :"4vw" ) }} className='sidebarDiv'>
            <div className='sidebar'>
                <div className='healixAndIcon'>
                    <div className='healix' style={{ display: isOpen * !isMobile ? "block" : "none" }}>Healix</div>
                    <div className={!isOpen * !isMobile? "bars highWidth" : "bars"}>
                        <i className={isOpen * !isMobile ? "fa-solid fa-angles-left" : "fa-solid fa-angles-right"} onClick={()=>setIsopen(!isOpen)}></i>
                    </div>
                </div>
                <div className='sidebarLinkDiv'>
                    {
                        IconData.map((item, index) => {
                            return (
                                <NavLink to={item.path} key={index} className="sidebarItems"
                                    style={{marginLeft : !isOpen * !isMobile ? "":"10%" }}>
                                    <div className={!isOpen * !isMobile? "sidebarIcon highWidth" : "sidebarIcon"}>{item.icon}</div>
                                    <div className='sidebarText' style={{ display: isOpen * !isMobile ? "block" : "none" }}>
                                        {item.name}
                                    </div>
                                </NavLink>
                            )
                        })
                    }
                </div>
                <div onClick={logoutUser} className='logoutDiv' style={{marginLeft : !isOpen * !isMobile ? "":"10%" }}>
                    <div className={!isOpen * !isMobile? "sidebarIcon highWidth" : "sidebarIcon"}>
                        <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    </div>
                    <div className='sidebarText' style={{ display: isOpen * !isMobile ? "block" : "none" }}>
                        Logout
                    </div>
                </div>
            </div>
        </div>
    )
}
