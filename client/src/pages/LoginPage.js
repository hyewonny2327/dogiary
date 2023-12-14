// 로그인 페이지 컴포넌트
import React, { useState } from 'react';
import { LogoBar, NavBar } from '../components/common/Header';
import { LongColoredBtn, LongStrokedBtn, SmallBtn } from '../components/common/Buttons';
import { ContainerBox, InputBox } from '../components/common/Boxes';
import { Modal } from '../components/common/Modal';

// YourFormComponent를 밖으로 빼고 함수 컴포넌트로 선언
function YourFormComponent() {
  const [user_Id, setUser_Id] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeUserId = (e) => {
    setUser_Id(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const submitForm = () => {
    console.log('Submit form!', user_Id, password);
  };

  return (
    <div>
      <LogoBar/>
      <NavBar/>
      <form>
      <ContainerBox>
      <InputBox>
        <label htmlFor="user_Id">아이디</label>
        <input
          className="form-input"
          value={user_Id}
          type="text"
          name="user_Id"
          id="user_Id"
          placeholder="아이디 입력"
          onChange={handleChangeUserId}
        />
      </InputBox>

      <InputBox>
        <label htmlFor="password">비밀번호</label>
        <input
          className="form-input"
          value={password}
          type="password"
          name="password"
          id="password"
          placeholder="비밀번호 입력"
          onChange={handleChangePassword}
        />
        <div>비밀번호는 영문, 숫자 포함 8자 이상</div>
      </InputBox>

      <div>
        <button type="submit" onClick={submitForm}>
          확인
        </button>
      </div>
      </ContainerBox>
    </form>
    </div>
    
  );
}

function LoginPage() {
  const customModalStyle = `
    width: 371px;
    height: 500px;
  `;
  const containerStyle = `
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  return (
    <>
      {/* YourFormComponent */}
      <YourFormComponent />
      {}
    </>
  );
}

export default LoginPage;
