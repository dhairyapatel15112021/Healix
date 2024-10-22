import React,{useState,useEffect,useContext} from 'react';
import './Patient.scss';
import DatePicker from "react-multi-date-picker";
import Icon from "react-multi-date-picker/components/icon";
import ReactPaginate from 'react-paginate';
import '../Pagination/Pagination.css';
import { Sidebar } from '../Sidebar/Sidebar';
import { useWidth } from '../../Hooks/useWidth';
import { InitialData } from './InitialData';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../../App';
export const Patient = () => {
  const [totalPatients, setTotalPatients] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile] = useWidth();
  const patientsPerPage = isMobile ? 8 : 7; // Number of items per page
  const pageCount = Math.ceil(totalPatients / patientsPerPage);// Calculate the total number of pages
  const navigate = useNavigate();
  const {userLoginData, setUserLoginData} = useContext(userContext);
  useEffect(() => {
    //userLoginData.IsLogin ? navigate("/doctor/patient") : navigate("/login");
    !userLoginData.IsLogin && navigate("/login");
  }, [userLoginData.IsLogin]);
  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
    // Fetch and update data for the new page
    // You would typically have an array of items and slice it to get the current page's items.
  };
  return (
    <div className='patientDiv'>
      <Sidebar />
      <div className='patient'>
        <div className='patientText'>Patient</div>
        <div className='patientInfoDiv'>
          <div className='allPatientCalender'>
            <div className='allPatientText'>All Patient</div>
            <div className='datePdfDiv'>
              <button className='downloadPdfButton'>Download</button>
              <div><div><DatePicker render={<Icon />} /></div></div>
            </div>
          </div>
          {
            totalPatients === 0 ?
              <div className='noPatient'>There Is No Patients for the dates 😔</div> :
              <div className='patientContent'>
                <div className='darkText heightWidth'>Sr. No</div>
                {!isMobile&&<div className='darkText heightWidth'>Name</div>}
                <div className='darkText heightWidth'>Gender</div>
                <div className='darkText heightWidth'>Age</div>
                <div className='darkText heightWidth'>Weight</div>
                <div className='darkText heightWidth'>Contact</div>
                <div className='darkText heightWidth'>Address</div>
                <div className='darkText heightWidth'>History</div>
                {
                  InitialData.slice(((currentPage - 1) * patientsPerPage), (currentPage * patientsPerPage)).map((item, index) => {
                    return (
                      <>
                        <div className={'heightWidth'}>{item.Sr}</div>
                       {!isMobile && <div className={'heightWidth'}>{item.Name}</div>} 
                        <div className={'heightWidth'}>{item.Gender}</div>
                        <div className={'heightWidth'}>{item.Age}</div>
                        <div className={'heightWidth'}>{item.Weight}</div>
                        <div className={'heightWidth'}>{item.Contact}</div>
                        <button className={'heightWidth patientButtons'}>Address</button>
                        <button className={'heightWidth patientButtons'}>History</button>
                      </>
                    )
                  })
                }
              </div>
          }
          {

            totalPatients > patientsPerPage ?
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
