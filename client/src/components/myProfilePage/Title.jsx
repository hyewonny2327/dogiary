import { styled } from 'styled-components';

const Title = ({ isEdit }) => {
  return (
    <ProfileTitle>
      <div style={{ fontSize: '2.2rem' }}>
        {isEdit ? '회원정보 수정' : '회원정보'}
      </div>
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
