import styled from 'styled-components';
import { showDailyDiaries } from '../../utils/diaryApi';
import { useEffect, useRef, useState } from 'react';
import dogIcon from '../../components/icons/dogIcon.svg';
import useInfinityScroll from '../../hooks/useInfinityScroll';
import dayjs from 'dayjs';
export default function DailyDiaryComponent({ clickedDate }) {
  const [dailyDiaries, setDailyDiaries] = useState([]);
  const [isNoData, setIsNoData] = useState(false);
  async function callDailyDiaryApi() {
    try {
      const formattedDate = formatDateString(clickedDate);
      console.log(formattedDate);
      const diaryData = await showDailyDiaries(formattedDate);
      console.log(diaryData);
      if (Array.isArray(diaryData)) {
        if (diaryData.length === 0) {
          setIsNoData(true);
          console.log(
            '다이어리 정보 없음 -> state설정해서 기본 배경화면 보여주기',
          );
        } else {
          setDailyDiaries(diaryData);
          //setIsNoData(false);
        }
      } else {
        setIsNoData(true);
      }
    } catch (error) {
      // setIsNoData(true);
      console.log(
        '일간 다이어리 조회하기 중 에러 발생 in DailyDiaryComponent',
        error,
      );
    }
  }

  function formatDateString(clickedDate) {
    // '2023년 12월 23일' 형식의 문자열에서 숫자만 추출
    const dateArray = clickedDate.match(/\d+/g);

    // 추출한 숫자를 이용하여 day.js 객체 생성
    //! day js 지우기 1!!!! 그냥 split 쓰기
    const formattedDate = dayjs(
      `${dateArray[0]}-${dateArray[1]}-${dateArray[2]}`,
    );

    // day.js를 사용하여 원하는 형식으로 포맷팅
    const isoFormattedDate = formattedDate.format('YYYY-MM-DD');

    return isoFormattedDate;
  }

  useEffect(() => {
    callDailyDiaryApi();
  }, []);
  useEffect(() => {
    setDailyDiaries([]);
    console.log(isNoData);
  }, [isNoData]);
  return (
    <Container>
      {isNoData === true && (
        <NoDataContainer>
          <img src={dogIcon} alt="강아지이미지"></img>
          <div>저장된데이터가 없습니다.</div>
          <div>추억을 기록해주세요!</div>
        </NoDataContainer>
      )}
      {isNoData === false &&
        dailyDiaries.map((diary, index) => (
          <DailyDiary>
            <div className="title-container" key={`diary-${index}`}>
              <div className="date">{clickedDate}</div>
              <div className="title">{diary.title}</div>
            </div>
            {Array(diary.imageUrls.length).map((_, imageIndex) => (
              <div
                className="content-container"
                // key={`post-${index}-${imageIndex}`}
              >
                <img
                  className="image"
                  src={diary.imageUrls[index]}
                  alt="업로드된 이미지"
                ></img>
              </div>
            ))}
            <div className="text">{diary.content}</div>
          </DailyDiary>
        ))}
      {/* {moreData ? (
        <div ref={targetRef} onIntersect={handleIntersect}></div>
      ) : null} */}
    </Container>
  );
}
const Container = styled.div`
  width: 100vw;
  height: 80vh;
  display: flex;
  flex-direction: column;
`;
const DailyDiary = styled.div`
  border-radius: 39px 39px 0 0;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #5f5013;
  font-family: Noto Sans KR;
  .title-container {
    margin: 23px 0;
    display: flex;
    flex-direction: column;
  }
  .content-container {
    width: 80%;
    height: 315px;
    border-radius: 5px;
    background: #fff8e6;
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
    margin: 2rem 0;
  }
  .image {
    width: 90%;
    height: 200px;
    //border: 1px solid red;
  }
  .text {
    width: 90%;
    height: 100px;
    margin: 20px 0;
    border: 1px solid blue;
  }
`;

const NoDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
