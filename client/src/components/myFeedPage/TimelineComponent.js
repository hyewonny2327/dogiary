import styled from 'styled-components';
import { showDiaryWithCursor } from '../../utils/diaryApi';
import { useEffect, useState, useRef } from 'react';
import useInfinityScroll from '../../hooks/useInfinityScroll';
export default function TimelineComponent({ isTimelineClick }) {
  const [monthlyDiaries, setMonthlyDiaries] = useState([]);
  const [monthAndYear, setMonthAndYear] = useState('');
  const [currentMonth, setCurrentMonth] = useState('');

  //타임라인 무한스크롤
  const { setTargetRef } = useInfinityScroll(handleIntersect);
  const targetRef = useRef(null);
  const [moreData, setMoreData] = useState(true);

  async function handleIntersect() {
    console.log('handleIntersect 함수 실행');
    if (moreData) {
      setMoreData(true);
      await getDiaryData();
    } else {
      setTargetRef(null);
      console.log('끝');
    }
  }
  useEffect(() => {
    if (targetRef.current) {
      setTargetRef(targetRef.current);
    }
    if (targetRef == null) {
      console.log('null 입니다 onIntersect 호출하지마!! ');
    }
    getCurrentMonthAndYear();
  }, []);

  function getCurrentMonthAndYear() {
    console.log('getCurrentMonthAndYear호출됨');
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    setCurrentMonth(currentMonth);

    const formattedDate = `${currentYear}-${currentMonth}`;
    return formattedDate;
    //setMonthAndYear(formattedDate);
  }
  async function getDiaryData() {
    console.log('getDiaryData 호출!');
    console.log('moreData', moreData);
    try {
      if (!moreData) {
        console.log('No more data to fetch');
        return;
      }
      console.log('diaries 확인', monthlyDiaries);
      const lastItemId =
        monthlyDiaries.length > 0
          ? monthlyDiaries[monthlyDiaries.length - 1]._id
          : null;
      console.log('lastItemId', lastItemId);

      const diaries = await showDiaryWithCursor(lastItemId);
      console.log(diaries);
      if (Array.isArray(diaries)) {
        //array인지 체크, 개수보다 이하이면 =>
        if (!diaries || diaries.length < 10) {
          // 데이터가 없을 때의 처리
          setMoreData(false); // 더 이상 데이터가 없다고 표시
          setMonthlyDiaries((prev) => [...prev, ...diaries]);
        } else {
          setMonthlyDiaries((prev) => [...prev, ...diaries]); // 기존 데이터와 새로운 데이터 합치기
        }
        //setTargetRef(targetRef.current);
      } else {
        console.log('배열이 아님');
      }
    } catch (error) {
      console.error('Error fetching data in timeline component:', error);
    }
  }

  return (
    <TimeLine>
      <div className="month">{currentMonth}월</div>
      {monthlyDiaries &&
        monthlyDiaries.map((diary, index) => (
          <div className="post-component" key={`${diary._id}-${index}`}>
            <div className="text-container">
              <div>{diary.date}</div>
              <div>{diary.title}</div>
            </div>
            <img
              className="image"
              alt="대표이미지"
              //배포 후 잘 들어갔는지 확인 필요
              //   src={diary.imageUrls[0]}
              src={'/images/147722e1-adc8-4ca0-acea-67826c8af098.png'}
            ></img>
          </div>
        ))}
      {moreData ? (
        <div className="target" ref={targetRef}>
          &nbsp;
        </div>
      ) : null}
    </TimeLine>
  );
}

const TimeLine = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  .target {
    height: 200px;
    width: 100px;
    //background: red;
  }
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
    border: 1px solid red;
  }
`;
