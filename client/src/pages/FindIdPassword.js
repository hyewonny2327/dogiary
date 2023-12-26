import React, { useCallback, useState, useEffect } from 'react';
import { LogoBar, NavBar } from '../components/common/Header';
import styled from 'styled-components';
import axios from 'axios';
import Swal from 'sweetalert2';

function FindIdPassword() {
  const [isIdClicked, setIsPublicClicked] = useState(true);
  const [isPasswordClicked, setIsPrivateClicked] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [state, setState] = useState(false);
  function handleTabClick() {
    setIsPublicClicked(!isIdClicked);
    setIsPrivateClicked(!isPasswordClicked);
    setState(false);
    setInputValue('');
  }
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const isEmailValid = (email) => {
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailValid.test(email);
  };
  const findId = async () => {
    try {
      if (!isEmailValid(inputValue)) {
        throw new Error('이메일 형식이 올바르지 않습니다');
      }
      const data = {
        email: inputValue,
      };

      const response = await axios.post(
        'http://localhost:8080/api/auth/find-id',
        data,
      );
      await Swal.fire(
        '전송이 완료되었습니다.',
        '이메일을 확인 해주세요!',
        'success',
      );
      setState(true);
      setInputValue('');
    } catch (err) {
      await Swal.fire({
        icon: 'error',
        title: '실패하였습니다',
        text: '입력하신 이메일을 다시 확인하여 주세요!',
      });
      console.log(err);
    }
  };
  const findPassword = async () => {
    try {
      if (!isEmailValid(inputValue)) {
        throw new Error('이메일 형식이 올바르지 않습니다');
      }
      const data = {
        email: inputValue,
      };
      const response = await axios.post(
        'http://localhost:8080/api/auth/help',
        data,
      );
      await Swal.fire(
        '전송이 완료되었습니다.',
        '이메일을 확인 해주세요!',
        'success',
      );
      setState(true);
      setInputValue('');
    } catch (err) {
      await Swal.fire({
        icon: 'error',
        title: '실패하였습니다',
        text: '입력하신 이메일을 다시 확인하여 주세요!',
      });
      console.log(err);
    }
  };

  return (
    <Wraper>
      <LogoBar />
      <NavBar />
      <FindUi>
        <ContainerBox width="90%" height="50%">
          <TabContainer>
            <div
              className={isIdClicked ? 'tab clicked' : 'tab'}
              onClick={handleTabClick}
            >
              아이디찾기
            </div>
            <div
              className={isPasswordClicked ? 'tab clicked' : 'tab'}
              onClick={handleTabClick}
            >
              비밀번호 찾기
            </div>
          </TabContainer>
          {isIdClicked ? (
            <div className="find">
              {/* <h4>찾고자 하는 아이디의 이메일을 입력해주세요</h4> */}
              <ContainerBox width="90%" height="80%">
                <SendDiv>
                  <div
                    style={{
                      width: '100%',
                      height: '15%',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    {state ? (
                      <h5>이메일로 정상적으로 발송되었습니다!</h5>
                    ) : (
                      <h5>입력된 이메일로 아이디가전송됩니다</h5>
                    )}
                  </div>
                  <ContainerBox width="80%" height="15%">
                    <Input
                      type="text"
                      placeholder="이메일을 입력해주세요"
                      value={inputValue}
                      onChange={handleInputChange}
                    />
                  </ContainerBox>
                  <LongBtn
                    width="90%"
                    height="15%"
                    className="colored"
                    onClick={findId}
                  >
                    이메일로 아이디받기
                  </LongBtn>
                </SendDiv>
              </ContainerBox>
            </div>
          ) : (
            <div className="find">
              <ContainerBox width="90%" height="80%">
                <SendDiv>
                  <div
                    style={{
                      width: '100%',
                      height: '15%',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    {state ? (
                      <h5>임시 비밀번호가 정상적으로 발급되었습니다!</h5>
                    ) : (
                      <h5>이메일을 입력시 임시비밀번호가 발급됩니다.</h5>
                    )}
                  </div>
                  <ContainerBox width="80%" height="15%">
                    <Input
                      type="text"
                      placeholder="이메일을 입력해주세요"
                      value={inputValue}
                      onChange={handleInputChange}
                    />
                  </ContainerBox>
                  <LongBtn
                    width="90%"
                    height="15%"
                    className="colored"
                    onClick={findPassword}
                  >
                    임시 비밀번호 받기
                  </LongBtn>
                </SendDiv>
              </ContainerBox>
            </div>
          )}
        </ContainerBox>
      </FindUi>
    </Wraper>
  );
}
const Wraper = styled.div`
  width: 100%;
  height: 100vh;
  //   background: black;
`;
const FindUi = styled.div`
  width: 100%;
  height: 88vh;
  //   background: blue;
  display: flex;
  align-items: center;
  justify-content: center;
  .find {
    width: 100%;
    height: 80%;
    // background: black;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
const SendDiv = styled.div`
  width: 100%;
  height: 100%;
  //   background: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;
const TabContainer = styled.div`
  width: 100%;
  height: 20%;
  //   background: red;
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: #d9d9d9;

  .tab {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40%;
    height: 90%;
    // background: blue;
  }
  .clicked {
    // background: black;
    color: #5f5013;
  }
`;
const Input = styled.input`
  width: 98%;
  height: 90%;
  border: none;
  border-radius: 5px;
`;
const ContainerBox = styled.div`
  width: ${(props) => props.width || '354px'};
  height: ${(props) => props.height || '513px'};
  border-radius: 5px;
  border: 1px solid #bdaf74;
  background: #fff;
  //   box-shadow: 0px 8px 13px -3px rgba(0, 0, 0, 0.07);
`;
const LongBtn = styled.div`
  padding: 8px 25px;
  border-radius: 4px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.width || '354px'};
  height: ${(props) => props.height || '513px'};

  font-family: Noto Sans KR;
  font-size: 100%;
  font-weight: 500;
  &.colored {
    background: #bdaf74;
    color: #fff;
  }
  &.stroked {
    background: #fff;
    border: 1px solid #bdaf74;
    color: #bdaf74;
  }
`;
export default FindIdPassword;
