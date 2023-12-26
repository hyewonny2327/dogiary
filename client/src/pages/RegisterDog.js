import { LongColoredBtn, LongStrokedBtn } from '../components/common/Buttons';
import { LogoBar, NavBar } from '../components/common/Header';
import { Container } from './rankstyled';
import { ContainerBox } from '../components/common/Boxes';
import DatePicker from 'react-date-picker';
import { useState } from 'react';

import styled from 'styled-components';

function RegisterDog() {
  // const [metDate, setMetDate] = useState(new Date());
  // const [birthDate, setBirthDate] = useState(new Date());
  return (
    <Container>
      <div>
        <LogoBar></LogoBar>
        <NavBar></NavBar>
      </div>
      <div class="title">반려견 등록하기</div>

      <CenteredDiv>
        <input type="file" accept="image/*" />
      </CenteredDiv>
      {/* 이미지넣기 */}
      <div>
        <CenteredDiv>
          {/* 다만들어보고 ContainerBox 들어간게 이쁜지 확인 */}
          <Doginfo>
            <input></input>
          </Doginfo>

          <input id="dog" placeholder="견종" />

          <select>
            <option value="">선택하세요</option>
            <option value="male">남</option>
            <option value="female">여</option>
          </select>
          <DateContainer>
            {/* <label>만난 날:</label>
            <DatePicker onChange={setMetDate} value={metDate} />
            <label>생일:</label>
            <DatePicker onChange={setBirthDate} value={birthDate} /> */}
          </DateContainer>
        </CenteredDiv>
      </div>
      <CenteredDiv>
        <div>
          <LongColoredBtn className="sendData">
            {/* (누르면 마이페이지로이동) */}
            Save
            {/*(누르면 마이페이지로 이동과 함께 api를 통해 저장된 반려견 정보를 보내고 ) */}
          </LongColoredBtn>
        </div>
        <div className="Cancelbtn">
          <LongStrokedBtn>
            Cancel
            {/* (누르면 마이페이지로이동) */}
          </LongStrokedBtn>
        </div>
      </CenteredDiv>
    </Container>
  );
}

// const Datasend = styled.div`
//   .sendData {
//     display: flex;
//     font-family: 'Noto Sans KR', sans-serif;
//     font-size: 20px;
//     margin: 0 auto;
//     flex-wrap: nowrap;
//     justify-content: center;
//     align-items: center;
//   }
// `;
const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
`;

const CenteredDiv = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 30px;

  .Cancelbtn {
    margin-top: 15px;
  }
`;
const Doginfo = styled.div`
.Dogname{
display: flex
width : 281px;
height :33px;

  justify-content: center;
  align-items: center;
  border-radius: 4px;
}`;
export default RegisterDog;
