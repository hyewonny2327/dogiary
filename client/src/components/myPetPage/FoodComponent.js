import { useEffect, useState } from 'react';
import { ContainerBox, InputBox } from '../common/Boxes';
import { SmallBtn } from '../common/Buttons';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import { api } from '../../utils/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';

export default function FoodComponent({ dogInfo, apiCall }) {
  const _id = dogInfo?.data;
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [startDate, setStartDate] = useState(new Date());

  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeContent = (e) => {
    setContent(e.target.value);
  };

  //등록버튼
  const foodPostClick = async () => {
    try {
      const response = await api.post(`/dogs/${_id._id}/foods`, {
        date: startDate.toISOString().split('T')[0],
        category: category,
        name: name,
        content: content,
      });
      alert('등록성공');
      setCategory('');
      setName('');
      setContent('');
      apiCall(_id._id);
    } catch (error) {
      console.error('등록에 실패했습니다.', error);
    }
  };

  return (
    <>
      <ContainerBox>
        <FoodContainer>
          <HeaderSection>
            <div>
              <div>
                사료/영양제/간식 정보를
                <br /> 등록하세요.
              </div>
              <div>
                <SmallBtn
                  onClick={(e) => {
                    foodPostClick();
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
              ></StyledDatePicker>
            </DatePickerSelector>
            <InputArea>
              <div>
                <label htmlFor="inputtitle">
                  <input
                    value={category}
                    type="text"
                    placeholder="분류"
                    name="title"
                    id="inputtitle"
                    onChange={handleChangeCategory}
                  />
                </label>
              </div>
            </InputArea>
            <InputArea>
              <div>
                <label htmlFor="inputtitle">
                  <input
                    value={name}
                    type="text"
                    placeholder="제품명"
                    name="title"
                    id="inputtitle"
                    onChange={handleChangeName}
                  />
                </label>
              </div>
            </InputArea>
            <InputArea>
              <div>
                <label htmlFor="textareacontent">
                  <input
                    value={content}
                    name="content"
                    id="textareacontent"
                    placeholder="메모 입력"
                    onChange={handleChangeContent}
                  />
                </label>
              </div>
            </InputArea>
          </HeaderSection>
          <BodySection>
            <Food>
              <div>사료/영양제/간식 히스토리</div>
              <div>전체보기</div>
            </Food>
            <FoodItems>
              {_id.foods.map((item, index) => (
                <FoodItemWrapper>
                  <Item>
                    <div>
                      <div>{item.date}</div>
                      <div>{item.category}</div>
                    </div>
                    <div>{item.name}</div>
                    <div>{item.content}</div>
                  </Item>
                  <IconBtn>
                    <div>...</div>
                  </IconBtn>
                </FoodItemWrapper>
              ))}
            </FoodItems>
          </BodySection>
        </FoodContainer>
      </ContainerBox>
    </>
  );
}

const FoodContainer = styled.div`
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
  height: 15%;
  background: rgba(255, 255, 255, 0);
  border-radius: 4px;
`;
const StyledDatePicker = styled(DatePicker)`
  // background: black;
  width: 80%;
  height: 100%;
  border: 1px solid #bdaf74;
  border-radius: 5px;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 700;
  color: black;
  text-align: center;
`;

const InputArea = styled.div`
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

const BodySection = styled.div`
  width: 80%;
  height: 40%;
  display: flex;
  flex-direction: column;
  /* border: 1px solid red; */
`;

//메모히스토리
const Food = styled.div`
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

const FoodItems = styled.div`
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

const FoodItemWrapper = styled.div`
  width: 100%;
  height: 35%;
  /* background-color: blue; */
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #bdaf74;
  margin-bottom: 5px;
`;

const Item = styled.div`
  width: 80%;
  height: 100%;
  display: flex;

  /* background-color: red; */

  //날짜
  & > div:first-child {
    width: 25%;
    height: 100%;
    font-size: 10px;
    color: #888888;
    /* background-color: red; */
    & > div:first-child {
      width: 100%;
      height: 20%;
    }
    & > div:last-child {
      display: flex;
      align-items: center;
      width: 100%;
      height: 80%;
    }
  }
  //제목
  & > div:nth-child(2) {
    width: 25%;
    height: 100%;
    font-size: 16px;
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  //내용
  & > div:last-child {
    width: 50%;
    height: 100%;
    font-size: 12px;
    color: #888888;
    display: flex;
    justify-content: center;
    align-items: center;
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
