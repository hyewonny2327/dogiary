import styled from 'styled-components';
import { showDailyDiaries } from '../../utils/diaryApi';
import { useEffect, useRef, useState } from 'react';
import dogIcon from '../../components/icons/dogIcon.svg';
import useInfinityScroll from '../../hooks/useInfinityScroll';

export default function DailyDiaryComponent({ clickedDate }) {
  const [dailyDiaries, setDailyDiaries] = useState([]);
  const [isNoData, setIsNoData] = useState(false);
  async function callDailyDiaryApi() {
    try {
      const diaryData = await showDailyDiaries('2023-12-26');
      console.log(diaryData);
      if (Array.isArray(diaryData)) {
        if (diaryData.length === 0) {
          setIsNoData(true);
          console.log(
            '다이어리 정보 없음 -> state설정해서 기본 배경화면 보여주기',
          );
        } else {
          setIsNoData(false);
          setDailyDiaries(diaryData);
          if (diaryData.length < 10) {
            setMoreData(false);
          }
        }
      }
    } catch (error) {
      console.error(
        '일간 다이어리 조회하기 중 에러 발생 in DailyDiaryComponent',
      );
    }
  }

  //무한스크롤
  const targetRef = useRef(null);
  const { setTargetRef } = useInfinityScroll(handleIntersect);
  const [moreData, setMoreData] = useState(true);

  useEffect(() => {
    setTargetRef(targetRef.current);
  }, []);

  async function handleIntersect() {
    if (moreData) {
      //! 커서 보내줘야함. 어떻게 보내줄지 고민중. .

      await callDailyDiaryApi();
    } else {
      console.log('끝');
    }
  }
  return (
    <Container>
      {isNoData && (
        <NoDataContainer>
          <img src={dogIcon} alt="강아지이미지"></img>
          <div>저장된데이터가 없습니다.</div>
          <div>추억을 기록해주세요!</div>
        </NoDataContainer>
      )}
      {!isNoData &&
        dailyDiaries.map((diary, index) => (
          <DailyDiary>
            <div className="title-container" key={`diary-${index}`}>
              <div className="date">{clickedDate}</div>
              <div className="title">{diary.title}</div>
            </div>
            {Array(diary.imageUrls.length).map((_, index) => (
              <div className="content-container" key={`post-${index}`}>
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
      {moreData ? (
        <div ref={targetRef} onIntersect={handleIntersect}></div>
      ) : null}
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
