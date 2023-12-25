import { styled } from 'styled-components';
import { LongColoredBtn } from '../common/Buttons';

import { useDispatch, useSelector } from 'react-redux';
import { setIsOpen } from '../../slice/store';

import PasswordModal from './PasswordModal';

const ReadContent = () => {
  const dispatch = useDispatch();
  const isModalopen = useSelector((state) => state.modal.isOpen);

  const handleEditPage = () => {
    console.log('클릭');
    dispatch(setIsOpen(true));
    // navigate('/profile/update');
  };

  return (
    <>
      <ProfileContent>
        <NicknameWrapper>
          <div>닉네임</div>
          <div>
            <div>몽이마덜</div>
          </div>
        </NicknameWrapper>
        <IdWrapper>
          <div>아이디</div>
          <div>
            <div>mong333</div>
          </div>
        </IdWrapper>
        <EmailWrapper>
          <div>이메일</div>
          <div>
            <div>mong@naver.com</div>
          </div>
        </EmailWrapper>
        <ButtonWrapper>
          <LongColoredBtn
            onClick={handleEditPage}
            style={{ cursor: 'pointer' }}
          >
            회원 정보 수정
          </LongColoredBtn>
        </ButtonWrapper>
      </ProfileContent>
      {isModalopen && <PasswordModal />}
    </>
  );
};

export default ReadContent;

const ProfileContent = styled.div`
  width: 80%;
  height: 24vh;
  border-radius: 5px;
  border: 2px solid #bdaf74;
`;

const NicknameWrapper = styled.div`
  width: 100%;
  height: 6vh;
  display: flex;
  justify-content: space-between;
  & > div:first-child {
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 2px solid #bdaf74;
    border-bottom: 2px solid #bdaf74;
  }
  & > div:last-child {
    width: 80%;
    height: 100%;
    display: flex;
    align-items: center;
    border-bottom: 2px solid #bdaf74;
    justify-content: center;
    & > div {
      width: 70%;
      height: 3vh;
      display: flex;
      align-items: center;
    }
  }
`;

const IdWrapper = styled.div`
  width: 100%;
  height: 6vh;
  display: flex;
  justify-content: space-between;
  & > div:first-child {
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 2px solid #bdaf74;
    border-bottom: 2px solid #bdaf74;
  }
  & > div:last-child {
    width: 80%;
    height: 100%;
    display: flex;
    align-items: center;
    border-bottom: 2px solid #bdaf74;
    justify-content: center;
    & > div {
      width: 70%;
      height: 3vh;
      display: flex;
      align-items: center;
    }
  }
`;

const EmailWrapper = styled.div`
  width: 100%;
  height: 6vh;
  display: flex;
  justify-content: space-between;
  & > div:first-child {
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 2px solid #bdaf74;
  }
  & > div:last-child {
    width: 80%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    & > div {
      width: 70%;
      height: 3vh;
      display: flex;
      align-items: center;
    }
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 6vh;
  justify-content: center;
  align-items: center;
  border-top: 2px solid #bdaf74;
  border-radius: 5px;

  &:hover {
    cursor: pointer;
  }
`;
