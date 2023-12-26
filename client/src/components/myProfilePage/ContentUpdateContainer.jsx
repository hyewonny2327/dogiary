import { styled } from 'styled-components';
import Title from './Title';
import Content from './Content';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

const ContentUpdateContainer = () => {
  //회원정보수정버튼Api

  return (
    <ContentWrapper>
      <Title isEdit />
      <Content isEdit />
      <SecessionBtn>
        회원탈퇴
        <FontAwesomeIcon icon={faAngleRight} />
      </SecessionBtn>
    </ContentWrapper>
  );
};

export default ContentUpdateContainer;

const ContentWrapper = styled.div`
  width: 390px;
  height: 844px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SecessionBtn = styled.button`
  border: none;
  width: 80%;
  height: 50px;
  display: flex;
  align-items: center;
  background-color: transparent;
  font-size: 16px;
  font-weight: 700;
  color: #b6b6b6;
`;
