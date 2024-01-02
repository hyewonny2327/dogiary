import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { setIsOpen } from '../../slice/store';

export function Modal({ children, containerStyle }) {
  const dispatch = useDispatch();
  const isModalClicked = useSelector((state) => state.modal.isOpen);

  const closeModal = () => {
    dispatch(setIsOpen(false));
  };
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return isModalClicked
    ? createPortal(
        <ModalContainerStyle
          containerStyle={containerStyle}
          onClick={closeModal}
        >
          <ModalContentStyle onClick={handleContentClick}>
            {children}
          </ModalContentStyle>
        </ModalContainerStyle>,
        document.body,
      )
    : null;
}

const ModalContainerStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.27);
  z-index: 100000;

  ${(props) => props.containerStyle && props.containerStyle};
`;

const ModalContentStyle = styled.div`
  /* border-radius: 4px; */
  /* background: #fff; */
  /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); */
`;
