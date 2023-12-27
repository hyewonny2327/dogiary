import { useState } from 'react';
import { ContainerBox, InputBox } from '../common/Boxes';
import { SmallBtn } from '../common/Buttons';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import axios from 'axios';

export default function MemoComponent() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [memoList, setMemoList] = useState([]);

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleChangeContent = (e) => {
    setContent(e.target.value);
  };

  const memoPostClick = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/dogs/:id/memos',
        {
          date: startDate,
          title,
          content,
        },
      );
      setMemoList([...memoList, response.data]);
      setTitle('');
    } catch (error) {
      console.error('등록에 실패했습니다.', error);
    }
  };

  return (
    <div>
      <ContainerBox>
        <MemoContents>
          <span className="span">진료기록을 등록하세요.</span>
          <div className="register-btn">
            <SmallBtn
              onClick={(e) => {
                memoPostClick();
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
              className="form-input-title"
              value={title}
              type="text"
              name="title"
              id="title"
              placeholder="제목"
              onChange={handleChangeTitle}
            ></input>
          </InputBox>
          <InputBox>
            <input
              className="form-input-content"
              value={content}
              type="text"
              name="content"
              id="content"
              placeholder="메모 입력"
              onChange={handleChangeContent}
            ></input>
          </InputBox>

          <MemoList>
            <div>
              <span>메모 히스토리</span>
            </div>

            <ul>
              {memoList.map((item, index) => (
                <li key={index} className="content-item">
                  <span className="title">{item.title}</span>
                  <span className="date">{item.date.toLocaleDateString()}</span>
                  <span className="content">{item.title}</span>
                </li>
              ))}
            </ul>
          </MemoList>
        </MemoContents>
      </ContainerBox>
    </div>
  );
}

const MemoContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 30px;

  .span {
    padding: 10px;
    text-align: left;
  }

  .form-input-title,
  .form-input-content {
    width: 270px;
    margin-top: 10px;
    padding-left: 10px;
  }

  .form-input-content {
    height: 75px;
  }

  .register-btn {
    padding: 10px;
    margin-left: auto;
  }
`;

const MemoList = styled.div`
  margin-top: 20px;

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: 10px;
  }

  .content-item {
    list-style: none;
    overflow: hidden;
  }

  .title,
  .content {
    float: right;
  }

  .date {
    float: left;
  }
`;

const StyledDatePicker = styled(DatePicker)`
  width: 270px;
  height: 29px;
  border: 1px solid #bdaf74;
  border-radius: 4px;
  padding-left: 10px;
`;
