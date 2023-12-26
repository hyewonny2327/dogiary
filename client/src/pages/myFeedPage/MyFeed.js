import { useState } from 'react';
import { LongColoredBtn } from '../../components/common/Buttons';
import { LogoBar, NavBar } from '../../components/common/Header';
import CalendarComponent from '../../components/myFeedPage/CalendarComponent';
import styled from 'styled-components';
import TimelineComponent from '../../components/myFeedPage/TimelineComponent';
import { useNavigate } from 'react-router-dom';

function MyFeed() {
  const [isCalendarClick, setIsCalendarClicked] = useState(true);
  const [isTimelineClick, setIsTimelineClicked] = useState(false);
  const navigate = useNavigate();

  function handleClickTab(tab) {
    if (tab === 'calendar') {
      setIsCalendarClicked(!isCalendarClick);
      setIsTimelineClicked(!isTimelineClick);
    } else if (tab === 'timeline') {
      setIsCalendarClicked(!isCalendarClick);
      setIsTimelineClicked(!isTimelineClick);
    }
  }
  function handleButtonClick() {
    navigate('/myFeed/post');
  }
  return (
    <FeedContainer>
      <LogoBar />
      <NavBar />
      <MyFeedContainer>
        {/* <MyFeedStyle> */}
        <div className="title">사진 일기장</div>
        <CalendarContainer>
          <div className="tab-container">
            <div
              onClick={() => handleClickTab('calendar')}
              className={isCalendarClick ? 'clicked' : ''}
            >
              캘린더
            </div>
            <div
              onClick={() => handleClickTab('timeline')}
              className={isTimelineClick ? 'clicked' : ''}
            >
              타임라인
            </div>
          </div>
          <div className="content-container">
            {isCalendarClick && <CalendarComponent />}
            {isTimelineClick && (
              <TimelineComponent isTimelineClick={isTimelineClick} />
            )}
          </div>
        </CalendarContainer>
        <LongColoredBtn onClick={handleButtonClick}>
          추억 기록하기
        </LongColoredBtn>
        {/* </MyFeedStyle> */}
      </MyFeedContainer>
    </FeedContainer>
  );
}

export default MyFeed;

const FeedContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
const MyFeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  //height:-webkit-fill-available;
  width: 100%;
  .title {
    font-family: Noto Sans KR;
    font-weight: 900;
    color: #5f5013;
    font-size: 1.2rem;
  }
`;

const CalendarContainer = styled.div`
  //margin:50px 10px;
  margin: 2rem 1rem;
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-family: Noto Sans KR;
  font-weight: 900;
  .tab-container {
    margin-bottom: 30px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    width: 80%;
    justify-content: space-around;
    align-items: center;
    font-weight: 600;
    font-size: 0.8rem;
    color: #f2d8b2;
  }
  .clicked {
    text-decoration: underline;
    color: #5f5013;
    text-underline-offset: 8px;
    text-decoration-thickness: 3px;
  }
  .content-container {
    width: 370px;
    //height:390px;
    height: 60vh;

    overflow: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
