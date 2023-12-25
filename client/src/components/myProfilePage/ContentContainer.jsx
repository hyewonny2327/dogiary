import { styled } from 'styled-components';
import Title from './Title';
import Content from './Content';

const ContentContainer = () => {
  return (
    <ContentWrapper>
      <Title />
      <Content />
    </ContentWrapper>
  );
};

export default ContentContainer;

const ContentWrapper = styled.div`
  width: 390px;
  height: 844px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
