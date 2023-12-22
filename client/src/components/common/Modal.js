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

  return isModalClicked
    ? createPortal(
        <ModalContainerStyle
          containerStyle={containerStyle}
          onClick={closeModal}
        >
          <ModalContentStyle>{children}</ModalContentStyle>
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

  ${(props) => props.containerStyle && props.containerStyle};
`;

const ModalContentStyle = styled.div`
  // border-radius: 4px;
  // background: #FFF;
  // box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;

/**
 * ! 언제 redux를 사용해야할까?
 * ? 'props로 state를 주고받아야 하는 경우 사용해야한다'라고하는데 그러면 ..
 * modal 컴포넌트의 경우, 모달 컨테이너를 클릭하면, 특정 페이지에서 isButtonClicked 상태를 받아와서 false로 바꿔줘야한다.
 * 이런경우 redux를 사용하는게 맞나 ???
 * redux를 쓰면 onClose를 props로 안받아와도 되니까???
 *
 * button 컴포넌트의 경우 안에 들어갈 text를 props로 받아와서 넣어주는데 이런건 굳이 redux를 안써도 되겠지 ??
 *
 * !어떤 컴포넌트나 페이지에 종속되면 안되니까 redux 스토어에서 관리한다.
 * !모달 뜨고안뜨고 상태 -> 리덕스 스토어에만 영향, 종속x
 * ! 유저의 인증상태 : 로그인여부같은거
 */
