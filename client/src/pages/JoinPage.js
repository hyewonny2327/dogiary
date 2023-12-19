import React, { useCallback, useState } from "react";
import { LogoBar, NavBar } from "../components/common/Header";
import { LongColoredBtn, SmallBtn } from "../components/common/Buttons";
import { ContainerBox, InputBox } from "../components/common/Boxes"; // Removed StyledContainerBox
import styled from "styled-components";
import axios from "axios";

function JoinPage() {
  const [nickname, setNickname] = useState("");
  const [user_Id, setUser_Id] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [CheckPassword, setCheckPassword] = useState("");
  const [pwdMsg, setPwdMsg] = useState("");
  const [confirmPwdMsg, setConfirmPwdMsg] = useState("");

  const handleChangeNickname = (e) => {
    setNickname(e.target.value);
  };

  const handleChangeUserId = (e) => {
    setUser_Id(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const PasswordValid = (Password) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,25}$/;
    return passwordRegex.test(password);
  };

  const handleChangePassword = useCallback((e) => {
    const currPassword = e.target.value;
    setPassword(currPassword);

    if (!PasswordValid(currPassword)) {
      setPwdMsg("영문, 숫자가 포함된 6자리 이상");
    } else {
      setPwdMsg("안전한 비밀번호입니다.");
    }
  }, []);

  const handleChangeCheckPassword = useCallback(
    (e) => {
      const CheckPassword = e.target.value;
      setCheckPassword(CheckPassword);

      if (CheckPassword !== password) {
        setConfirmPwdMsg("비밀번호가 일치하지 않습니다.");
      } else {
        setConfirmPwdMsg("비밀번호가 일치합니다.");
      }
    },
    [password]
  );

  const handleJoin = async () => {
    console.log("함수 시작");
    if (!PasswordValid(password)) {
      setPwdMsg("영문, 숫자가 포함된 6자리 이상");
      console.log("이프1");
      return;
    }

    if (password !== CheckPassword) {
      setConfirmPwdMsg("비밀번호가 일치하지 않습니다.");
      console.log("이프2");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/auth/sign-up", {
        email,
        userId: user_Id,
        nickName: nickname,
        password,
      });
      console.log("회원가입 성공");
    } catch (e) {
      console.error("회원가입에 실패했습니다.", e);
    }
  };

  return (
    <div>
      <LogoBar />
      <NavBar />
      <Main>
        <ContainerBox>
            <JoinContents className="contents-box">
              <div className="text-box">
                <h3 className="title">회원가입</h3>
                <span>가입을 통해서 다양한 서비스를 이용해보세요!</span>
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
                  <SmallBtn text={"중복확인"} />
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
                  <SmallBtn text={"중복확인"} />
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
                  <SmallBtn text={"인증"} />
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
                <div>{pwdMsg}</div>
                <div>{confirmPwdMsg}</div>
              </div>
              <div className="btn-box" onClick={handleJoin}>
                <LongColoredBtn text={"가입하기"} className="long-btn" />
              </div>
            </JoinContents>
        </ContainerBox>
      </Main>
    </div>
  );
}

const JoinContents = styled.div`

  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:center;
  //margin:35px;
  .title {
    margin: 0;
  }
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
    width: 200px;
  }

  .small-box-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    cursor: pointer;
  }

  .btn-box {
    margin-top: 10px;
    cursor: pointer;
  }
  

 
  
`;

const Main = styled.div`
 
  display: flex;
  margin-top: 80px;
  align-items: center;
  justify-content: center;
`;

export default JoinPage;
