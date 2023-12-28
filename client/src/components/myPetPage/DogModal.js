import React, { useState } from 'react';
import { api } from '../../utils/api';
import { Modal } from '../common/Modal';
import { LongColoredBtn, LongStrokedBtn } from '../common/Buttons';
import styled from 'styled-components';

export function DogModal({ dogInfo, onCancel }) {
  const [editedDogInfo, setEditedDogInfo] = useState({ ...dogInfo });

  const handleSaveClick = async () => {
    console.log('handleSaveClick 실행');
    try {
      // 수정된 정보를 서버로 전송
      const response = await api.put(`/dogs/${dogInfo?._id}`, editedDogInfo);

      // 성공적으로 응답 받은 경우
      if (response.status >= 200 && response.status < 300) {
        console.log('강아지 정보 수정 성공:', response.data);
        // 모달 닫기
        onCancel();
      } else {
        // 실패한 경우
        console.error('강아지 정보 수정 실패:', response.statusText);
        // 실패에 대한 처리를 추가할 수 있습니다.
      }
    } catch (error) {
      console.error('강아지 정보 수정 실패:', error);
    }
  };

  const handleChange = (e) => {
    console.log('handleChange 실행');
    // 수정 중인 데이터 변경
    setEditedDogInfo({
      ...editedDogInfo,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Modal>
      <ModalContainerStyle>
        <ModalContentStyle>
          <div>
            <label htmlFor="imageUrl">이미지 URL:</label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={editedDogInfo.imageUrl}
              onChange={handleChange}
            />
          </div>
          <div className="name-sex">
            <div>
              <label htmlFor="name">이름</label>
              <input
                type="text"
                id="name"
                name="name"
                value={editedDogInfo.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="sex">성별</label>
              <input
                type="text"
                id="sex"
                name="sex"
                value={editedDogInfo.sex}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="type-date-birthday">
            <div>
              <label htmlFor="type">견종</label>
              <input
                type="text"
                id="type"
                name="type"
                value={editedDogInfo.type}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="date">만난 날</label>
              <input
                type="text"
                id="date"
                name="date"
                value={editedDogInfo.date}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="birthday">생일</label>
              <input
                type="text"
                id="birthday"
                name="birthday"
                value={editedDogInfo.birthday}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <LongColoredBtn onClick={handleSaveClick}>저장</LongColoredBtn>
            <LongStrokedBtn onClick={onCancel}>취소</LongStrokedBtn>
          </div>
        </ModalContentStyle>
      </ModalContainerStyle>
    </Modal>
  );
}

const ModalContainerStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.27);
`;

const ModalContentStyle = styled.div``;

export default DogModal;
