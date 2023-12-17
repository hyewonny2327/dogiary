import React, { useState } from 'react';
import { LogoBar, NavBar } from '../components/common/Header';
import { LongColoredBtn, SmallBtn } from '../components/common/Buttons';
import { ContainerBox, InputBox } from '../components/common/Boxes';  // Removed StyledContainerBox
import styled from 'styled-components';

function JoinPage() {

    const [nickname, setNickname] = useState('');
    const [user_Id, setUser_Id] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [CheckPassword, setCheckPassword] = useState('');

    const handleChangeNickname = (e) => {
        setNickname(e.target.value);
      };

      const handleChangeUserId = (e) => {
        setUser_Id(e.target.value);
      };

      const handleChangeEmail = (e) => {
        setEmail(e.target.value);
      };

      const handleChangePassword = (e) => {
        setPassword(e.target.value);
      };

      const handleChangeCheckPassword = (e) => {
        setCheckPassword(e.target.value);
      };



    return (
        <div>
            <LogoBar />
            <NavBar />
            <Main>
                <ContainerBox>
                    <JoinContents className="contents-box">
                    <div className="text-box">
                        <h3>회원가입</h3>
                        <a>가입을 통해서 다양한 서비스를 이용해보세요!</a>
                    </div> 
                    <div>
                        <div className="small-box-content">
                            <InputBox>
                                <input
                                className="form-input-small"
                                value={nickname}
                                type="text"
                                name="nickname"
                                id="nickname"
                                placeholder="닉네임 입력"
                                onChange={handleChangeNickname}
                                />
                            </InputBox>
                            <SmallBtn text={'중복확인'}/>
                        </div>
                        <div className="small-box-content">
                            <InputBox>
                                <input
                                className="form-input-small"
                                value={user_Id}
                                type="text"
                                name="user_Id"
                                id="user_Id"
                                placeholder="아이디 입력"
                                onChange={handleChangeUserId}
                                />
                            </InputBox>
                            <SmallBtn text={'중복확인'}/>
                        </div>
                        <div className="small-box-content">
                            <InputBox>
                                <input
                                className="form-input-small"
                                value={email}
                                type="text"
                                name="email"
                                id="email"
                                placeholder="이메일 입력"
                                onChange={handleChangeEmail}
                                />
                            </InputBox>
                            <SmallBtn text={'인증'}/>
                        </div>
                        <InputBox>
                            <input
                            className="form-input"
                            value={password}
                            type="password"
                            name="password"
                            id="password"
                            placeholder="비밀번호 입력"
                            onChange={handleChangePassword}
                            />
                        </InputBox>

                        <InputBox>
                            <input
                            className="form-input"
                            value={CheckPassword}
                            type="password"
                            name="CheckPassword"
                            id="CheckPassword"
                            placeholder="비밀번호 재입력"
                            onChange={handleChangeCheckPassword}
                            />
                        </InputBox>
                    </div>
                    <div className="btn-box">
                        <LongColoredBtn text={'가입하기'} className="long-btn" />
                    </div>
                    </JoinContents>
                </ContainerBox>
            </Main>
        </div>
    );
}

const JoinContents =styled.div`

.text-box {
    margin-left: 35px;
    margin-right: 35px;
    margin-bottom: 30px;
    text-align: center;
  }

  .form-input {
    margin-top: 5px;
    margin-bottom: 10px;
  }

  .form-input-small {
    width:200px;
  }

  .small-box-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

  .btn-box {
    margin-top: 10px;
  }

display: flex;
flex-direction: column;
margin-top: 70px;
align-items: center;

`;

const Main = styled.div`
  display: flex;
  margin-top: 80px;
  align-items: center;
  justify-content: center;
`;

export default JoinPage;