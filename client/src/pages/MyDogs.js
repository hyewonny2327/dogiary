import React, { useCallback, useState, useEffect } from 'react';
import { LogoBar, NavBar } from '../components/common/Header.js';
import styled from 'styled-components';
import axios from 'axios';
import { api } from '../utils/api.js';
import { useNavigate } from 'react-router-dom';
import dogImg from '../dog.jpg';
import nodogImg from '../nodog.png';

function MyDogs() {
  const navigate = useNavigate();

  const [dogs, setDogs] = useState([]);
  const getDogs = async () => {
    try {
      const response = await api.get('/dogs');
      setDogs(response.data.data);
      console.log(response.data.data);
    } catch (err) {
      console.log(err);
      return Promise.reject(err); // 실패 시 reject
    }
  };
  const handleClick = (item) => {
    console.log('Clicked Item:', item);
    navigate(`/myPet?id=${item._id}`);
  };

  useEffect(() => {
    getDogs();
  }, []);
  return (
    <Wraper>
      <LogoBar />
      <NavBar />
      <h2 style={{ textAlign: 'center', marginTop: '10%' }}>
        등록된 내 반려견
      </h2>
      <ContentUi>
        {dogs ? (
          <DogDiv>
            {dogs.map((item, index) => (
              <DogCard key={index} onClick={() => handleClick(item)}>
                <ImgDiv>
                  <img
                    src={dogImg}
                    alt="dogImage"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  ></img>
                </ImgDiv>
                <h3>{item.name}</h3>
              </DogCard>
            ))}
          </DogDiv>
        ) : (
          <DogDiv>
            <img
              src={nodogImg}
              alt="noDogImage"
              style={{ width: '50%', height: '50%' }}
            ></img>
            <h1>등록된 반려견이 없어요!</h1>
          </DogDiv>
        )}
      </ContentUi>
    </Wraper>
  );
}
const Wraper = styled.div`
  width: 100vw;
  height: 100vh;
  // background: black;
  color: #5f5013;
  display: flex;
  flex-direction: column;
  h1,
  h2,
  h3,
  h4,
  h5 {
    margin: 0; /* 마진을 0으로 설정하여 없앰 */
  }
`;
const ContentUi = styled.div`
  width: 100%;
  height: 88vh;
  background: #FFF;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  }
`;
const DogDiv = styled.div`
  width: 90%;
  height: 50%;
  display: flex;
  // align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  // background: blue;
`;
const DogCard = styled.div`
  width: 8em;
  height: 9em;
  margin: 2% 5% 0 5%;
  background: #fff8e6;
  border-radius: 2em;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;
// const StyledH3 = styled.h3`
//   margin: 0; /* 마진을 0으로 설정하여 없앰 */
//   /* 추가적인 스타일을 여기에 적용할 수 있습니다 */
// `;
const ImgDiv = styled.div`
  width: 4em;
  height: 4em;
  border-radius: 50%;
  overflow: hidden;
`;
export default MyDogs;
