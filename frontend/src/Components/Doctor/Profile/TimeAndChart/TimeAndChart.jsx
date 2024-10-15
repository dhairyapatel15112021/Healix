import React, { useState } from 'react';
import './TimeAndChart.scss';
import DatePicker from "react-multi-date-picker";
import Icon from "react-multi-date-picker/components/icon";
import { ButtonData } from './ButtonData';
import { useWidth } from '../../../Hooks/useWidth';
import { CancleSlots } from '../../../HelperFunction/CancleSlots';
export const TimeAndChart = () => {
  const [isMobile] = useWidth();
  const [date, setDate] = useState(new Date());
  const cancleSlots = async (buttonText, Date) => {
    try {
      const cancleSlotsResponse = await CancleSlots(buttonText, Date);
      if (cancleSlotsResponse.slotSuceess) {
        console.log(cancleSlotsResponse.slotSuceess);
      }
      else {
        console.log(cancleSlotsResponse.error);
      }
    }
    catch (error) {
      console.log("Error While Canceling Slots");
    }
  }
  return (
    <div className='timeAndChartDiv'>
      <div className='timeDiv'>
        <div className='infoDateDiv'>
          <div><i className="fa-solid fa-circle-info"></i> Select dates and slots for Not availabe timing and vice versa.</div>
          <div><DatePicker onChange={(event) => setDate(new Date(event))} render={<Icon />} /></div>
        </div>
        <div className='timeButtonDiv'>
          {
            ButtonData.map((item, index) => {
              return (
                <button key={index} onClick={() => cancleSlots(item, date)} className='timeButton'>{item}</button>
              )
            })
          }
        </div>
      </div>
      {!isMobile && <div className='chartDiv'></div>}
    </div>
  )
}
