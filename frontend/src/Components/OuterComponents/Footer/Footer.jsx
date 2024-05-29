import React from 'react';
import './Footer.scss';
export const Footer = () => {
  return (
    <div className='footer'>
      <ul className='socialMediaLinks'>
        <li className='socialMediaDiv'><i className="fa-brands fa-facebook-f facebookIcon"></i></li>
        <li className='socialMediaDiv'><i className="fa-brands fa-instagram socialMediaIcon"></i></li>
        <li className='socialMediaDiv'><i className="fa-brands fa-linkedin-in socialMediaIcon"></i></li>
        <li className='socialMediaDiv'><i className="fa-brands fa-x-twitter socialMediaIcon"></i></li>
        <li className='socialMediaDiv'><i className="fa-brands fa-threads socialMediaIcon"></i></li>
      </ul>
      <div className='rightsReserved'>
        <span>&#169;</span>2024 Healix | All Rights Reserved
      </div>
    </div>
  )
}
