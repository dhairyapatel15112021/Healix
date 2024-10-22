import React, { useEffect, useContext, useState } from 'react';
import './YourAppointment.scss';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../../App';
import { useWidth } from '../../Hooks/useWidth';
import DatePicker from "react-multi-date-picker";
import Icon from "react-multi-date-picker/components/icon";
import ReactPaginate from 'react-paginate';
import '../../Doctor/Pagination/Pagination.css';
import { AppointmentData } from './AppointmentData';
import axios from 'axios';

export const YourAppointment = () => {
  const [isMobile] = useWidth();
  const [totalAppointments, setTotatAppointments] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [appointments, setAppointments] = useState([]);
  const appointmentsPerPage = isMobile ? 8 : 7; // Number of items per page
  const pageCount = Math.ceil(totalAppointments / appointmentsPerPage);// Calculate the total number of pages
  const navigate = useNavigate();
  const { userLoginData, setUserLoginData } = useContext(userContext);

  const getAppointment = async () => {
    try {
      const response = await axios.get("http://localhost:8080/yourAppointment", { headers: { Authorization: sessionStorage.getItem("AccessToken") } });
      const data = response.data.appointments;
      console.log(data);
      if (!data) {
        setAppointments([]);
        return;
      }
      data.splice(9,data.length - 9);
      setAppointments(data);
    }
    catch (err) {
      console.log(`Error while fetching the appointments ${err.response.data || err.message}`);
    }
  }

  const deleteAppointment = async (id) => {
    try{
      const response = await axios.delete("http://localhost:8080/deleteAppointment",{
        headers : {Authorization : sessionStorage.getItem("AccessToken")},
        data : {id : id}
      });
      getAppointment();
    }
    catch(err){
      console.log(`err while deleting the appointment ${err.response.data || err.message}`);
    }
  }
  useEffect(() => {
    //userLoginData.IsLogin ? navigate("/user/appointment") : navigate("/login");
    !userLoginData.IsLogin && navigate("/login");
  }, [userLoginData.IsLogin]);

  useEffect(() => {
    getAppointment();
  }, []);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
    // Fetch and update data for the new page
    // You would typically have an array of items and slice it to get the current page's items.
  };
  return (
    <div className='userAppointment'>
      <div className='fillText'>Your Appointment</div>
      <div className='appointmentText'>Manage Now !!</div>
    
        {
          appointments?.length === 0 ? 
          <div style={{height :"60%" , display:"flex",justifyContent:"center",alignItems:"center"}}>
            <div>There Is No Appointment 😔</div>
            <button>Book Appointment</button>
          </div>
            :
            <div className='appointmentDiv'>
              <div className='content headerContent'>
                <div>Name</div>
                <div>Date</div>
                <div>Time</div>
                <div>Contact</div>
                <div>Info</div>
                <div>Update</div>
                <div>Delete</div>
              </div>
              {/* fnln date time contact addinfo update delete */}
              {
                appointments.map((item)=>{
                  return(
                    <div className='content' key={item._id} data-id={item._id}>
                      <div>{item.firstname} {item.lastname}</div>
                      <div>{new Date(item.date).toISOString().split("T")[0]}</div>
                      <div>{item.time}</div>
                      <div>{item.contact}</div>
                      <button></button>
                      <div><i className="fa-solid fa-pen-to-square"></i></div>
                      <div onClick={()=>deleteAppointment(item._id)}><i className="fa-solid fa-trash"></i></div>
                    </div>
                  )
                })
              }
            </div>
        }
    </div>
  )
}
{/* <div className='appointmentInfoDiv'>
          <div className='appointmentCalender'>
            <div className='DateText'>Selected dates appointement</div>
            <div className='datePdfDiv'>
              <button className='downloadPdfButton'>Download</button>
              <div><div><DatePicker render={<Icon />} /></div></div>
            </div>
          </div>
          {
            totalAppointments === 0 ?
              <div className='noAppointment'>There Is No Appointments for the dates 😔</div> :
              <div className='appointmentContent'>
                <div className='darkText heightWidth'>Sr. No</div>
                <div className='darkText heightWidth'>Name</div>
                <div className='darkText heightWidth'>Date</div>
                <div className='darkText heightWidth'>Doctor Name</div>
                <div className='darkText heightWidth'>Slot</div>
                <div className='darkText heightWidth'>Status</div>
                <div className='darkText heightWidth'>Payment Status</div>
                {
                  AppointmentData.slice(((currentPage - 1) * appointmentsPerPage), (currentPage * appointmentsPerPage)).map((item, index) => {
                    return (
                      <>
                        <div className={'heightWidth'}>{item.Sr}</div>
                        <div className={'heightWidth'}>{item.Name}</div>
                        <div className={'heightWidth'}>{item.Date}</div>
                        <div className={'heightWidth'}>{item.DoctorName}</div>
                        <div className={'heightWidth'}>{item.Slot}</div>
                        <button className={'heightWidth appointmentButtons'}>{item.Status}</button>
                        <button className={'heightWidth appointmentButtons'}>{item.PaymentStatus}</button>
                      </>
                    )
                  })
                }
              </div>
          }
          {

            totalAppointments > appointmentsPerPage ?
              <div className='alignPagination'>
                <ReactPaginate
                  previousLabel={<i className="fa-solid fa-angle-left"></i>}
                  nextLabel={<i className="fa-solid fa-angle-right"></i>}
                  breakLabel={'...'}
                  pageCount={pageCount}
                  marginPagesDisplayed={isMobile ? 0 : 2}
                  pageRangeDisplayed={isMobile ? 2 : 3}
                  onPageChange={handlePageClick}
                  containerClassName={'pagination'}
                  subContainerClassName={'pages pagination'}
                  activeClassName={'active'}
                /> </div> : ""
          }
        </div> */}