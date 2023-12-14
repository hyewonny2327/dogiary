import React, { useContext, useEffect, useState } from 'react';
import { LogoBar,NavBar } from '../components/common/Header';
import { LongColoredBtn,LongStrokedBtn,SmallBtn } from '../components/common/Buttons';
import { ContainerBox,InputBox } from '../components/common/Boxes';
import { Modal, ModalContainer } from '../components/common/Modal';
import Map from '../components/myMapPage/Map';
import styled from 'styled-components';
import Dropdown from '../components/common/Dropdown';
import { DropdownProvider,useDropdown } from '../hooks/useDropdown';
function MainPage(){
  
  
  const [showModal, setShowModal] = useState(false);
  function handleModalClose(){
    setShowModal(false);
  }

  const options=[
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ]
  const { selectedOption } = useDropdown();

    return(
        <div>
            <LogoBar/>
            <NavBar/>
            <LongColoredBtn text={'안녕'}/>
            <LongStrokedBtn text={'cancel'}/>
            <SmallBtn text={'등록'}/>
            
            <ContainerBox>
              <BoxStyle>
                안녕하세요! 
                <SmallBtn text={'중복확인'}/>
                <SmallBtn text={'확인'}/>
              </BoxStyle>
            </ContainerBox>
            <InputBox>
              <input type='text' placeholder='내용을 입력하세요'/>
            </InputBox>
            <button onClick={()=>{setShowModal(true)}}>모달보여줘</button>
            {/* {showModal ? <Modal content = {<div>안녕</div>} customModalStyle={customModalStyle} containerStyle={containerStyle} onClose={handleModalClose}></Modal>:''} */}
            {showModal ? 
            <Modal  containerStyle={containerStyle} onClose={handleModalClose}>
              <ModalStyle className='container' >
                <div className='content'>안녕</div>
              </ModalStyle>
            </Modal>:''}
            <DropdownProvider>
              <div>
                <h1>my components</h1>
                <Dropdown options={options} placeholder='선택하세요' />
                <p>{selectedOption}를 선택함</p>
              </div>
            </DropdownProvider>

   
            
        </div>
    )
}

export default MainPage;

const containerStyle=`
  display:flex;
  justify-content:center;
  align-items:center;
 `

const ModalStyle = styled.div`
&.container{
  width:900px;
  height:100px;
}
&.content{
  color:red;
}
`

const BoxStyle=styled.div`
width:100%;
height:100%;
display:flex;
flex-direction:row;
justify-content:center;
align-items:center;
`