import React from 'react';
import './Contact.scss';
import { NavLink } from 'react-router-dom';

export const Contact = () => {
  return (
    <div className='contact'>
      <div className='getInTouch'>Get In Touch</div>
      <div className='contactContent'>
        <div className='specialWordsDiv'>Have <span className='specialWords'>Questions, Feedback, or Suggestions?</span></div>
        <div className='contentParagraph'>We're here to help! Reach out to us using the contact information below or fill out the form, and we'll get back to you as soon as possible.</div>
      </div>
      <div className='informationAndForm'>
        <div className='information'>
          <div className='informationDiv'>
            <i className="fa-solid fa-phone icon"></i>
            <div className='informationContent'>+91-7984562046</div>
          </div>
          <div className='informationDiv'>
            <i class="fa-solid fa-envelope icon"></i>
            <div className='informationContent'>healixpvtltd@gmail.com</div>
          </div>
          <div className='informationDiv'>
            <i class="fa-solid fa-clock icon"></i>
            <div className='informationContent'>Mon-Sun:9:00AM - 6:00PM </div>
          </div>
          <div className='informationDiv'>
            <i class="fa-solid fa-location-dot icon"></i>
            <div className='informationContent'>Vastral,Ahmedabad</div>
          </div>
          <button><NavLink to="https://maps.app.goo.gl/HvnfScbbMKyzprs27" target='blank' className="link">Go to map</NavLink></button>
          <div className='thankYouNote'>Thank you for choosing <span className='specialWords'>Healix</span> as your partner in prioritizing your health. We look forward to being a part of your wellness journey.</div>
        </div>
        <div className='form'>
          <div className='fillText'>Fill the form to</div>
          <div className='contactDirectly'>contact us Directly</div>
          <input type='text' placeholder='Full Name' className='input'></input>
          <input type='text' placeholder='Phone' className='input'></input>
          <input type='text' placeholder='Email Address' className='input'></input>
          <textarea placeholder='Message' className='input'></textarea>
          <button type='submit' className='submitButton'>Send Message</button>
        </div>
      </div>
    </div>
  )
}
