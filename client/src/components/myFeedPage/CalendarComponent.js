import React, { useContext, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { setIsOpen } from '../../slice/store';
import { Modal } from '../common/Modal';
import DailyDiaryComponent from './DailyDiaryComponent';

function CalendarComponent() {
  const [value, setValue] = useState(new Date());
  const [clickedDate, setClickedDate] = useState(0);

  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.modal.isOpen);
  const handleDateClick = (date) => {
    const formattedDate = date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    //console.log('선택한 날짜 : ', formattedDate)
    setClickedDate(formattedDate);
    dispatch(setIsOpen(true));
  };

  return (
    <div>
      <CalendarStyle>
        <Calendar
          onChange={setValue}
          value={value}
          formatDay={(locale, date) =>
            date.toLocaleString('en', { day: 'numeric' })
          }
          onClickDay={handleDateClick}
        />
      </CalendarStyle>
      {isModalOpen && (
        <Modal containerStyle={containerStyle}>
          <ModalContents>
            <DailyDiaryComponent clickedDate={clickedDate} />
          </ModalContents>
        </Modal>
      )}
    </div>
  );
}

export default CalendarComponent;

const containerStyle = `
display:flex;
flex-direction:column;
justify-content:flex-end;
align-items:center;

`;
const ModalContents = styled.div`
  width: 100vw;
  height: 80vh;
  border-radius: 39px 39px 0 0;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #5f5013;
  font-family: Noto Sans KR;
  overflow: auto;
`;
const CalendarStyle = styled.div`

.react-calendar{
    width: 100%;
    border:none;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    padding: 0 13px;
    box-sizing:border-box;
    color: #383838;
    font-family: Noto Sans KR;
    
    
}
.react-calendar__navigation{
    width:100%;
    //width: 318.691px;
    height: 33.82px;
    background: #fff8e6;
    border-radius: 11px;

}
.react-calendar__navigation button:disabled {
    background-color: #fff8e6;
  }
  .react-calendar__navigation__label {
    color: #5F5013;
    font-weight:800;
    font-family: Noto Sans KR;
  }
  .react-calendar__navigation__arrow{
    color:#5F5013;
    font-weight:800;
  }
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #F2D8B2;
  }
  .react-calendar__month-view__weekdays{
    color: #BDAF74;
    font-family: Noto Sans KR;
    text-decoration:none;
    
  }
  .react-calendar__month-view__days{
    display:flex;
    flex-wrap:wrap;

    
  }

  .react-calendar__month-view__days__day {
    color: #5F5013;
    font-weight:800;
  }
  .react-calendar__month-view__days__day--neighboringMonth {
    color: white;
  }
  abbr[title]{
    text-decoration:none;
  }
  .react-calendar__tile.react-calendar__month-view__days__day {
    flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  }
  .react-calendar__tile.react-calendar__month-view__days__day::before {
    content: "";
    display: block;
    padding-top: 100%; /* 1:1 비율을 위해 */
  }
 
  .react-calendar__tile {
    background-color: #fff8e6;
    border-radius: 50%;
    width: 45px;
    box-sizing: border-box;
    padding: 10px;
    flex: none;
    margin: 6px 0;
    text-align: center;
  }

  .react-calendar__tile--active{
    background: #fff8e6;
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus,
  .react-calendar__tile--active {
    background: #5F5013;
  color:#FFF8E6;
  }

}
`;
