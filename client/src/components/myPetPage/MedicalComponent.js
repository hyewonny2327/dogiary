import { useState } from 'react';
import { ContainerBox, InputBox } from '../common/Boxes';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';

export default function MedicalComponent() {
  const [content, setContent] = useState('');
  const [startDate, setStartDate] = useState(new Date());

  const handleChangeContent = (e) => {
    setContent(e.target.value);
  };

  return (
    <div>
      <ContainerBox>
        <h2>사료/영양제/간식 정보를 등록하세요.</h2>
        <DatePicker
          locale={ko}
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="yyyy년 MM월 dd일"
        />
        <InputBox>
          <input
            className="form-input"
            value={content}
            type="text"
            name="content"
            id="content"
            placeholder="진료내용"
            onChange={handleChangeContent}
          ></input>
        </InputBox>
      </ContainerBox>
    </div>
  );
}
