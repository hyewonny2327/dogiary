import { useState } from 'react';
import { ContainerBox } from '../common/Boxes';
import { SmallBtn } from '../common/Buttons';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';

import { api } from '../../utils/api';

export default function WeightsComponent({ dogInfo, apiCall }) {
  const [weight, setWeight] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const _id = dogInfo?.data;
  const handleChangeWeight = (e) => {
    setWeight(e.target.value);
  };

  const memoPostClick = async () => {
    try {
      const response = await api.post(`/dogs/${_id._id}/weights`, {
        date: startDate.toISOString().split('T')[0],
        weight: Number(weight),
      });

      alert('등록성공');
      setWeight('');
      apiCall(_id._id);
    } catch (error) {
      console.error('등록에 실패했습니다.', error);
    }
  };
  return (
    <>
      <ContainerBox>
        <WeightContainer>
          <HeaderSection>
            <div>
              <div>몸무게를 등록하세요</div>
              <div>
                <SmallBtn
                  onClick={(e) => {
                    weightPostClick();
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
            <WeightInput>
              <div>
                <label htmlFor="inputtitle">
                  <input
                    value={weight}
                    type="text"
                    placeholder="몸무게"
                    name="title"
                    id="inputtitle"
                    onChange={handleChangeWeight}
                  />
                </label>
              </div>
            </WeightInput>
          </HeaderSection>
          <BodySection>
            <Weigth>
              <div>몸무게 히스토리</div>
              <div>전체보기</div>
            </Weigth>
            <WeigthItems>
              {_id.weights.map((item, index) => (
                <WeigthItemWrapper>
                  <div className="datediv">
                    <Item>
                      <div>{item.date}</div>
                    </Item>
                  </div>
                  <IconBtn>
                    <div>{item.weight}Kg</div>
                    {/* <div>...</div> */}
                  </IconBtn>
                </WeigthItemWrapper>
              ))}
            </WeigthItems>
          </BodySection>
        </WeightContainer>
      </ContainerBox>
    </>
  );
}

const WeightContainer = styled.div`
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
  // justify-content: space-between;

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

const WeightInput = styled.div`
  margin-top: 10%;
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
const Weigth = styled.div`
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

const WeigthItems = styled.div`
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

const WeigthItemWrapper = styled.div`
  .datediv {
    width: 50%;
  }
  align-items: center;
  width: 100%;
  height: 5vh;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #bdaf74;
  margin-bottom: 5px;
`;

const Item = styled.div`
  padding: 5%;
  width: 65%;
  // align-items: center;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;

  //날짜
  & > div:first-child {
    width: 100%;
    height: 50%;
    font-size: 16px;
    color: black;
  }
  //내용
  & > div:last-child {
    width: 100%;
    height: 35%;
    font-size: 10px;
    color: gray;
  }
`;

const IconBtn = styled.div`
  width: 35%;
  height: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;
