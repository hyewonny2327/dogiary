import styled from 'styled-components';
import { Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
import RankingDisplay from './RankingDisplay';
import { LongColoredBtn } from '../components/common/Buttons';
import { LogoBar, NavBar } from '../components/common/Header';
import { ContainerBox } from '../components/common/Boxes';
import React, { useState, useEffect } from 'react';
import { api } from '.././utils/api';
import { StyledBox, RankingBox, Container } from '../pages/rankstyled';

function Ranking() {
  const navigate = useNavigate();
  const [rankings, setRankings] = useState([]);
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const [currentUserInfo, setcurrentUserInfo] = useState();
  const [currentUserRank, setcurrentUserRank] = useState();
  useEffect(() => {
    fetchRankingData();
  }, []);

  const fetchRankingData = async () => {
    try {
      const response = await api.get('/rank');
      const data = response.data.data;
      setRankings(data.topUsers);
      setcurrentUserInfo(data.currentUserInfo);
      setcurrentUserRank(data.currentUserRank);
    } catch (error) {
      console.error('랭킹 데이터를 가져오는데 실패했습니다:', error);
    }
  };
  return (
    <Container>
      <div className="App">
        <LogoBar></LogoBar>
        <NavBar></NavBar>
        <div class="title">랭킹 보기</div>
        <div class="myrank">나의 등수</div>
        <div>
          <StyledBox>
            {currentUserInfo && (
              <RankingDisplay
                userRanking={currentUserRank}
                nickName={currentUserInfo.nickName}
                count={currentUserInfo.count}
              />
            )}
          </StyledBox>
        </div>
        <div class="myrank">{currentMonth}월 TOP 5</div>

        {rankings.map((ranking, index) => (
          <div class="Toprank" key={`Toprank${index}`}>
            <RankingBox>
              <RankingDisplay
                userRanking={index + 1}
                nickName={ranking.nickName}
                count={ranking.count}
              />
            </RankingBox>
          </div>
        ))}

        <div
          className="movemap"
          onClick={() => {
            navigate('/mapPage');
          }}
        >
          <LongColoredBtn>맵으로 돌아가기</LongColoredBtn>
        </div>
      </div>
    </Container>
  );
}

export default Ranking;
