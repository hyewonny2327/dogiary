import { styled } from 'styled-components';
import { LongColoredBtn, SmallBtn } from '../common/Buttons';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

const UpdateContent = () => {
  const [nickName, setNickName] = useState('');
  const nickNameInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const [readUserId, setReadUserId] = useState('');
  const [readNickNmae, setReadNickRead] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmed, setPasswordConfirmed] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirmed, setNewPasswordConfirmed] = useState('');
  const [isUpdateEnabled, setUpdateEnabled] = useState(false);
  const userTokenValue = localStorage.getItem('userToken');

  const userIdRead = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8080/api/auth/my-page',
        {
          headers: {
            Authorization: `Bearer ${userTokenValue}`,
            'Content-type': 'application/json',
          },
        },
      );

      const resultUserId = response.data.data.userId;
      const resultNickName = response.data.data.nickName;
      setReadUserId(resultUserId);
      setReadNickRead(resultNickName);
    } catch (err) {
      console.error('에러', err);
    }
  };

  //input 비워주기
  const clearNicknameInputField = () => {
    if (nickNameInputRef.current) {
      nickNameInputRef.current.value = '';
    }
  };

  const clearPasswordInputField = () => {
    if (passwordInputRef.current) {
      passwordInputRef.current.value = '';
    }
  };

  useEffect(() => {
    userIdRead();
  }, []);

  //닉네임 중복확인 Api
  const nicknameCheck = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/auth/check-nickname',
        { nickName: nickName },
      );

      return response.data.data;
    } catch (error) {
      console.error('중복 닉네임:', error);
    }
  };

  //확인Btn
  const handleNicknameCheck = async () => {
    try {
      const result = await nicknameCheck();

      if (result && result.check) {
        alert('사용 가능한 닉네임입니다.');
        setUpdateEnabled(true);
      } else {
        alert('중복된 닉네임입니다. 다시 입력해주세요.');
        clearNicknameInputField();
        setUpdateEnabled(false);
      }
    } catch (error) {
      console.error('닉네임 확인 중 오류 발생:', error);
    }
  };

  //현재 비밀번호 Api

  const PasswordCheck = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/auth/check-password',
        { password },
        {
          headers: {
            Authorization: `Bearer ${userTokenValue}`,
            'Content-type': 'application/json',
          },
        },
      );

      return response.data.data;
    } catch (error) {
      console.error('비밀번호 확인 오류:', error);
    }
  };
  //확인Btn
  const handlePasswordCheck = async () => {
    try {
      const result = await PasswordCheck();

      if (result && result.check) {
        alert('인증되었습니다');
        setPasswordConfirmed(true);
        setUpdateEnabled(true);
      } else {
        alert('다시 한번 입력해주세요');
        clearPasswordInputField();
        setPasswordConfirmed(false);
        setUpdateEnabled(false);
      }
    } catch (error) {
      console.error('비밀번호 확인 오류:', error);
    }
  };

  //수정하기 Api (userID 추후에 제거)

  const userInformationUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append('nickName', nickName);
      formData.append('userId', 'normaljun95');
      formData.append('password', newPassword);
      formData.append(
        'imageUrl',
        new Blob(
          [
            'C:\\Users\\82103\\Desktop\\MyProject\\dogiary\\dogiary\\server\\public\\defaultImage.png',
          ],
          { type: 'image/png' },
        ),
      );

      const response = await axios.put(
        'http://localhost:8080/api/auth/my-page',
        formData,
        {
          headers: {
            Authorization: `Bearer ${userTokenValue}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      return response.data.data;
    } catch (error) {
      console.error('Error during update:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      if (newPassword !== newPasswordConfirmed) {
        alert('새 비밀번호와 확인이 일치해야 합니다.');
        return;
      }

      const result = await userInformationUpdate();

      if (result) {
        alert('회원정보 수정이 완료되었습니다.');
        setNewPassword('');
        setNickName('');
      } else {
        alert('수정 실패');
      }
    } catch (error) {
      console.error('업데이트 중 오류 발생:', error);
    }
  };

  return (
    <ProfileContent>
      <IdWrapper>
        <div>
          <div style={{ fontSize: '13px', fontWeight: 'bold' }}>아이디</div>
        </div>
        <div>{readUserId}</div>
      </IdWrapper>
      <NickNameWrapper>
        <div>
          <div style={{ fontSize: '13px', fontWeight: 'bold' }}>닉네임</div>
        </div>
        <div>
          <label htmlFor="nickNameInput">
            <input
              onChange={(e) => setNickName(e.target.value)}
              value={nickName}
              type="text"
              id="nickNameInput"
              ref={nickNameInputRef}
              placeholder={readNickNmae}
            />
          </label>
          <div>
            <SmallBtn onClick={handleNicknameCheck}>중복확인</SmallBtn>
          </div>
        </div>
      </NickNameWrapper>
      <PasswordWrapper>
        <div>
          <div style={{ fontSize: '13px', fontWeight: 'bold' }}>
            현재비밀번호
          </div>
        </div>
        <div>
          <label htmlFor="passwordInput">
            <input
              type="password"
              id="passwordInput"
              ref={passwordInputRef}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </label>

          <div>
            {passwordConfirmed ? (
              <SmallBtn disabled>인증완료</SmallBtn>
            ) : (
              <SmallBtn onClick={handlePasswordCheck}>인증</SmallBtn>
            )}
          </div>
        </div>
      </PasswordWrapper>
      <NewPasswordWrapper>
        <div>
          <div style={{ fontSize: '13px', fontWeight: 'bold' }}>새비밀번호</div>
        </div>
        <label htmlFor="newPasswordInput">
          <input
            type="password"
            id="newPasswordInput"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </label>
      </NewPasswordWrapper>
      <NewPasswordCheckWrapper>
        <div>
          <div style={{ fontSize: '13px', fontWeight: 'bold' }}>
            새 비밀번호 확인
          </div>
        </div>
        <label htmlFor="newPasswordCheckInput">
          <input
            type="password"
            id="newPasswordCheckInput"
            value={newPasswordConfirmed}
            onChange={(e) => setNewPasswordConfirmed(e.target.value)}
          />
        </label>
      </NewPasswordCheckWrapper>
      <ButtonWrapper>
        <LongColoredBtn onClick={handleUpdate} disabled={!isUpdateEnabled}>
          수정하기
        </LongColoredBtn>
      </ButtonWrapper>
    </ProfileContent>
  );
};

export default UpdateContent;

const ProfileContent = styled.div`
  width: 80%;
  height: 36vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
  border: 2px solid #bdaf74;
`;

//아이디
const IdWrapper = styled.div`
  width: 90%;
  height: 6vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #bdaf74;

  //아이디 Key
  & > div:first-child {
    width: 45%;
    height: 100%;
    display: flex;
    justify-content: end;
    align-items: center;
    & > div {
      width: 90%;
    }
  }

  //아이디 Value
  & > div:last-child {
    width: 55%;
    height: 100%;
    display: flex;
    align-items: center;
    color: #5f5013;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 20px;
    font-weight: 700;
  }
`;

//닉네임
const NickNameWrapper = styled.div`
  width: 90%;
  height: 6vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #bdaf74;

  //닉네임 Key
  & > div:first-child {
    width: 45%;
    height: 100%;
    display: flex;
    justify-content: end;
    align-items: center;
    & > div {
      width: 90%;
    }
  }

  //닉네임 Value text + 중복 button
  & > div:last-child {
    width: 55%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    //닉네임 text
    & > label {
      width: 50%;
      height: 100%;
      display: flex;
      align-items: center;
      & > input {
        font-size: 20px;
        font-family: 'Noto Sans KR', sans-serif;
        font-weight: 700;
        color: #5f5013;
        width: 100%;
        height: 45%;
        border: none;
        overflow: scroll;
        &:focus {
          outline: none;
        }
        &::placeholder {
          color: #a5a5a5;
          font-weight: 700;
          font-size: 20px;
          font-family: 'Noto Sans KR';
        }
        &::-webkit-scrollbar {
          display: none;
        }
      }
    }
    //중복button
    & > div:last-child {
      width: 50%;
      height: 100%;
      display: flex;
      justify-content: end;
      align-items: center;
      cursor: pointer;
    }
  }
`;

//비밀번호
const PasswordWrapper = styled.div`
  width: 90%;
  height: 6vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #bdaf74;

  //현재비밀번호 Key
  & > div:first-child {
    width: 45%;
    height: 100%;
    display: flex;
    justify-content: end;
    align-items: center;
    & > div {
      width: 90%;
    }
  }

  //현재비밀번호text + 중복 button
  & > div:last-child {
    width: 55%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    //현재비밀번호text
    & > label {
      width: 50%;
      height: 100%;
      display: flex;
      align-items: center;
      & > input {
        font-size: 20px;
        width: 100%;
        border: none;
        overflow: scroll;
        &:focus {
          outline: none;
        }
        &::-webkit-scrollbar {
          display: none;
        }
      }
    }
    //인증button
    & > div:last-child {
      width: 50%;
      height: 100%;
      display: flex;
      justify-content: end;
      align-items: center;
    }
  }
`;

//새비밀번호
const NewPasswordWrapper = styled.div`
  width: 90%;
  height: 6vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid #bdaf74;
  // 새비밀번호 Key
  & > div:first-child {
    width: 45%;
    height: 100%;
    display: flex;
    justify-content: end;
    align-items: center;
    & > div {
      width: 90%;
    }
  }

  // 새비밀번호 Value text
  & > label {
    width: 55%;
    height: 100%;
    display: flex;
    align-items: center;

    & > input {
      font-size: 20px;
      width: 100%;
      display: flex;
      border: none;
      overflow: scroll;
      &:focus {
        outline: none;
      }
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
`;

//새비밀번호 확인 체크
const NewPasswordCheckWrapper = styled.div`
  width: 90%;
  height: 6vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid #bdaf74;
  //새비밀번호 확인 체크 Key
  & > div:first-child {
    width: 45%;
    height: 100%;
    display: flex;
    justify-content: end;
    align-items: center;

    & > div {
      width: 90%;
    }
  }

  //새비밀번호 확인 체크 Value text
  & > label {
    width: 55%;
    height: 100%;
    display: flex;
    align-items: center;

    & > input {
      width: 100%;
      display: flex;
      border: none;
      overflow: scroll;
      font-size: 20px;
      &:focus {
        outline: none;
      }
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 6vh;
  justify-content: center;
  align-items: center;

  border-radius: 5px;
`;
