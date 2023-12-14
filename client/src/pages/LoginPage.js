// 로그인 페이지 컴포넌트
import React, { useState } from 'react';
import { LogoBar, NavBar } from '../components/common/Header';
import { LongColoredBtn, LongStrokedBtn, SmallBtn } from '../components/common/Buttons';
import { ContainerBox, TextInputBox } from '../components/common/Boxes';
import { Modal } from '../components/common/Modal';

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

  const [showModal, setShowModal] = useState(false);

  function handleModalClose() {
    setShowModal(false);
  }

  return (
    <div>
      <LogoBar />
      <NavBar />
      <ContainerBox />
      <TextInputBox placeholder={'UserId'} />
      <TextInputBox placeholder={'Password'} type="password" />
      <SmallBtn text={'Log In'} />
      <SmallBtn text={'Sign Up'} />
      <button onClick={() => setShowModal(true)}>Show Modal</button>
    </div>
  );
}

export default LoginPage;
