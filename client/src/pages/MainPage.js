import React, { useContext, useEffect, useState } from 'react';
import { LogoBar,NavBar } from '../components/common/Header';
import { LongColoredBtn,LongStrokedBtn,SmallBtn } from '../components/common/Buttons';
import { ContainerBox,InputBox } from '../components/common/Boxes';
import { Modal, ModalContainer } from '../components/common/Modal';
import Map from '../components/myMapPage/Map';
import styled from 'styled-components';
import { getAddress } from '../utils/getAddress';
import { registerMyPlace } from '../utils/mapApi';
import { deleteMyPlace } from '../utils/mapApi';
import { useDispatch, useSelector } from 'react-redux';
import { setIsOpen } from '../slice/store';
import Calendar from '../components/myFeedPage/CalendarComponent';
function MainPage(){
  
  const dispatch = useDispatch();
  const isOpen = useSelector((state)=>state.modal.isOpen)

  function handleModalClose(){
    dispatch(setIsOpen(true));
  }

    return(
        <div>
            <LogoBar/>
            <NavBar/>
            <Calendar/>
            
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
  width:300px;
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