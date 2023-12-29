import React, { useCallback, useState, useEffect } from 'react';
import { LogoBar, NavBar } from '../components/common/Header.js';
import styled from 'styled-components';
import axios from 'axios';
import { api } from '../utils/api.js';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';

function SignOut() {
  const [state, setState] = useState(false);
  const navigate = useNavigate();
  const signout = async () => {
    try {
      const response = await api.delete('/auth/my-page');
      setState(true);
      return Promise.resolve(response); // 성공 시 resolve
    } catch (err) {
      console.log(err);
      setState(false);
      return Promise.reject(err); // 실패 시 reject
    }
  };

  const btnClick = async () => {
    Swal.fire({
      title: '정말로 그렇게 하시겠습니까?',
      text: '다시 되돌릴 수 없습니다. 신중하세요.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#bdaf74',
      cancelButtonColor: '#d9d9d9',
      confirmButtonText: '승인',
      cancelButtonText: '취소',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await signout();
          Swal.fire('탈퇴가 완료되었습니다.', '화끈하시네요~!', 'success');
          localStorage.removeItem('userToken');
          navigate('/loginPage');
          setState(false);
        } catch (err) {
          Swal.fire(
            '탈퇴를 실패하였습니다',
            '로그인상태를 확인하여주세요',
            'error',
          );
        }
      }
    });
  };

  return (
    <Wraper>
      <LogoBar />
      <NavBar />
      <UiDiv>
        <ContainerBox>
          <div className="title">
            <h2>탈퇴안내</h2>
            <h5>회원탈퇴를 신청하기 전에 안내 사항을 꼭 확인해주세요</h5>
          </div>
          <div className="info">
            <h5>
              <p>사용하고 계신 계정을 탈퇴할 경우</p>
              <p>데이터 복구가 불가능합니다.</p>
            </h5>
            <LongBtn
              width="100%"
              height="12%"
              className="colored"
              onClick={btnClick}
            >
              탈퇴하기
            </LongBtn>
          </div>
        </ContainerBox>
      </UiDiv>
    </Wraper>
  );
}
const Wraper = styled.div`
  width: 100%;
  height: 100vh;
  //   background: black;
`;
const UiDiv = styled.div`
  width: 100%;
  height: 88vh;
//   background: blue;
  display: flex;
  align-items: center;
  justify-content: center;
  }
`;
const ContainerBox = styled.div`
  width: ${(props) => props.width || '354px'};
  height: ${(props) => props.height || '513px'};
  border-radius: 5px;
  border: 1px solid #bdaf74;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  //   box-shadow: 0px 8px 13px -3px rgba(0, 0, 0, 0.07);
  .title {
    width: 90%;
    height: 30%;
    // background: blue;
  }
  .info {
    width: 90%;
    height: 60%;
    // background: red;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
`;
const LongBtn = styled.div`
  padding: 8px 25px;
  border-radius: 4px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.width || '354px'};
  height: ${(props) => props.height || '513px'};

  font-family: Noto Sans KR;
  font-size: 100%;
  font-weight: 500;
  &.colored {
    background: #bdaf74;
    color: #fff;
  }
  &.stroked {
    background: #fff;
    border: 1px solid #bdaf74;
    color: #bdaf74;
  }
  &:hover {
    background: #5f5013;
    color: white;
    transition: 0.5s;
  }
`;

export default SignOut;
