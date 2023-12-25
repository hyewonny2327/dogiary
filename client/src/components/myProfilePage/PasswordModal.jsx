import { styled } from 'styled-components';
import { useRef, useState } from 'react';
import { Modal } from '../common/Modal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PasswordModal = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const userTokenValue = localStorage.getItem('userToken');
  const passwordInputRef = useRef(null);
  //input 비워주기
  const clearInputField = () => {
    if (passwordInputRef.current) {
      passwordInputRef.current.value = '';
    }
  };
  //패스워드 체크 Api
  const PasswordCheck = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/auth/check-password',
        { password },
        {
          headers: {
            Authorization: `Bearer ${userTokenValue}`,
            'Content-type': 'application/json',
          },
        },
      );

      return response.data.data;
    } catch (error) {
      console.error('비밀번호 확인 오류:', error);
    }
  };
  //확인Btn
  const handlePasswordCheck = async (inputRef) => {
    try {
      const result = await PasswordCheck();
      result && result.check
        ? navigate('/profile/update')
        : clearInputField(inputRef);
    } catch (error) {
      console.error('비밀번호 확인 오류:', error);
    }
  };

  return (
    <Modal containerStyle={containerStyle}>
      <ModalPage>
        <ModalContainer>
          <AuthTitle>
            <div>본인 인증을 해주세요.</div>
          </AuthTitle>
          <ContentBox>
            <div>
              <input
                ref={passwordInputRef}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="비밀번호 입력"
              ></input>
            </div>
          </ContentBox>
          <BtnBox>
            <button>비밀번호 찾기</button>
            <button onClick={handlePasswordCheck}>확인</button>
          </BtnBox>
        </ModalContainer>
      </ModalPage>
    </Modal>
  );
};

export default PasswordModal;

//모달

const containerStyle = `
display:flex;
flex-direction:column;
justify-content:flex-end;
align-items:center;

`;

const ModalPage = styled.div`
  width: 390px;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 700;
  color: #5f5013;
`;

const ModalContainer = styled.div`
  width: 370px;
  height: 27vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: white;
`;

const AuthTitle = styled.div`
  width: 100%;
  height: 9vh;
  display: flex;
  justify-content: center;
  align-items: end;
  font-size: 20px;
  & > div {
    width: 95%;
    height: 60%;
    /* border: 1px solid black; */
  }

  /* background-color: red; */
`;

const ContentBox = styled.div`
  width: 100%;
  height: 9vh;
  display: flex;
  justify-content: center;
  align-items: center;
  //비밀번호 테두리
  & > div {
    width: 95%;
    height: 6vh;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
    border-radius: 5px;
    //비밀번호 입력칸
    & > input {
      width: 90%;
      height: 80%;
      border: none;
      &::placeholder {
        color: #a5a5a5;
        width: 100%;
        font-weight: 700;
        font-size: 16px;
        font-family: 'Noto Sans KR';
      }
    }
  }
`;

const BtnBox = styled.div`
  width: 95%;
  height: 9vh;
  display: flex;
  /* background-color: red; */
  justify-content: space-between;
  & button:first-child {
    border: none;
    height: 3vh;
    background-color: transparent;
    color: #5f5013;
    font-family: 'Noto Sans KR';
    font-weight: 700;
  }
  & > button:last-child {
    border: none;
    width: 3.5rem;
    height: 4vh;
    background-color: #f2d8b2;
    color: black;
    font-family: 'Noto Sans KR';
    font-weight: 700;
  }
`;
