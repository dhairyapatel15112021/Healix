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

export const YourAppointment = () => {
  const [isMobile] = useWidth();
  const [totalAppointments, setTotatAppointments] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = isMobile ? 8 : 7; // Number of items per page
  const pageCount = Math.ceil(totalAppointments / appointmentsPerPage);// Calculate the total number of pages
  const navigate = useNavigate();
  const { userLoginData, setUserLoginData } = useContext(userContext);
  useEffect(() => {
    userLoginData.IsLogin ? navigate("/user/appointment") : navigate("/login");
  }, [userLoginData.IsLogin]);
  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
    // Fetch and update data for the new page
    // You would typically have an array of items and slice it to get the current page's items.
  };
  return (
    <div className='userAppointment'>
      <p>
        This Page Is Under Maintenance 😔
      </p>
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