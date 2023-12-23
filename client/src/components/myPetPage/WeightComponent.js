import { useState } from 'react';
import { ContainerBox, InputBox } from '../common/Boxes';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';

export default function WeightComponent() {
  const [weight, setWeight] = useState('');
  const [startDate, setStartDate] = useState(new Date());

  const handleChangeWeight = (e) => {
    setWeight(e.target.value);
  };

  return (
    <div>
      <ContainerBox>
        <h1>몸무게를 등록하세요.</h1>
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
      </ContainerBox>
    </div>
  );
}

// const StyledDatePicker = styled(DatePicker)`
//   margin-top: 1rem;
//   width: 284px;
//   height: 29px;
//   padding: 8px 20px;
//   box-sizing: border-box;
//   border: 1px solid
//   border-radius: 4px;
//   font-size: 16px;
// `;
