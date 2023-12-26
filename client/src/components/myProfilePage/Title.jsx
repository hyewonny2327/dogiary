import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
const Title = ({ isEdit, onEditClick }) => {
  return (
    <ProfileTitle>
      <div style={{ fontSize: '2.2rem' }}>
        {isEdit ? '회원정보 수정' : '회원정보'}
      </div>
      <ImageContainer>
        <img
          src={
            process.env.PUBLIC_URL +
            '/images/147722e1-adc8-4ca0-acea-67826c8af098.png'
          }
          alt="기본이미지"
          style={{
            width: '130px',
            height: '130px',
            border: '3px solid black',
            borderRadius: '100px',
          }}
        />
        {isEdit && (
          <EditButton onClick={onEditClick}>
            <FontAwesomeIcon
              icon={faCamera}
              // style={{ backgroundColor: '#BDAF74', color: 'white' }}
            />
          </EditButton>
        )}
      </ImageContainer>
    </ProfileTitle>
  );
};

export default Title;

const ProfileTitle = styled.div`
  width: 100%;
  height: 35vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  border: 1px solid red;
`;

const ImageContainer = styled.div`
  position: relative;
`;

const EditButton = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #bdaf74;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #45a049;
  }
`;
