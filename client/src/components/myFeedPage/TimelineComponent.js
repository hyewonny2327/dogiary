import styled from 'styled-components';
import { showDiaryWithCursor } from '../../utils/diaryApi';
import { useEffect, useState, useRef } from 'react';
import useInfinityScroll from '../../hooks/useInfinityScroll';
import { useSelector } from 'react-redux';
export default function TimelineComponent() {
  const [monthlyDiaries, setMonthlyDiaries] = useState([]);
  const [monthAndYear, setMonthAndYear] = useState('');
  const [currentMonth, setCurrentMonth] = useState('');
  const [monthlyDiaryData, setMonthlyDiaryData] = useState([]);

  //타임라인 무한스크롤
  const { setTargetRef } = useInfinityScroll(handleIntersect);
  const targetRef = useRef(null);
  const [moreData, setMoreData] = useState(true);
  const isTimelineClicked = useSelector(
    (state) => state.feedTab.isTimelineClicked,
  );
  async function handleIntersect() {
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

    getCurrentMonthAndYear();
  }, [isTimelineClicked]);

  function getCurrentMonthAndYear() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    setCurrentMonth(currentMonth);

    const formattedDate = `${currentYear}-${currentMonth}`;
    return formattedDate;
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
        if (!diaries || diaries.length < 10) {
          setMoreData(false);
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

  function setDiaryData(DiaryArr) {
    const dataArray = DiaryArr.reduce((acc, item) => {
      const month = item.date.split('-')[1];

      // 해당 월의 객체를 찾음, 없으면 새롭게 추가
      const monthObject = acc.find((obj) => obj.month === month);
      if (monthObject) {
        // 해당 월의 객체가 이미 존재하면 현재 아이템을 해당 월의 배열에 추가
        monthObject.item.push(item);
      } else {
        // 해당 월의 객체가 없으면 새로운 객체를 생성하고 현재 아이템을 배열에 추가
        acc.push({
          month: month,
          item: [item],
        });
      }

      return acc;
    }, []);
    setMonthlyDiaryData(dataArray);
  }

  useEffect(() => {
    if (monthlyDiaries !== null) {
      setDiaryData(monthlyDiaries);
    }
  }, [monthlyDiaries]);

  return (
    <TimeLine>
      {monthlyDiaryData &&
        monthlyDiaryData.map((diary, index) => (
          <div key={index}>
            <div className="month">{diary.month}월</div>
            {diary.item.map((content, subIndex) => (
              <div
                className="post-component"
                key={`${content._id}-${subIndex}`}
              >
                <div className="text-container">
                  <div>{content.date}</div>
                  <div>{content.title}</div>
                </div>
                <img
                  className="image"
                  alt="대표이미지"
                  src={content.imageUrls[subIndex]}
                ></img>
              </div>
            ))}
          </div>
        ))}
      {moreData ? (
        //컨테이너 아래 공간이 좀 있어서 가려져서 관측이 안됨 width를 좀 주니까 해결됨 ㅜㅜ
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
    text-align: center;
    width: 100%;
  }
  .post-component {
    width: 350px;
    height: 160px;
    background-color: #fff8e6;
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
    object-fit: contain;

    //border: 1px solid red;
  }
`;
