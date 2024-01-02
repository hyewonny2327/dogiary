import styled from 'styled-components';

export const StyledBox = styled.div`
  font-family: 'Noto Sans KR';
  background-color: #fff8e6;
  height: 50px;
  width: 90%;
  flex-wrap: nowrap;
  margin: 30px auto;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  padding-left: 10px;
`;

export const RankingBox = styled.div`
  font-family: 'Noto Sans KR';
  border: 2px solid #bdaf74;
  height: 50px;
  width: 90%;
  flex-wrap: nowrap;
  margin: 20px auto;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  display: flex;
  justify-content: center;
`;

export const RankingContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  width: 90%;
`;

export const RankingImage = styled.img`
  height: 80%;
  opacity: 70%;
`;
export const RankContainer = styled.div`
  height: 80%;
  display: flex;
  position: relative;
`;
export const RankingText = styled.div`
  position: absolute;
  font-size: 20px;
  font-weight: bold;
  color: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const UserInfo = styled.div`
  margin-left: 20%;
  color: #000;
  font-size: 20px;
  font-weight: bolder;
`;
export const Container = styled.div`
  height: 100vh;
  overflow: hidden;
  .title {
    font-family: 'Noto Sans KR';
    font-size: 26px;
    color: #5f5013;
    margin: 0 auto;
    width: 100%;
    flex-wrap: nowrap;
    padding: 10px;
    font-weight: bold;
    text-align: center;
  }

  .movemap {
    display: flex;
    font-family: 'Noto Sans KR';
    font-size: 20px;
    margin: 0 auto;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
  }

  .myrank {
    font-family: 'Noto Sans KR';
    color: #5f5013;
    font-size: 20px;
    width: 70%;
    flex-wrap: nowrap;
    font-weight: bold;
    margin: 10 auto;
    margin-left: 40px;
    margin-top: 30px;
  }
`;
