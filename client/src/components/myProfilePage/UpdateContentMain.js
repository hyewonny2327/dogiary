import { styled } from 'styled-components';
import { LongColoredBtn, SmallBtn } from '../common/Buttons';
import { useRef, useState } from 'react';
import { PasswordCheck, nicknameCheck } from '../../utils/userInformation';

const UpdateContentMain = ({
  nickName,
  setNickName,
  newPassword,
  setNewPassword,
  newPasswordConfirmed,
  setNewPasswordConfirmed,
  handleUpdate,
  readUserId,
  readNickName,
  setUpdateEnabled,
  isUpdateEnabled,
  setWithdrawalPassword,
}) => {
  const nickNameInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const [password, setPassword] = useState('');
  const [passwordConfirmed, setPasswordConfirmed] = useState(false);

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

  //닉네임 중복 확인 Btn
  const handleNicknameCheck = async () => {
    try {
      // 최소 길이 확인
      if (nickName.length < 2) {
        alert('닉네임은 최소 2자 이상이어야 합니다.');
        return;
      }
      // 공백 확인
      if (nickName.includes(' ')) {
        alert('닉네임에는 공백을 포함할 수 없습니다. 다시 입력해주세요.');
        // 비워주기
        clearNicknameInputField();
        // 조건 boolean
        setUpdateEnabled(false);
        return;
      }
      // 중복 닉네임 확인
      const result = await nicknameCheck(nickName);
      if (result && result.check) {
        alert('사용 가능한 닉네임입니다.');
        // 조건 boolean
        setUpdateEnabled(true);
      } else {
        alert('중복된 닉네임입니다. 다시 입력해주세요.');
        clearNicknameInputField();
        // 조건 boolean
        setUpdateEnabled(false);
      }
    } catch (error) {
      console.error('닉네임 확인 중 오류 발생:', error);
    }
  };

  //

  //현재 비밀번호 확인Btn
  const handlePasswordCheck = async () => {
    try {
      const result = await PasswordCheck(password);
      if (result && result.check) {
        alert('인증되었습니다');
        // 새 비밀번호 재 확인
        setPasswordConfirmed(true);
        // 조건 boolean
        setUpdateEnabled(true);
        setWithdrawalPassword(true);
      } else {
        alert('다시 한번 입력해주세요');
        clearPasswordInputField();
        // 새 비밀번호 재 확인
        setPasswordConfirmed(false);
        // 조건 boolean
        setUpdateEnabled(false);
        setWithdrawalPassword(false);
      }
    } catch (error) {
      console.error('비밀번호 확인 오류:', error);
    }
  };

  //새 비밀번호

  const handleNewPassword = (e) => {
    setNewPassword(e.target.value);
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
            onChange={handleNewPassword}
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

export default UpdateContentMain;

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
      cursor: pointer;
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
  cursor: pointer;
  border-radius: 5px;
`;
