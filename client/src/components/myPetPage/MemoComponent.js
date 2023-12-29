import { useEffect, useState } from 'react';
import { ContainerBox } from '../common/Boxes';
import { SmallBtn } from '../common/Buttons';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';

import { api } from '../../utils/api';

export default function MemoComponent({ dogInfo, apiCall }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [startDate, setStartDate] = useState(new Date());

  const _id = dogInfo?.data;

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleChangeContent = (e) => {
    setContent(e.target.value);
  };

  const memoPostClick = async () => {
    try {
      const response = await api.post(`/dogs/${_id._id}/memos`, {
        date: startDate.toISOString().split('T')[0],
        title,
        content,
      });
      const data = response.data;

      alert('등록성공');
      setTitle('');
      setContent('');
      apiCall(_id._id);
    } catch (error) {
      console.error('등록에 실패했습니다.', error);
    }
  };

  useEffect(() => {
    console.log('dogInfo:', dogInfo);
  }, [dogInfo]);

  return (
    <>
      <ContainerBox>
        <MemoContainer>
          <HeaderSection>
            <div>
              <div>메모를 등록하세요</div>
              <div>
                <SmallBtn
                  onClick={(e) => {
                    memoPostClick();
                  }}
                >
                  등록
                </SmallBtn>
              </div>
            </div>
            <DatePickerSelector>
              <StyledDatePicker
                locale={ko}
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="yyyy년 MM월 dd일"
              />
            </DatePickerSelector>
            <MemoTitleInput>
              <div>
                <label htmlFor="inputtitle">
                  <input
                    value={title}
                    type="text"
                    placeholder="제목"
                    name="title"
                    id="inputtitle"
                    onChange={handleChangeTitle}
                  />
                </label>
              </div>
            </MemoTitleInput>
            <MemoContentInput>
              <div>
                <label htmlFor="textareacontent">
                  <textarea
                    value={content}
                    name="content"
                    id="textareacontent"
                    placeholder="메모 입력"
                    onChange={handleChangeContent}
                  ></textarea>
                </label>
              </div>
            </MemoContentInput>
          </HeaderSection>
          <BodySection>
            <MemoHistory>
              <div>메모히스토리</div>
              <div>전체보기</div>
            </MemoHistory>
            <MemoHistoryItems>
              {_id.memos.map((item, index) => (
                <MemoHistoryItemWrapper key={index}>
                  <Item>
                    <div>{item.date}</div>
                    <div>{item.title}</div>
                    <div>{item.content}</div>
                  </Item>
                  <IconBtn>
                    <div>...</div>
                  </IconBtn>
                </MemoHistoryItemWrapper>
              ))}
            </MemoHistoryItems>
          </BodySection>
        </MemoContainer>
      </ContainerBox>
    </>
  );
}

const MemoContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 700;
  color: #5f5013;
`;
const HeaderSection = styled.div`
  width: 80%;
  height: 45%;
  /* background-color: red; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  //title + 등록Btn
  & > div:first-child {
    width: 100%;
    height: 25%;
    /* background-color: pink; */
    display: flex;

    //title
    & > div:first-child {
      width: 80%;
      height: 100%;
      /* background-color: green; */
    }
    //등록Btn
    & > div:last-child {
      width: 20%;
      height: 100%;
      display: flex;
      align-items: end;
    }
  }
`;

const DatePickerSelector = styled.div`
  width: 100%;
  height: 10%;
  background: rgba(255, 255, 255, 0);
  border-radius: 4px;
`;
const StyledDatePicker = styled(DatePicker)`
  width: 80%;
  height: 100%;
  border: 1px solid #bdaf74;
  border-radius: 5px;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 700;
  color: black;
  text-align: center;
`;

const MemoTitleInput = styled.div`
  width: 100%;
  height: 15%;
  border: 1px solid #bdaf74;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0);
  border-radius: 4px;
  /* background-color: gold; */
  & > div:first-child {
    width: 90%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    & > label {
      display: flex;
      width: 100%;
      height: 100%;
      align-items: center;

      & > input {
        border: none;
        width: 100%;
        outline: none;
        font-family: 'Noto Sans KR', sans-serif;
        font-weight: 700;
        color: #5f5013;
        &::placeholder {
          width: 100%;
          height: 100%;
          font-size: 14px;
          color: #a6a9b1;
        }
      }
    }
  }
`;

const MemoContentInput = styled.div`
  width: 100%;
  height: 25%;
  border: 1px solid #bdaf74;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0);
  border: 1px solid #bdaf74;
  border-radius: 5px;

  & > div {
    width: 100%;
    height: 100%;

    & > label {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      & > textarea {
        width: 90%;
        height: 90%;
        font-family: 'Noto Sans KR', sans-serif;
        font-weight: 700;
        color: #5f5013;
        border: none;
        overflow: scroll;

        &::-webkit-scrollbar {
          display: none;
        }
        outline: none;
        &::placeholder {
          width: 100%;
          height: 100%;
          font-size: 14px;
          color: #a6a9b1;
        }
      }
    }
  }
`;

const BodySection = styled.div`
  width: 80%;
  height: 40%;
  display: flex;
  flex-direction: column;
  /* border: 1px solid red; */
`;

//메모히스토리
const MemoHistory = styled.div`
  width: 100%;
  height: 15%;
  color: black;
  border-bottom: 1px solid #bdaf74;
  display: flex;
  justify-content: space-between;
  //전체보기Btn
  & > div:last-child {
    height: 100%;
    display: flex;
    align-items: end;
    font-size: 12px;
  }
`;

const MemoHistoryItems = styled.div`
  width: 100%;
  height: 85%;
  display: flex;
  /* background-color: red; */
  align-items: center;
  flex-direction: column;
  /* 스크롤바 후 ... */
  overflow: auto;
  &::-webkit-scrollbar {
    width: 0;
    border: hidden;
  }
`;

const MemoHistoryItemWrapper = styled.div`
  width: 100%;
  height: 35%;
  /* background-color: blue; */
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #bdaf74;
  margin-bottom: 5px;
`;

const Item = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
  /* background-color: red; */

  //날짜
  & > div:first-child {
    width: 100%;
    height: 60%;
    font-size: 10px;
    color: #888888;
    /* background-color: red; */
  }
  //제목
  & > div:nth-child(2) {
    width: 100%;
    height: 45%;
    font-size: 16px;
    color: black;
  }
  //내용
  & > div:last-child {
    width: 100%;
    height: 35%;
    font-size: 12px;
    color: #888888;
  }
`;

const IconBtn = styled.div`
  width: 20%;
  height: 100%;
  /* border: 1px solid pink; */
  display: flex;
  justify-content: end;
  align-items: center;
`;
