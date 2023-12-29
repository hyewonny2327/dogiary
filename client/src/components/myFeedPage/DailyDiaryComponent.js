import styled from 'styled-components';
import {
  deleteMyDiary,
  editDiary,
  showDailyDiaries,
} from '../../utils/diaryApi';
import { useEffect, useRef, useState } from 'react';
import dogIcon from '../../components/icons/dogIcon.svg';
import useInfinityScroll from '../../hooks/useInfinityScroll';
import dayjs from 'dayjs';
import moreIcon from '../../components/icons/moreIcon.svg';

export default function DailyDiaryComponent({ clickedDate }) {
  const [dailyDiaries, setDailyDiaries] = useState([]);
  const [isNoData, setIsNoData] = useState(false);
  const [isMoreBtnClicked, setIsMoreBtnClicked] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [inputTitle, setInputTitle] = useState();
  const [inputContent, setInputContent] = useState();
  async function callDailyDiaryApi() {
    try {
      const formattedDate = formatDateString(clickedDate);
      const diaryData = await showDailyDiaries(formattedDate);
      if (Array.isArray(diaryData)) {
        if (diaryData.length === 0) {
          setIsNoData(true);
        } else {
          setDailyDiaries(diaryData);
        }
      } else {
        setIsNoData(true);
      }
    } catch (error) {
      console.error(error);
    }
  }

  function formatDateString(clickedDate) {
    // console.log(clickedDate.split(' ')[0]);

    const year = clickedDate.split(' ')[0].replace('년', '');
    const month = clickedDate.split(' ')[1].replace('월', '');
    const day = clickedDate.split(' ')[2].replace('일', '');
    // console.log(year, month, day);
    const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(
      2,
      '0',
    )}`;
    // console.log('formatted date', formattedDate);
    return formattedDate;
  }
  function handleMoreBtnClick() {
    setIsMoreBtnClicked((prev) => !prev);
  }

  //수정하기 버튼 클릭 -> 수정하기/ 저장하기
  async function handleClickEdit(id, originTitle, originContent) {
    if (isEditMode === false) {
      //수정하기
      setIsEditMode(true);
    } else {
      //저장하기
      const data = {
        title: inputTitle ? inputTitle : originTitle,
        content: inputContent ? inputContent : originContent,
      };
      await editDiary(id, data);
      callDailyDiaryApi();
      setIsEditMode(false);
    }
  }
  async function handleClickDelete() {
    if (Array.isArray(dailyDiaries)) {
      const id = dailyDiaries[0]._id;
      await deleteMyDiary(id).then(() => {
        callDailyDiaryApi();
      });
    }
  }
  function handleEditTitle(e) {
    let title = e.target.value;
    setInputTitle(title);
  }
  function handleEditContent(e) {
    let content = e.target.value;
    if (content === null) {
      setInputContent();
    }
    setInputContent(content);
  }

  useEffect(() => {
    callDailyDiaryApi();
  }, []);
  useEffect(() => {
    setDailyDiaries([]);
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
            <div className="header-container">
              {isEditMode ? (
                <div className="title-container" key={`diary-${index}`}>
                  <div className="date">{clickedDate}</div>
                  <input
                    onChange={(e) => handleEditTitle(e)}
                    className="title"
                    placeholder={diary.title}
                  ></input>
                </div>
              ) : (
                <div className="title-container" key={`diary-${index}`}>
                  <div className="date">{clickedDate}</div>
                  <div className="title">{diary.title}</div>
                </div>
              )}

              <div>
                {isMoreBtnClicked && (
                  <div className="menu-container">
                    <div
                      className="menu-item"
                      onClick={() =>
                        handleClickEdit(diary._id, diary.title, diary.content)
                      }
                    >
                      {isEditMode ? '저장하기' : '수정하기'}
                    </div>
                    <div className="line"></div>
                    <div className="menu-item" onClick={handleClickDelete}>
                      삭제하기
                    </div>
                  </div>
                )}
                <img
                  className="more-icon"
                  src={moreIcon}
                  alt="수정,삭제하기"
                  onClick={handleMoreBtnClick}
                ></img>
              </div>
            </div>
            {isEditMode ? (
              <input
                className="text"
                placeholder={diary.content}
                onChange={(e) => handleEditContent(e)}
              />
            ) : (
              <div className="text">{diary.content}</div>
            )}
            <div className="image-container">
              {diary.imageUrls.map((_, imageIndex) => (
                <div
                  className="content-container"
                  key={`post-${index}-${imageIndex}`}
                >
                  <img
                    className="image"
                    src={diary.imageUrls[imageIndex]}
                    // src="/images/147722e1-adc8-4ca0-acea-67826c8af098.png"
                    alt="업로드된 이미지"
                  ></img>
                </div>
              ))}
            </div>
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
  .header-container {
    position: relative;
    width: 100%;
  }
  .more-icon {
    position: absolute;
    top: 24px;
    left: 90vw;
  }
  .menu-container {
    position: absolute;
    width: 100px;
    height: 50px;
    top: 40px;
    right: 10vw;
    background: #f2d8b2;
    border-radius: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .line {
    background: #fff;
    width: 100%;
    height: 1px;
  }
  .menu-item {
    text-align: center;
    width: 100%;
  }
  .menu-item:hover {
    background: #bdaf74;

    font-weight: 500;
    color: #fff;
  }

  .title-container {
    margin: 23px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-weight: 600;
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
  .image-container {
    width: 100%;
    height: 50vh;
    overflow: auto;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .image {
    width: 90%;
    height: 300px;
    object-fit: contain;
    //border: 1px solid red;
  }
  .text {
    width: 90%;
    height: 100px;
    margin: 20px 0;
    padding: 0 20px;
    box-sizing: border-box;
    border-bottom: 1px solid #bdaf74;
    overflow: auto;
  }
`;

const NoDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
