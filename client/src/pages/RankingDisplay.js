import React from 'react';
import rankingImage from '../components/icons/foot.png';
import styled from 'styled-components';

//이미지 경로 맞춰서 svg넣기
function RankingDisplay(ranking) {
  const RankingContainer = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    position: relative;
  `;

  const RankingImage = styled.img`
    height: 80%;
    opacity: 70%;
  `;

  const RankingText = styled.div`
    position: absolute;
    font-size: 20px;
    font-weight: bold;
    color: white;
    margin: 17px 0 0 20px;
    top: 0px;
  `;

  const UserInfo = styled.div`
    margin-left: 20%;
    color: #000;
    font-size: 20px;
    font-weight: bolder;
  `;

  function RankingDisplay({ userRanking, nickName, count }) {
    return (
      <RankingContainer>
        <RankingImage src={rankingImage} alt="foot" />
        <RankingText>{userRanking}</RankingText>
        <UserInfo>
          {nickName} ({count})
        </UserInfo>
      </RankingContainer>
    );
  }
}

export default RankingDisplay;

//텍스트를 props로 받아와서 받는다

//key나 인덱스 써서

//유동적으로 변하는 값은 props로 받아온다

//아래는 수정 전 코드

// const RankingContainer = styled.div`
// display: flex;
// align-items: center;
// height: 100%;
// position: relative;
// `;

// const RankingImage = styled.img`
// height: 80%;
// opacity: 70%;
// `;

// const RankingText = styled.div`
// position: absolute;
// font-size: 20px;
// font-weight: bold;
// color: white;
// margin: 17px 0 0 20px;
// top: 0px;
// `;

// const UserInfo = styled.div`
// margin-left: 20%;
// color: #000;
// font-size: 20px;
// font-weight: bolder;
// `;

// function RankingDisplay({ userRanking, nickname, placesVisited }) {
// return (
//   <RankingContainer>
//     <RankingImage src={rankingImage} alt="foot" />
//     <RankingText>{userRanking}</RankingText>
//     <UserInfo>
//       {nickname} ({placesVisited})
//     </UserInfo>
//   </RankingContainer>
// );
// }
// }

// const nickname = 'User123';
// const placesVisited = 10;

// return (
//   <div
//     style={{
//       display: 'flex',
//       alignItems: 'center',
//       height: '100%',
//       position: 'relative',
//     }}
//   >
//     <img
//       src={rankingImage}
//       alt="foot"
//       style={{ height: '80%', opacity: '70%' }}
//     />
//     <div
//       style={{
//         position: 'absolute',
//         fontSize: '20px',
//         fontWeight: 'bold',
//         color: 'white',
//         margin: '17px 0 0 20px',
//         top: '0px',
//       }}
//     >
//       {ranking.userRanking}
//     </div>
//     <div
//       style={{
//         marginLeft: '20%',
//         color: '#000',
//         fontSize: '20px',
//         fontWeight: 'bolder',
//       }}
//     >
//       {nickname} ({placesVisited})
//     </div>
//   </div>
// );
// }
