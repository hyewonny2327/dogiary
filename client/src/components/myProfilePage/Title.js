import { styled } from 'styled-components';

const Title = ({ imageFile }) => {
  return (
    <ProfileTitle>
      <div style={{ fontSize: '2.2rem' }}>회원정보</div>
      <ImageContainer>
        <img
          src={imageFile}
          alt="기본 이미지"
          style={{
            width: '130px',
            height: '130px',
            border: '3px solid black',
            borderRadius: '100px',
          }}
        />
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
`;

const ImageContainer = styled.div`
  position: relative;
`;

const EditButton = styled.div`
  position: absolute;
  bottom: 10px;
  right: 5px;
  background-color: #bdaf74;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  & > .camera-icon {
    width: 30px;
  }
`;
