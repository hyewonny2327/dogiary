import { styled } from 'styled-components';
import Title from './Title';
import Content from './Content';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  userInformationUpdate,
  userSecession,
} from '../../utils/userInformation';

const ContentUpdateContainer = () => {
  const [nickName, setNickName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirmed, setNewPasswordConfirmed] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  //수정하기 Btn
  const handleUpdate = async () => {
    try {
      if (newPassword !== newPasswordConfirmed) {
        alert('새 비밀번호와 확인이 일치해야 합니다.');
        return;
      }

      const result = await userInformationUpdate(
        nickName,
        newPassword,
        imageFile,
      );

      if (result) {
        alert('회원정보 수정이 완료되었습니다.');
        navigate('/profile');
      } else {
        alert('수정 실패');
      }
    } catch (error) {
      console.error('업데이트 중 오류 발생:', error);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageFile(url);
    }
  };

  const handleUserSecession = async () => {
    try {
      const result = await userSecession();
      if (result) {
        if (newPassword !== newPasswordConfirmed) {
          alert('새 비밀번호와 확인이 일치해야 합니다.');
          return;
        }

        alert('회원탈퇴가 완료되었습니다.');
      } else {
        alert('탈퇴 실패');
      }
    } catch (error) {
      console.error('탈퇴 중 오류 발생:', error);
    }
  };

  return (
    <ContentWrapper>
      <Title
        isEdit
        handleImageUpload={handleImageUpload}
        imageFile={imageFile}
        setImageFile={setImageFile}
      />
      <Content
        isEdit
        nickName={nickName}
        setNickName={setNickName}
        newPassword={newPassword}
        setNewPassword={setNewPassword}
        newPasswordConfirmed={newPasswordConfirmed}
        setNewPasswordConfirmed={setNewPasswordConfirmed}
        handleUpdate={handleUpdate}
      />

      <SecessionBtn onClick={handleUserSecession}>
        회원탈퇴
        <FontAwesomeIcon icon={faAngleRight} />
      </SecessionBtn>
    </ContentWrapper>
  );
};

export default ContentUpdateContainer;

const ContentWrapper = styled.div`
  width: 390px;
  height: 844px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SecessionBtn = styled.button`
  border: none;
  width: 80%;
  height: 50px;
  display: flex;
  align-items: center;
  background-color: transparent;
  font-size: 16px;
  font-weight: 700;
  color: #b6b6b6;
`;
