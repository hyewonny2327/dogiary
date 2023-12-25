import styled from 'styled-components';

export const StyledBox = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
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
  font-family: 'Noto Sans KR', sans-serif;
  border: 2px solid #bdaf74;
  height: 50px;
  width: 90%;
  flex-wrap: nowrap;
  margin: 30px auto;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 4px;
`;

export const RankingContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  position: relative;
`;

export const RankingImage = styled.img`
  height: 80%;
  opacity: 70%;
`;

export const RankingText = styled.div`
  position: absolute;
  font-size: 20px;
  font-weight: bold;
  color: white;
  margin: 17px 0 0 20px;
  top: 0px;
`;

export const UserInfo = styled.div`
  margin-left: 20%;
  color: #000;
  font-size: 20px;
  font-weight: bolder;
`;
export const Container = styled.div`
  .title {
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 26px;
    color: #5f5013;
    margin: 0 auto;
    width: 100%;
    flex-wrap: nowrap;
    padding: 20px;
    font-weight: bold;
    text-align: center;
  }

  .movemap {
    display: flex;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 20px;
    margin: 0 auto;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
  }

  .myrank {
    font-family: 'Noto Sans KR', sans-serif;
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
