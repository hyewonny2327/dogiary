import { useState } from 'react';
import { LogoBar, NavBar } from '../components/common/Header';
import styled from 'styled-components';
import ProfileComponent from '../components/myPetPage/ProfileComponent';
import WeightComponent from '../components/myPetPage/WeightComponent';
import MedicalComponent from '../components/myPetPage/MedicalComponent';
import FoodComponent from '../components/myPetPage/FoodComponent';
import MemoComponent from '../components/myPetPage/MemoComponent';

function MyPetPage() {
  const [tab, setTab] = useState('profile');

  function handleClickTab() {}

  return (
    <PetContainer>
      <LogoBar />
      <NavBar />
      <Main>
        <div className="title">의 페이지</div>
        <PetDiaryContainer>
          <div className="tab-container">
            <div
              onClick={() => setTab('profile')}
              className={tab === 'profile' ? 'clicked' : ''}
            >
              프로필
            </div>
            <div
              onClick={() => setTab('weight')}
              className={tab === 'weight' ? 'clicked' : ''}
            >
              몸무게
            </div>
            <div
              onClick={() => setTab('medical')}
              className={tab === 'medical' ? 'clicked' : ''}
            >
              진료 기록
            </div>
            <div
              onClick={() => setTab('food')}
              className={tab === 'food' ? 'clicked' : ''}
            >
              사료/영양제/간식
            </div>
            <div
              onClick={() => setTab('memo')}
              className={tab === 'memo' ? 'clicked' : ''}
            >
              메모
            </div>
          </div>
          <div className="content-container">
            {isProfileClick && <ProfileComponent />}
            {isWeightClick && <WeightComponent />}
            {isMedicalClick && <MedicalComponent />}
            {isFoodClick && <FoodComponent />}
            {isMemoClick && <MemoComponent />}
          </div>
        </PetDiaryContainer>
      </Main>
    </PetContainer>
  );
}

export default MyPetPage;

const PetContainer = styled.div`
  display: flex;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const PetDiaryContainer = styled.div`
  display: flex;
`;
