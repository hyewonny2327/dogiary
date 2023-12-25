import React, { useCallback, useState, useEffect } from 'react';
import { LogoBar, NavBar } from '../components/common/Header';
import {
  LongColoredBtn,
  LongStrokedBtn,
  SmallBtn,
} from '../components/common/Buttons';
import { ContainerBox, InputBox } from '../components/common/Boxes'; // Removed StyledContainerBox
import styled from 'styled-components';
import axios from 'axios';
import { api } from '../utils/api.js';

function FindIdPassword() {
  const [isIdClicked, setIsPublicClicked] = useState(true);
  const [isPasswordClicked, setIsPrivateClicked] = useState(false);
  const [inputValue, setInputValue] = useState(' ');
  const [token, setToken] = useState('');

  useEffect(() => {
    const userToken = localStorage.getItem('Token');
    setToken(userToken);
  }, []);
  function handleTabClick() {
    setIsPublicClicked(!isIdClicked);
    setIsPrivateClicked(!isPasswordClicked);
  }
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const findIdApi = async () => {
    try {
      const data = {
        email: inputValue,
      };
      console.log(inputValue);
      const response = await axios.post(
        'http://localhost:8080/api/auth/find-id',
        data,
        console.log(1),
      );
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Wraper>
      <LogoBar />
      <NavBar />
      <FindUi>
        <ContainerBox>
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
              <h4>찾고자 하는 아이디의 이메일을 입력해주세요</h4>
              <ContainerBox width="90%" height="50%">
                <SendDiv>
                  <div
                    style={{
                      width: '100%',
                      height: '15%',
                      display: 'flex',
                      justifyContent: 'center',
                      //   alignItems: 'center',
                    }}
                  >
                    <h5>이메일이 정상적으로 발송되었습니다</h5>
                  </div>
                  <ContainerBox width="80%" height="15%">
                    <Input
                      type="text"
                      placeholder="이메일을 입력해주세요"
                      value={inputValue}
                      onChange={handleInputChange}
                    />
                  </ContainerBox>
                  <LongColoredBtn
                    onClick={findIdApi}
                    text="이메일로 아이디받기"
                  ></LongColoredBtn>
                </SendDiv>
              </ContainerBox>
            </div>
          ) : (
            <div className="find">
              <h4>찾고자 하는 비밀번호의 아이디를 입력해주세요</h4>
              <ContainerBox width="90%" height="50%">
                <SendDiv>
                  <div
                    style={{
                      width: '100%',
                      height: '15%',
                      display: 'flex',
                      justifyContent: 'center',
                      //   alignItems: 'center',
                    }}
                  >
                    <h5>이메일이 정상적으로 발송되었습니다</h5>
                  </div>
                  <ContainerBox width="80%" height="15%">
                    <Input
                      type="text"
                      placeholder="아이디를 입력해주세요"
                      value={inputValue}
                      onChange={handleInputChange}
                    />
                  </ContainerBox>
                  <LongColoredBtn
                    onClick={() => {
                      console.log(inputValue);
                    }}
                    text="임시 비밀번호 받기"
                  ></LongColoredBtn>
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
  background: black;
`;
const FindUi = styled.div`
  width: 100%;
  height: 88vh;
  background: blue;
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
  background: red;
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
    background: blue;
  }
  .clicked {
    background: black;
    color: #5f5013;
  }
`;
const Input = styled.input`
  width: 98%;
  height: 90%;
  border: none;
  border-radius: 5px;
  //   background: black;
`;
export default FindIdPassword;
