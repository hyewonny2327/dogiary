import { styled } from 'styled-components';
import { LogoBar, NavBar } from '../components/common/Header';
import ContentUpdateContainer from '../components/myProfilePage/ContentUpdateContainer';

const ProfileUpdatePage = () => {
  return (
    <ProfileContainer>
      <HeaderContainer>
        <LogoBar />
        <NavBar />
      </HeaderContainer>
      <ContentUpdateContainer />
    </ProfileContainer>
  );
};

export default ProfileUpdatePage;

const ProfileContainer = styled.div`
  width: 100%;
  height: 100vh;
  min-width: 393px;
  min-height: 832px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 700;
  color: #5f5013;
`;

const HeaderContainer = styled.div`
  width: 100%;
  height: 12vh;
`;
