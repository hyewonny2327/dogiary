import React from 'react';
import rankingImage from '../components/icons/foot.png';
//이미지 경로 맞춰서 svg넣기
function RankingDisplay() {
  const nickname = 'User123';
  const placesVisited = 10;


  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        position: 'relative',
      }}
    >
      <img
        src={rankingImage}
        alt="foot"
        style={{ height: '80%', opacity: '70%' }}
      />
      <div
        style={{
          position: 'absolute',
          fontSize: '20px',
          fontWeight: 'bold',
          color: 'white',
          margin: '17px 0 0 20px',
          top: '0px',
        }}
      >
        1
      </div>
      <div
        style={{
          marginLeft: '20%',
          color: '#000',
          fontSize: '20px',
          fontWeight: 'bolder',
        }}
      >
        {nickname} ({placesVisited})
      </div>
    </div>
  );
}

export default RankingDisplay;

//텍스트를 props로 받아와서 받는다

//key나 인덱스 써서

//유동적으로 변하는 값은 props로 받아온다
