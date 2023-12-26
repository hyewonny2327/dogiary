import { useState } from 'react';
import { ContainerBox, InputBox } from '../common/Boxes';
import { SmallBtn } from '../common/Buttons';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import axios from 'axios';

export default function FoodComponent() {
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [foodList, setFoodList] = useState([]);

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
  const FoodPostClick = async () => {
    try {
      const response = await axios.post('api/dogs/:id/foods', {
        date: startDate,
        category,
        name,
        content,
      });
      setFoodList([...foodList, response.data]);
      setCategory('');
    } catch (error) {
      console.error('등록에 실패했습니다.', error);
    }
  };

  return (
    <div>
      <ContainerBox>
        <FoodContents>
          <span className="span">메모를 등록하세요.</span>
          <div className="register-btn">
            <SmallBtn
              onClick={(e) => {
                FoodPostClick();
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
              className="form-input-category"
              value={category}
              type="text"
              name="category"
              id="category"
              placeholder="분류명"
              onChange={handleChangeCategory}
            ></input>
          </InputBox>
          <InputBox>
            <input
              className="form-input-name"
              value={name}
              type="text"
              name="cname"
              id="name"
              placeholder="제품명"
              onChange={handleChangeName}
            ></input>
          </InputBox>
          <InputBox>
            <input
              className="form-input-content"
              value={content}
              type="text"
              name="content"
              id="content"
              placeholder="메모"
              onChange={handleChangeContent}
            ></input>
          </InputBox>

          <FoodList>
            <div>
              <span>사료/영양제/간식/정보 히스토리</span>
            </div>
            <ul>
              <li></li>
            </ul>
          </FoodList>
        </FoodContents>
      </ContainerBox>
    </div>
  );
}
const FoodContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 30px;

  .span {
    padding: 10px;
    text-align: left;
  }
  .form-input-category,
  .form-input-name,
  .form-input-content {
    width: 280px;
    margin-top: 10px;
  }

  .register-btn {
    padding: 10px;
    margin-left: auto;
  }
`;

const FoodList = styled.div`
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
  width: 278px;
  height: 29px;
`;