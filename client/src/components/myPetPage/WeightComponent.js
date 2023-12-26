import { useState } from 'react';
import { ContainerBox, InputBox } from '../common/Boxes';
import { SmallBtn } from '../common/Buttons';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import axios from 'axios';

export default function WeightComponent() {
  const [weight, setWeight] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [weightList, setWeightList] = useState([]);

  const handleChangeWeight = (e) => {
    setWeight(e.target.value);
  };

  //등록버튼
  const weightPostClick = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/dogs/:id/weights',
        {
          date: startDate,
          weight,
        },
      );
      setWeightList([...weightList, response.data]);
      setWeight('');
    } catch (error) {
      console.error('등록에 실패했습니다.', error);
    }
  };

  return (
    <div>
      <ContainerBox>
        <WeightContents>
          <span className="span">몸무게를 등록하세요.</span>

          <SmallBtn
            onClick={(e) => {
              weightPostClick();
            }}
          >
            등록
          </SmallBtn>

          <DatePicker
            locale={ko}
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="yyyy년 MM월 dd일"
          />

          <InputBox>
            <input
              className="form-input"
              value={weight}
              type="text"
              name="weight"
              id="weight"
              placeholder="몸무게 입력"
              onChange={handleChangeWeight}
            ></input>
          </InputBox>
          <div>
            <span>몸무게 히스토리</span>
          </div>
          <WeightList>
            <ul>
              {weightList.map((item, index) => (
                <li key={index}>
                  {item.date}: {item.weight}kg
                </li>
              ))}
            </ul>
          </WeightList>
        </WeightContents>
      </ContainerBox>
    </div>
  );
}

const WeightContents = styled.div`
  // height: 100%;
  display: flex;
  flex-direction: column;
  // align-items: center;
  justify-content: center;
  padding: 30px;

  .span {
    padding: 10px;
  }
`;

const WeightList = styled.div`
  margin-top: 20px;

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: 10px;
  }
`;
