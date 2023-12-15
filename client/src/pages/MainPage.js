import React, { useEffect, useState } from 'react';
import { LogoBar,NavBar } from '../components/common/Header';
import { LongColoredBtn,LongStrokedBtn,SmallBtn } from '../components/common/Buttons';
import { ContainerBox,TextInputBox } from '../components/common/Boxes';
import { Modal, ModalContainer } from '../components/common/Modal';
import Map from '../components/myMapPage/Map';

function MainPage(){
    const customModalStyle = `
    width: 371px;
    height: 500px;
  `;
  const containerStyle=`
  display:flex;
  justify-content:center;
  align-items:center;
 
  `
  const [showModal, setShowModal] = useState(false);
  function handleModalClose(){
    setShowModal(false);
  }


    return(
        <div>
            <LogoBar/>
            <NavBar/>
            <LongColoredBtn text={'안녕'}/>
            <LongStrokedBtn text={'cancel'}/>
            <SmallBtn text={'등록'}/>
            <SmallBtn text={'중복확인'}/>
            <SmallBtn text={'확인'}/>
            <ContainerBox/>
            <TextInputBox placeholder={'내용을 입력하세요.'}/>
            <button onClick={()=>{setShowModal(true)}}>모달보여줘</button>
            {showModal ? <Modal content = {<div>안녕</div>} customModalStyle={customModalStyle} containerStyle={containerStyle} onClose={handleModalClose}></Modal>:''}
            
            
        </div>
    )
}

export default MainPage;