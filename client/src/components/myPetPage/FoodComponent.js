import { useState } from 'react';
import { ContainerBox, InputBox } from '../common/Boxes';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';

export default function FoodComponent() {
  const [category, setCategory] = useState('');
  const [startDate, setStartDate] = useState(new Date());

  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
  };

  return (
    <div>
      <ContainerBox>
        <h1>메모를 등록하세요.</h1>
        <DatePicker
          locale={ko}
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="yyyy년 MM월 dd일"
        />
        <InputBox>
          <input
            className="form-input"
            value={category}
            type="text"
            name="category"
            id="category"
            placeholder="분류명"
            onChange={handleChangeCategory}
          ></input>
        </InputBox>
      </ContainerBox>
    </div>
  );
}
