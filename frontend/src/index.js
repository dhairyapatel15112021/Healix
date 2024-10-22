import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { Home } from './Components/OuterComponents/Home/Home';
import { About } from './Components/OuterComponents/About/About';
import { Contact } from './Components/OuterComponents/Contact/Contact';
import { LogIn } from './Components/OuterComponents/LogIn/LogIn';
import { SignUp } from './Components/OuterComponents/SignUp/SignUp';
import { Dashboard } from './Components/Doctor/Dashboard/Dashboard';
import { Blogs } from './Components/OuterComponents/Blogs/Blogs';
import { Appointment } from './Components/Doctor/Appointment/Appointment';
import { Patient } from './Components/Doctor/Patient/Patient';
import { Blog } from './Components/Doctor/Blog/Blog';
import { Profile } from './Components/Doctor/Profile/Profile';
import { UserProfile } from './Components/User/UserProfile/UserProfile';
import { YourAppointment } from './Components/User/YourAppointment/YourAppointment';
import { BookAppointment } from './Components/User/BookAppointment/BookAppointment';

const root = ReactDOM.createRoot(document.getElementById('root'));
const ourRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' element={<Home />} />
      <Route path='about' element={<About />} />
      <Route path='contact' element={<Contact />} />
      <Route path='blogs' element={<Blogs />} />
      <Route path='login' element={<LogIn />} />
      <Route path='signup' element={<SignUp />} />
      <Route path='doctor/dashboard' element={<Dashboard />} />
      <Route path='doctor/appointment' element={<Appointment />} />
      <Route path='doctor/patient' element={<Patient />} />
      <Route path='doctor/blog' element={<Blog />} />
      <Route path='doctor/profile' element={<Profile />} />
      <Route path='user/profile' element={<UserProfile/>}/>
      <Route path='user/appointment' element={<YourAppointment/>}/>
      <Route path='user/bookAppointment' element={<BookAppointment/>}/>
    </Route>
  )
)
root.render(
  // <React.StrictMode>
    <RouterProvider router={ourRouter} />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
