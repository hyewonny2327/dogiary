import styled from 'styled-components';
import { showDiaryWithCursor } from '../../utils/diaryApi';
import { useEffect, useState, useRef } from 'react';
import useInfinityScroll from '../../hooks/useInfinityScroll';
export default function TimelineComponent({ isTimelineClick }) {
  //? 인피니티 스크롤 넣었는데 영재님이 커서 null 인거 수정하셔야함

  const [monthlyDiaries, setMonthlyDiaries] = useState([]);
  const [monthAndYear, setMonthAndYear] = useState('');

  function getCurrentMonthAndYear() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    const formattedDate = `${currentYear}-${currentMonth}`;
    setMonthAndYear(formattedDate);
  }
  async function getDiaryData() {
    try {
      if (!moreData) {
        console.log('No more data to fetch');
        return;
      }
      const lastItemId =
        monthlyDiaries.length > 0
          ? monthlyDiaries[monthlyDiaries.length - 1]._id
          : null;
      const diaries = await showDiaryWithCursor(lastItemId);
      if (Array.isArray(diaries)) {
        //array인지 체크, 개수보다 이하이면 =>
        if (!diaries || diaries.length < 10) {
          setMoreData(false); // 더 이상 데이터가 없다고 표시
          setMonthlyDiaries((prev) => [...prev, ...diaries]);
        } else {
          setMonthlyDiaries((prev) => [...prev, ...diaries]); // 기존 데이터와 새로운 데이터 합치기
        }
      } else {
        console.log('배열이 아님');
      }
    } catch (error) {
      console.error('Error fetching data in timeline component:', error);
    }
  }

  useEffect(() => {
    getCurrentMonthAndYear();
    //getDiaryData();
    setTargetRef(targetRef.current);
  }, []); // 최초 렌더링 시에만 실행

  //타임라인 무한스크롤
  const { setTargetRef } = useInfinityScroll(handleIntersect);
  const targetRef = useRef(null);
  const [moreData, setMoreData] = useState(true);
  async function handleIntersect() {
    if (moreData) {
      await getDiaryData();
    } else {
      console.log('끝');
    }
  }

  return (
    <TimeLine>
      <div className="month">{monthAndYear}</div>
      {monthlyDiaries &&
        monthlyDiaries.map((diary) => (
          <div className="post-component" key={`${diary.id}`}>
            <div className="text-container">
              <div>{diary.date}</div>
              <div>{diary.title}</div>
            </div>
            <div className="image"></div>
          </div>
        ))}
      {moreData ? (
        <div ref={targetRef} onIntersect={handleIntersect}></div>
      ) : null}
    </TimeLine>
  );
}

const TimeLine = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  .month {
    margin: 25px 0;
  }
  .post-component {
    position: relative;
    margin: 4px 0;
  }
  .text-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }
  .image {
    width: 350px;
    height: 160px;
    background-color: #fff8e6;
  }
`;
