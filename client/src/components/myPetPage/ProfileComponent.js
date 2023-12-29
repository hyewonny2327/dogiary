import { useState, useEffect } from 'react';
import { ContainerBox } from '../common/Boxes';
import { LongColoredBtn, LongStrokedBtn } from '../common/Buttons';
import { Modal } from '../common/Modal';
import styled from 'styled-components';
import DogModal from './DogModal';
import { setIsOpen } from '../../slice/store';
import { useSelector, useDispatch } from 'react-redux';
import dogImg from '../../dog.jpg';

// 나이 계산
function calculateAge(birthdate) {
  const today = new Date();
  const birthDate = new Date(birthdate);
  let ageYears = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    ageYears--;
  }

  const ageMonths = (today.getMonth() - birthDate.getMonth() + 12) % 12;
  return { years: ageYears, months: ageMonths };
}

export default function ProfileComponent({ dogInfo }) {
  const [editMode, setEditMode] = useState(false);

  const age = calculateAge(dogInfo?.data?.birthday);
  const imageUrl = dogInfo?.data?.imageUrl;
  const altText = dogInfo?.data?.name || 'Dog Image';

  const imageElement = imageUrl ? (
    <img
      src={imageUrl}
      alt={altText}
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
    />
  ) : (
    <div>이미지를 넣어주세요</div>
  );

  const handleEditClick = () => {
    console.log('버튼이 클릭되었습니다.');
    setEditMode(true);
    console.log(editMode);
    dispatch(setIsOpen(true));
  };

  const handleModalClose = () => {
    setEditMode(false);
  };

  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.modal.isOpen);

  return (
    <div>
      <ContainerBox>
        <ProfileContents>
          <div className="profileInfo">
            <div className="image">{imageElement}</div>
            <div>
              <div className="infoContainer">
                <div className="name-age-sex">
                  <div className="name">
                    <span>이름: </span>
                    <div>{dogInfo?.data?.name}</div>
                  </div>
                  <div className="age">
                    <span>나이: </span>
                    <div>{`${age.years}세`}</div>
                  </div>

                  <div className="sex">
                    <span>성별: </span>
                    <div>{dogInfo?.data?.sex}</div>
                  </div>
                </div>
                <div className="type-date-birthday">
                  <div className="type">
                    <span>견종: </span>
                    <div>{dogInfo?.data?.type}</div>
                  </div>
                  <div className="date">
                    <span>만난 날: </span>
                    <div>{dogInfo?.data?.date}</div>
                  </div>
                  <div className="birthday">
                    <span>생일: </span>
                    <div>{dogInfo?.data?.birthday}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ProfileContents>
        <DogsBtn>
          <LongColoredBtn className="dogsBtn" onClick={handleEditClick}>
            정보 수정하기
          </LongColoredBtn>
        </DogsBtn>
        {isModalOpen && (
          <Modal containerStyle={containerStyle}>
            <DogModal dogInfo={dogInfo?.data} onCancel={handleModalClose} />
          </Modal>
        )}
      </ContainerBox>
    </div>
  );
}

const ProfileContents = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  .image {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 65vw;
    height: 20vh;
    background: black;
    margin-bottom: 3vh;
    margin-top: 2vh;
  }

  .profileInfo {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    // background: black;
    align-items: center;
    .infoContainer {
      display: flex;
      padding: 0 2vh 0 2vh;
      justify-content: space-between;
      align-items: center;
      width: 65vw;
      height: 20vh;
      margin-top: 1vh;
      // background: black;
      border: solid 1px #bdaf74;
      border-radius: 1vh;
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
      align-items: space-around;
      width: 100%;
      height: 20%;
      margin-bottom: 2vh;
      font-size: 14px;
      margin-right: 2vh;
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
const containerStyle = ``;
