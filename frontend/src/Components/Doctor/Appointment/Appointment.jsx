import React,{useState,useEffect,useContext} from 'react';
import { useWidth } from '../../Hooks/useWidth';
import './Appointment.scss';
import '../Pagination/Pagination.css';
import DatePicker from "react-multi-date-picker";
import Icon from "react-multi-date-picker/components/icon";
import ReactPaginate from 'react-paginate';
import { Sidebar } from '../Sidebar/Sidebar';
import { InitialAppointData } from './InitialAppointData';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../../App';
export const Appointment = () => {
  const [isMobile] = useWidth();
  const [totalAppointments, setTotatAppointments] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = isMobile ? 8 : 7; // Number of items per page
  const pageCount = Math.ceil(totalAppointments / appointmentsPerPage);// Calculate the total number of pages
  const navigate = useNavigate();
  const {userLoginData, setUserLoginData} = useContext(userContext);
  useEffect(() => {
    userLoginData.IsLogin ? navigate("/doctor/appointment") : navigate("/login");
  }, [userLoginData.IsLogin]);
  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
    // Fetch and update data for the new page
    // You would typically have an array of items and slice it to get the current page's items.
  };
  return (
    <div className='appointmentPaymentDiv'>
      <Sidebar />
      <div className='appointment'>
        <div className='appointmentText'>Appointments</div>
        <div className='appointmentInfoDiv'>
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
                <div className='darkText heightWidth'>Schedule</div>
                <div className='darkText heightWidth'>Action</div>
                <div className='darkText heightWidth'>Payment Status</div>
                {
                  InitialAppointData.slice(((currentPage - 1) * appointmentsPerPage), (currentPage * appointmentsPerPage)).map((item, index) => {
                    return (
                      <>
                        <div className={'heightWidth'}>{item.Sr}</div>
                        <div className={'heightWidth'}>{item.Name}</div>
                        <div className={'heightWidth'}>{item.Schedule}</div>
                        <button className={'heightWidth appointmentButtons'}>{item.Action}</button>
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
        </div>
      </div>
    </div>
  )
}
