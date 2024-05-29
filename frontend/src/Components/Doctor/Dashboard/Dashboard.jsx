import React, { useState,useEffect,useContext } from 'react';
import DatePicker from "react-multi-date-picker";
import Icon from "react-multi-date-picker/components/icon";
import ReactPaginate from 'react-paginate';
import '../Pagination/Pagination.css';
import './Dashboard.scss';
import { Sidebar } from '../Sidebar/Sidebar';
import { ToggleButton } from '../../OuterComponents/Header/ToggleButton/ToggleButton';
import { useWidth } from '../../Hooks/useWidth';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../../App';
export const Dashboard = () => {
  const [totalAppointments, setTotalAppointments] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile] = useWidth();
  const appointmentsPerPage = 6; // Number of items per page
  const pageCount = Math.ceil(totalAppointments / appointmentsPerPage);// Calculate the total number of pages
  const navigate = useNavigate();
  const {userLoginData, setUserLoginData} = useContext(userContext);
  useEffect(() => {
    userLoginData.IsLogin ? navigate("/doctor/dashboard") : navigate("/login");
  }, [userLoginData.IsLogin]);
  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
    // Fetch and update data for the new page
    // You would typically have an array of items and slice it to get the current page's items.
  };
  const cardContent = [{
    number: 11,
    text1: "Cancelled",
    text2: "Appointments",
    count: 1
  },
  {
    number: 12,
    text1: "Approved",
    text2: "Appointments",
    count: 2
  },
  {
    number: 13,
    text1: "Rejected",
    text2: "Appointments",
    count: 3
  }, {
    number: 15,
    text1: "Total",
    text2: "Appointments",
    count: 4
  }]

  const initialData = [{
    Sr: 1,
    Date: '26-02-2020',
    Time: '3:00 PM',
    Name: 'Karim Ahmed',
    Contact: 1234567890,
    Action: "Approved",
  },
  {
    Sr: 2,
    Date: '26-02-2020',
    Time: '3:00 PM',
    Name: 'Karim Ahmed',
    Contact: 1234567890,
    Action: "Approved",
  },
  {
    Sr: 3,
    Date: '26-02-2020',
    Time: '3:00 PM',
    Name: 'Karim Ahmed',
    Contact: 1234567890,
    Action: "Approved",
  }, {
    Sr: 4,
    Date: '26-02-2020',
    Time: '3:00 PM',
    Name: 'Karim Ahmed',
    Contact: 1234567890,
    Action: "Approved",
  }, {
    Sr: 5,
    Date: '26-02-2020',
    Time: '3:00 PM',
    Name: 'Karim Ahmed',
    Contact: 1234567890,
    Action: "Approved",
  }, {
    Sr: 6,
    Date: '26-02-2020',
    Time: '3:00 PM',
    Name: 'Dhairya Patel',
    Contact: 1234567890,
    Action: "Cancelled",
  },
  {
    Sr: 7,
    Date: '26-02-2020',
    Time: '3:00 PM',
    Name: 'Karim Ahmed',
    Contact: 1234567890,
    Action: "Approved",
  }]
  return (
    <div className='dashboardDiv'>
      <Sidebar />
      <ToggleButton/>
      <div className='dashboard'>
        <div className='dashboardText'>Dashboard</div>
        <div className='cardDiv'>
          {
            cardContent.map((item, index) => {
              return (
                <div className='card'>
                  <div className='cardNumber'>{item.number}</div>
                  <div className='cardText'>
                    <div>{item.text1}</div>
                    <div>{item.text2}</div>
                  </div>
                </div>
              )
            })
          }
        </div>
        <div className='appointmentDiv'>
          <div className='recentAppointmentDiv'>
            <div className='recentAppointmentText'>Recent Appointments</div>
            <div className='datePdfDiv'>
              <button className='downloadPdfButton'>Download</button>
              <div>
                <DatePicker render={<Icon />} />
              </div>
            </div>
          </div>
          {
            totalAppointments === 0 ?
              <div className='noAppointment'>There Is No appointments for the dates 😔</div> :
              <div className='appointmentContent'>
                <div className='darkText heightWidth'>Sr. No</div>
                <div className='darkText heightWidth'>Date</div>
                <div className='darkText heightWidth'>Time</div>
                <div className='darkText heightWidth'>Name</div>
                <div className='darkText heightWidth'>Contact</div>
                <div className='darkText heightWidth'>Action</div>
                {
                  initialData.slice(((currentPage - 1) * appointmentsPerPage), (currentPage * appointmentsPerPage)).map((item, index) => {
                    return (
                      <>
                        <div className={'heightWidth'}>{item.Sr}</div>
                        <div className={'heightWidth'}>{item.Date}</div>
                        <div className={'heightWidth'}>{item.Time}</div>
                        <div className={'heightWidth'}>{item.Name}</div>
                        <div className={'heightWidth'}>{item.Contact}</div>
                        <div className={'heightWidth'}>{item.Action}</div>
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
    </div >
  )
}
