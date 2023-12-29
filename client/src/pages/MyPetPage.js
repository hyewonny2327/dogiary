import { useEffect, useState } from 'react';
import { LogoBar, NavBar } from '../components/common/Header';
import styled from 'styled-components';
import ProfileComponent from '../components/myPetPage/ProfileComponent';
import WeightComponent from '../components/myPetPage/WeightComponent';
import MedicalComponent from '../components/myPetPage/MedicalComponent';
import FoodComponent from '../components/myPetPage/FoodComponent';
import MemoComponent from '../components/myPetPage/MemoComponent';
import { api } from '../utils/api';
import { useLocation } from 'react-router-dom';

export default function MyPetPage() {
  const [tab, setTab] = useState('profile');
  const [dogInfo, setDogInfo] = useState(null);

  const location = useLocation();
  const id = location.state.id;

  useEffect(() => {
    const dogId = id;
    fetchDogInfo(dogId);
  }, [id]);

  const fetchDogInfo = async (id) => {
    try {
      const response = await api.get(`/dogs?id=${id}`);

      // console.log('HTTP 상태 코드:', response.status);

      if (response.status === 200) {
        const data = response.data;
        setDogInfo(data);
      } else {
        console.error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error('조회를 실패했습니다.', error);
    }
  };

  function handleClickTab(clickedTab) {
    setTab(clickedTab);
  }

  return (
    <PetContainer>
      <LogoBar />
      <NavBar />
      <Main>
        <div className="title">의 페이지</div>
        <PetDiaryContainer>
          <div className="tab-container">
            <div
              onClick={() => handleClickTab('profile')}
              className={tab === 'profile' ? 'clicked' : ''}
            >
              프로필
            </div>
            <div
              onClick={() => handleClickTab('weight')}
              className={tab === 'weight' ? 'clicked' : ''}
            >
              몸무게
            </div>
            <div
              onClick={() => handleClickTab('medical')}
              className={tab === 'medical' ? 'clicked' : ''}
            >
              진료 기록
            </div>
            <div
              onClick={() => handleClickTab('food')}
              className={tab === 'food' ? 'clicked' : ''}
            >
              사료/영양제/간식
            </div>
            <div
              onClick={() => handleClickTab('memo')}
              className={tab === 'memo' ? 'clicked' : ''}
            >
              메모
            </div>
          </div>
          <div className="content-container">
            {tab === 'profile' && <ProfileComponent dogInfo={dogInfo} />}
            {tab === 'weight' && <WeightComponent dogInfo={dogInfo} />}
            {tab === 'medical' && <MedicalComponent dogInfo={dogInfo} />}
            {tab === 'food' && <FoodComponent dogInfo={dogInfo} />}
            {tab === 'memo' && (
              <MemoComponent dogInfo={dogInfo} setDogInfo={setDogInfo} />
            )}
          </div>
        </PetDiaryContainer>
      </Main>
    </PetContainer>
  );
}

const PetContainer = styled.div``;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  width: 100%;

  .title {
    font-size: 30px;
    font-weight: 900;
    color: #5f5013;
  }
`;

const PetDiaryContainer = styled.div`
  margin: 2rem 1rem;
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 900;

  .tab-container {
    margin-bottom: 30px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    width: 80%;
    justify-content: space-around;
    align-items: center;
    font-weight: 600;
    font-size: 0.8rem;
    color: #f2d8b2;
  }

  .clicked {
    text-decoration: underline;
    color: #5f5013;
    text-underline-offset: 8px;
    text-decoration-thickness: 3px;
  }

  .content-container {
    width: 370px;
    height: 60vh;

    overflow: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
