import React from 'react';
import rankingImage from '../components/icons/foot.png';
import styled from 'styled-components';
import axios from 'axios';
import { api } from '.././utils/api';
import {
  RankingContainer,
  RankingImage,
  RankingText,
  UserInfo,
} from '../pages/rankstyled';



function RankingDisplay({ userRanking, nickName, count }) {
  return (
    <RankingContainer>
      <RankingImage src={rankingImage} alt="foot" />
      <RankingText>{userRanking}</RankingText>
      <UserInfo>
        {nickName} ({count})
      </UserInfo>
    </RankingContainer>
  );
}

export default RankingDisplay;
