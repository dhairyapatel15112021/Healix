import React, { useEffect } from 'react';
import './ToggleButton.scss';
export const ToggleButton = () => {
  useEffect(() => {
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    const currentTheme = localStorage.getItem('theme');
    function switchTheme(e) {
      if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        toggleSwitch.checked = true;
      }
      else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        toggleSwitch.checked = false;
      }
    }
    toggleSwitch.addEventListener('change', switchTheme,false);
    switchTheme({target : {checked : (currentTheme ==="dark" ? true : false)}});
    return(()=>{
      toggleSwitch.removeEventListener('change',switchTheme,false);
    })
  }, []);
  return (
    <div className="theme-switch-wrapper">
      <label className="theme-switch" htmlFor="checkbox">
        <input type="checkbox" id="checkbox" />
        <div className="slider round"></div>
      </label>
    </div>
  )
}
