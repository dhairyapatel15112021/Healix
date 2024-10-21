import React, { useEffect, useState } from 'react';
import './TimeAndChart.scss';
import DatePicker from "react-multi-date-picker";
import Icon from "react-multi-date-picker/components/icon";
import { ButtonData } from './ButtonData';
import { useWidth } from '../../../Hooks/useWidth';
import { CancleSlots } from '../../../HelperFunction/CancleSlots';
import axios from 'axios';
export const TimeAndChart = () => {
  const [isMobile] = useWidth();
  const [date, setDate] = useState(new Date());
  const [doctorButtonData,setDoctorButtonData] = useState(ButtonData);

  const cancleSlots = async (buttonText, Date) => {
    try {
      const cancleSlotsResponse = await CancleSlots(buttonText, Date);
      if (cancleSlotsResponse.slotSuceess) {
        console.log(cancleSlotsResponse.slotSuceess);
        getUnavalability();
      }
      else {
        console.log(cancleSlotsResponse.error);
      }
    }
    catch (error) {
      console.log("Error While Canceling Slots");
    }
  }

  const getUnavalability = async () => {
    try{
      const response = await axios.post("http://localhost:8080/unavailable",{date},{
        headers : {Authorization : sessionStorage.getItem("AccessToken")}
      });
      let data = response.data.slot?.doctorUnavailable;
      if(!data){
        data = [];
      }
      const filterData = [...doctorButtonData];
      for(let i = 0 ; i < filterData.length ; i++) {
        if(data.includes(filterData[i].text)){
          filterData[i].isUn = true;
        }
        else{
          filterData[i].isUn = false;
        }
      }
      setDoctorButtonData(filterData);
    }
    catch(err){
      console.log("get the error while cheking the unavalability of doctor");
    }
  }

  useEffect(()=>{
    getUnavalability();
  },[date]);
  
  return (
    <div className='timeAndChartDiv'>
      <div className='timeDiv'>
        <div className='infoDateDiv'>
          <div><i className="fa-solid fa-circle-info"></i> Select dates and slots for Not availabe timing and vice versa.</div>
          <div><DatePicker onChange={(event) => setDate(new Date(event))} render={<Icon />} /></div>
        </div>
        <div className='timeButtonDiv'>
          {
            doctorButtonData.map((item,index)=>{
              return(
                <button key={index} onClick={() => cancleSlots(item.text, date)} className={`timeButton ${item.isUn ? "unavailable" : ""}`} >{item.text}</button>
              )
            })
          }
        </div>
      </div>
      {!isMobile && <div className='chartDiv'></div>}
    </div>
  )
}
