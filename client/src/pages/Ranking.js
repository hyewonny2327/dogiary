import "./App.css";
import styled from "styled-components";
import { Route, Routes, useNavigate } from "react-router-dom";
import { LogoBar, NavBar } from "./components/common/Header";
import { LongColoredBtn } from "./components/common/Buttons";
import RankingDisplay from "./RankingDisplay";


const StyledBox = styled.div`
  background-color: #fff8e6;
  height: 50px;
  width: 90%;
  flex-wrap: nowrap;
  margin: 30px auto;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  padding-left: 10px;
`;

const RankingBox = styled.div`
  border: 2px solid #bdaf74;
  height: 50px;
  width: 90%;
  flex-wrap: nowrap;
  margin: 30px auto;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
`;

function App() {
  const navigate = useNavigate(); 
  return (
    <div className="App">
      <LogoBar></LogoBar>
      <NavBar></NavBar>
      <div class="title">랭킹 보기</div>
      <div class="myrank">나의 등수</div>
      <div>
        <StyledBox>
          <RankingDisplay />
        </StyledBox>
      </div>
      <div class="myrank">{}12월 TOP 5</div>
      {/* 박스안에 들어가야될 요소들 넣고 api받을 링크적용하고 반복문을 써서 아래 박스 5개 만들기 */}
      <div class="Toprank">
        <RankingBox>
          <RankingDisplay />
        </RankingBox>
      </div>

      <LongColoredBtn>
        <div className="text" onClick={()=>{navigate('/주소')}}>맵으로 돌아가기</div>
      </LongColoredBtn>
    </div>
  );
}
// 해야될것: 12월 top5위에 마진값 좀 널찍하게 올리고 -> 라우터 적용/ 문법이상한거 좀 교정하고나서 /  와이드프레임처럼 버튼 수정하기
// 플렉스 박스 적용해서 ui부드럽게하기

export default App;
