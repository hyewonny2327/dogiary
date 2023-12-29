import { useState } from 'react';
import { ContainerBox, InputBox } from '../common/Boxes';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import { SmallBtn } from '../common/Buttons';
import axios from 'axios';
import { api } from '../../utils/api';
export default function MedicalComponent() {
  const [content, setContent] = useState('');
  const [hospital, setHospital] = useState('');
  const [cost, setCost] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [medicalList, setMedicalList] = useState([]);

  const handleChangeContent = (e) => {
    setContent(e.target.value);
  };

  const handleChangeHospital = (e) => {
    setHospital(e.target.value);
  };

  const handleChangeCost = (e) => {
    setCost(e.target.value);
  };

  const MedicalPostClick = async () => {
    try {
      const response = await api.post('/dogs/:id/medicals/:id', {
        content,
        date: startDate,
        cost,
        hospital,
      });
      setMedicalList([...medicalList, response.data]);
      setContent('');
    } catch (error) {
      console.error('등록에 실패했습니다.', error);
    }
  };

  return (
    <div>
      <ContainerBox>
        <MedicalContents>
          <span className="span">사료/영양제/간식 정보를 등록하세요.</span>
          <div className="register-btn">
            <SmallBtn
              onClick={(e) => {
                MedicalPostClick();
              }}
            >
              등록
            </SmallBtn>
          </div>
          <StyledDatePicker
            locale={ko}
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="yyyy년 MM월 dd일"
          />
          <InputBox>
            <input
              className="form-input-content"
              value={content}
              type="text"
              name="content"
              id="content"
              placeholder="진료내용"
              onChange={handleChangeContent}
            ></input>
          </InputBox>
          <InputBox>
            <input
              className="form-input-hospital"
              value={hospital}
              type="text"
              name="hospital"
              id="hospital"
              placeholder="병원"
              onChange={handleChangeHospital}
            ></input>
          </InputBox>
          <InputBox>
            <input
              className="form-input-cost"
              value={cost}
              type="text"
              name="cost"
              id="cost"
              placeholder="비용"
              onChange={handleChangeCost}
            ></input>
          </InputBox>

          <MedicalList>
            <div>
              <span>건강기록 히스토리</span>
            </div>

            <ul>
              <li></li>
            </ul>
          </MedicalList>
        </MedicalContents>
      </ContainerBox>
    </div>
  );
}

const MedicalContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 30px;

  .span {
    padding: 10px;
    text-align: left;
  }

  .form-input-content,
  .form-input-hospital,
  .form-input-cost {
    width: 270px;
    margin-top: 10px;
    padding-left: 10px;
  }

  .register-btn {
    padding: 10px;
    margin-left: auto;
  }
`;

const MedicalList = styled.div`
  margin-top: 20px;

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: 10px;
  }
`;

const StyledDatePicker = styled(DatePicker)`
  width: 270px;
  height: 29px;
  border: 1px solid #bdaf74;
  border-radius: 4px;
  padding-left: 10px;
`;
