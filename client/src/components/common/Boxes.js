import React from 'react';
import styled from 'styled-components';

export function ContainerBox({ children }) {
  return <ContainerBoxStyle>{children}</ContainerBoxStyle>;
}

export function InputBox({ children }) {
  return <InputBoxStyle>{children}</InputBoxStyle>;
}

const ContainerBoxStyle = styled.div`
  width: 354px;
  height: 513px;
  border-radius: 5px;
  border: 1px solid #bdaf74;
  background: #fff;
  box-shadow: 0px 8px 13px -3px rgba(0, 0, 0, 0.07);
`;
const InputBoxStyle = styled.div`
  input {
    width: 284px;
    height: 29px;
    border-radius: 4px;
    border: 1px solid #bdaf74;
    background: rgba(255, 255, 255, 0);
  }
`;
