import { styled } from 'styled-components';
import { useRef, useState } from 'react';
import { Modal } from '../common/Modal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { InputBox } from '../common/Boxes';
import { setIsOpen } from '../../slice/store';
import { useDispatch } from 'react-redux';
import { api } from '../../utils/api';

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
      const response = await api.post(
        '/auth/check-password',
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
      console.log(error);
    }
  };
  //확인Btn

  const dispatch = useDispatch();

  const handlePasswordCheck = async (inputRef) => {
    try {
      const result = await PasswordCheck();

      if (result && result.check) {
        navigate('/profile/update');
        dispatch(setIsOpen(false));
      } else {
        clearInputField();
        alert('잘못된 비밀번호입니다. 다시 시도해주세요.');
      }
    } catch (error) {}
  };

  const handlePasswordPage = () => {
    navigate('/find');
    dispatch(setIsOpen(false));
  };

  return (
    <Modal containerStyle={containerStyle}>
      <ModalContainer>
        <AuthTitle>
          <div>본인 인증을 해주세요.</div>
        </AuthTitle>
        <ContentBox>
          <label htmlFor="passwordInput">
            <input
              ref={passwordInputRef}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="비밀번호 입력"
              type="password"
              id="passwordInput"
            ></input>
          </label>
        </ContentBox>
        <BtnBox>
          <button onClick={handlePasswordPage}>비밀번호 찾기</button>
          <button onClick={handlePasswordCheck}>확인</button>
        </BtnBox>
      </ModalContainer>
    </Modal>
  );
};

export default PasswordModal;

//모달

const containerStyle = `
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
font-family: 'Noto Sans KR', sans-serif;
  font-weight: 700;
  color: #5f5013;

`;

const ModalPage = styled.div`
  /* width: 390px;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 700;
  color: #5f5013;
  background-color: red; */
`;

const ModalContainer = styled.div`
  width: 370px;
  height: 27vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  box-shadow:
    rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px,
    rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px,
    rgba(0, 0, 0, 0.09) 0px -3px 5px;
  z-index: 1000;
  border-radius: 5px;
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
  }
`;

const ContentBox = styled.div`
  width: 100%;
  height: 9vh;
  display: flex;
  justify-content: center;
  align-items: center;
  //비밀번호 테두리
  & > label {
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
      font-size: 30px;
      &:focus {
        outline: none;
      }
      &::placeholder {
        color: #a5a5a5;
        font-weight: 700;
        font-size: 20px;
        font-family: 'Noto Sans KR';
      }
    }
  }
`;

//확인버튼
const BtnBox = styled.div`
  width: 95%;
  height: 9vh;
  display: flex;
  justify-content: space-between;
  & button:first-child {
    border: none;
    height: 3vh;
    background-color: transparent;
    color: #5f5013;
    font-family: 'Noto Sans KR';
    font-weight: 700;
    cursor: pointer;
  }
  & > button:last-child {
    border: none;
    width: 3.5rem;
    height: 4vh;
    background-color: #f2d8b2;
    color: black;
    font-family: 'Noto Sans KR';
    font-weight: 700;
    cursor: pointer;
  }
`;
