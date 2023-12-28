import { useState } from 'react';
import { ContainerBox } from '../common/Boxes';
import { LongColoredBtn } from '../common/Buttons';
import styled from 'styled-components';
import axios from 'axios';

export default function ProfileComponent() {
  return (
    <div>
      <ContainerBox>
        <ProfileContents>
          <div className="profileInfo">
            <div className="image">이미지</div>
            <div className="infoContainer">
              <div className="name-age-sex">
                <div className="name">
                  <span>이름</span>
                  <div></div>
                </div>
                <div className="age">
                  <span>나이</span>
                  <div></div>
                </div>

                <div className="sex">
                  <span>성별</span>
                  <div></div>
                </div>
              </div>
              <div className="type-date-birthday">
                <div className="type">
                  <span>견종</span>
                  <div></div>
                </div>
                <div className="date">
                  <span>만난 날</span>
                  <div></div>
                </div>
                <div className="birthday">
                  <span>생일</span>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </ProfileContents>
        <DogsBtn>
          <LongColoredBtn className="dogsBtn">정보 수정하기</LongColoredBtn>
        </DogsBtn>
      </ContainerBox>
    </div>
  );
}

const ProfileContents = styled.div`
  padding: 10px;

  display: flex;
  flex-direction: row;

  .image {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .profileInfo {
    display: flex;
    flex-direction: column;
    align-items: center;

    .infoContainer {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
    .name-age-sex,
    .type-date-birthday {
      display: flex;
      flex-direction: column;
      padding: 5px 0;
    }

    .name,
    .type,
    .age,
    .date,
    .sex,
    .birthday {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
  }
`;

const DogsBtn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* 중앙 정렬을 위해 추가 */
  text-align: center; /* 버튼 텍스트 중앙 정렬을 위해 추가 */
  margin-top: 20px; /* 상단 여백을 추가할 수 있습니다. */
`;
