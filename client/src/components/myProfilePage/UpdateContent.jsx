import { styled } from 'styled-components';
import { LongColoredBtn, SmallBtn } from '../common/Buttons';
import axios from 'axios';
import { useState } from 'react';

const UpdateContent = () => {
  const [nickname, setNickname] = useState('');

  const nicknameCheck = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/auth/check-password',
        { nickName: nickname },
      );

      return response.data.data;
    } catch (error) {
      console.error('비밀번호 확인 오류:', error);
    }
  };
  //확인Btn
  const handleNicknameCheck = async (inputRef) => {
    try {
      const result = await nicknameCheck();
    } catch (error) {
      console.error('비밀번호 확인 오류:', error);
    }
  };

  return (
    <ProfileContent>
      <NicknameWrapper>
        <div>
          <div style={{ fontSize: '13px', fontWeight: 'bold' }}>닉네임</div>
        </div>
        <div>
          <div>
            <input
              onChange={(e) => setNickname(e.target.value)}
              value={nickname}
            ></input>
          </div>
          <div>
            <SmallBtn onClick={handleNicknameCheck}>중복확인</SmallBtn>
          </div>
        </div>
      </NicknameWrapper>
      <IdWrapper>
        <div>
          <div style={{ fontSize: '13px', fontWeight: 'bold' }}>아이디</div>
        </div>
        <div>
          <div>
            <div>mong3333333333333333333333333333333</div>
          </div>
          <div>
            <SmallBtn>중복확인</SmallBtn>
          </div>
        </div>
      </IdWrapper>
      <PasswordWrapper>
        <div>
          <div style={{ fontSize: '13px', fontWeight: 'bold' }}>
            현재비밀번호
          </div>
        </div>
        <div>
          <div>
            <div>****</div>
          </div>
          <div>
            <SmallBtn>중복확인</SmallBtn>
          </div>
        </div>
      </PasswordWrapper>
      <NewPasswordWrapper>
        <div>
          <div style={{ fontSize: '13px', fontWeight: 'bold' }}>새비밀번호</div>
        </div>
        <div>
          <div>****</div>
        </div>
      </NewPasswordWrapper>
      <NewPasswordCheckWrapper>
        <div>
          <div style={{ fontSize: '13px', fontWeight: 'bold' }}>
            새 비밀번호 확인
          </div>
        </div>
        <div>
          <div>****</div>
        </div>
      </NewPasswordCheckWrapper>
      <ButtonWrapper>
        <LongColoredBtn>수정하기</LongColoredBtn>
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

const NicknameWrapper = styled.div`
  width: 90%;
  height: 6vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #bdaf74;

  //닉네임
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

  //닉네임 text + 중복 button
  & > div:last-child {
    width: 55%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    //닉네임 text
    & > div:first-child {
      width: 50%;
      overflow: scroll;
      &::-webkit-scrollbar {
        display: none;
      }
    }
    //중복button
    & > div:last-child {
      width: 50%;
      height: 100%;
      display: flex;
      justify-content: end;
      align-items: center;
    }
  }
`;

const IdWrapper = styled.div`
  width: 90%;
  height: 6vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #bdaf74;

  //아이디
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

  //아아디 text + 중복 button
  & > div:last-child {
    width: 55%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    //아아디 text
    & > div:first-child {
      width: 50%;
      overflow: scroll;
      &::-webkit-scrollbar {
        display: none;
      }
    }
    //중복button
    & > div:last-child {
      width: 50%;
      height: 100%;
      display: flex;
      justify-content: end;
      align-items: center;
    }
  }
`;

const PasswordWrapper = styled.div`
  width: 90%;
  height: 6vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #bdaf74;

  //현재비밀번호
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
    & > div:first-child {
      width: 50%;
      overflow: scroll;
      &::-webkit-scrollbar {
        display: none;
      }
    }
    //중복button
    & > div:last-child {
      width: 50%;
      height: 100%;
      display: flex;
      justify-content: end;
      align-items: center;
    }
  }
`;

const NewPasswordWrapper = styled.div`
  width: 90%;
  height: 6vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid #bdaf74;
  // 새비밀번호
  & > div:first-child {
    width: 45%;
    height: 100%;
    display: flex;
    justify-content: end;
    align-items: center;

    & > div {
      width: 90%;
      display: flex;
    }
  }

  // 새비밀번호text
  & > div:last-child {
    width: 55%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: end;

    & > div {
      width: 100%;
      display: flex;
      overflow: scroll;
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
`;

const NewPasswordCheckWrapper = styled.div`
  width: 90%;
  height: 6vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid #bdaf74;
  //새비밀번호 확인
  & > div:first-child {
    width: 45%;
    height: 100%;
    display: flex;
    justify-content: end;
    align-items: center;

    & > div {
      width: 90%;
      display: flex;
    }
  }

  // 새비밀번호 확인 text
  & > div:last-child {
    width: 55%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: end;

    & > div {
      width: 100%;
      display: flex;
      overflow: scroll;
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
