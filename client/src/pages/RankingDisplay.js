import React from 'react';
import rankingImage from '../components/icons/foot.png';
import styled from 'styled-components';
import axios from 'axios';
import { api } from '.././utils/api';
import {
  RankingContainer,
  RankContainer,
  RankingImage,
  RankingText,
  UserInfo,
} from '../pages/rankstyled';

function RankingDisplay({ userRanking, nickName, count }) {
  return (
    <RankingContainer>
      <RankContainer>
        <RankingImage src={rankingImage} alt="foot" />
        <RankingText>{userRanking}</RankingText>
      </RankContainer>
      <UserInfo>
        {nickName} ({count})
      </UserInfo>
    </RankingContainer>
  );
}

export default RankingDisplay;
