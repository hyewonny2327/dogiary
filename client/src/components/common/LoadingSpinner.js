// LoadingSpinner 컴포넌트
import loadingImage from '../../components/icons/loadingImage.svg';
import styled from 'styled-components';
import FootIcon from '../icons/FootIcon';
const LoadingSpinner = () => {
  return (
    <LoadingStyle>
      <h2>로딩중이다 멍!</h2>
      <img src={loadingImage}></img>
      <div className="spinner"></div>
    </LoadingStyle>
  );
};
export default LoadingSpinner;

const LoadingStyle = styled.div`
  textalign: center;
  padding: 20px;
  display: flex;
  height: 100vh;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  font-family: Noto Sans KR;
  font-weight: 700;
  color: #5f5013;
  background-color: #fff8e6;
  img {
    width: 200px;
    height: 200px;
  }
`;
