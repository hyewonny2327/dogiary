import { useState } from 'react';
import { ContainerBox, InputBox } from '../common/Boxes';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';

export default function MemoComponent() {
  const [content, setContent] = useState('');
  const [startDate, setStartDate] = useState(new Date());

  const handleChangeContent = (e) => {
    setContent(e.target.value);
  };

  return (
    <div>
      <ContainerBox>
        <h1>진료기록을 등록하세요.</h1>
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
            placeholder="메모 입력"
            onChange={handleChangeContent}
          ></input>
        </InputBox>
      </ContainerBox>
    </div>
  );
}
