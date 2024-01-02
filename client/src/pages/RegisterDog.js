import { LongColoredBtn, LongStrokedBtn } from '../components/common/Buttons';
import { LogoBar, NavBar } from '../components/common/Header';
import { Container } from './rankstyled';

import DatePicker from 'react-datepicker';
import { useState, useRef } from 'react';
import myImage from '../components/icons/foot.png';
import myCamera from '../components/icons/camera.svg';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import axios from 'axios';
import { ko } from 'date-fns/esm/locale';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/api';

function RegisterDog() {
  const [image, setImage] = useState(null);
  const [submitImage, setSubmitImage] = useState(null);
  const fileInputRef = useRef();
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      //파일 보여주기
      const reader = new FileReader();
      setSubmitImage(file);

      reader.onloadend = () => {
        setImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };
  const [metDate, setMetDate] = useState(new Date());
  const [birthDate, setBirthDate] = useState(new Date());
  const [dogName, setDogName] = useState('');
  const [breed, setBreed] = useState('');
  const [gender, setGender] = useState('');
  const formData = new FormData();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitImage === null) {
      alert('이미지를 넣어주세요');
    }

    try {
      formData.append('imageUrl', submitImage);
      formData.append('name', dogName);
      formData.append('type', breed);
      formData.append('sex', gender);
      formData.append('date', metDate.toISOString().split('T')[0]);
      formData.append('birthday', birthDate.toISOString().split('T')[0]);
      await api.post('/dogs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/myDogs');

      // 데이터 전송 후 페이지 이동url적기
    } catch (error) {}
  };

  return (
    <div>
      <LogoBar></LogoBar>
      <NavBar></NavBar>

      <Container
        style={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Abc>
          <CenteredDiv>
            <div className="title">반려견 등록하기</div>

            <HiddenImageInput
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
            />
            <PreviewContainer onClick={triggerFileInput} image={image}>
              {image && <ImagePreview src={image} alt="Preview" show={true} />}
              {!image && <div className="camera"></div>}
            </PreviewContainer>
          </CenteredDiv>

          <div>
            <CenteredDiv>
              <CenContent>
                <StyledInput
                  type="text"
                  placeholder="이 름"
                  value={dogName}
                  onChange={(e) => setDogName(e.target.value)}
                />
              </CenContent>
              <Combine>
                <Minibox>
                  <StyledInput
                    type="text"
                    placeholder="견 종"
                    value={breed}
                    onChange={(e) => setBreed(e.target.value)}
                  />
                </Minibox>
                <StyledSelect
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="" disabled>
                    성별
                  </option>
                  <option value="수컷">수컷</option>
                  <option value="암컷">암컷</option>
                  <option value="중성">중성</option>
                </StyledSelect>
              </Combine>
              <DateContainer>
                <div className="title-box">
                  <label className="label">만난 날 :</label>
                  <DatePicker
                    locale={ko}
                    className="dateStyle"
                    selected={metDate}
                    onChange={(date) => setMetDate(date)}
                    dateFormat={'yyyy-MM-dd'}
                  ></DatePicker>
                </div>
                <div className="title-box">
                  <label className="label">생일 :</label>
                  <DatePicker
                    locale={ko}
                    className="dateStyle"
                    selected={birthDate}
                    onChange={(date) => setBirthDate(date)}
                    dateFormat={'yyyy-MM-dd'}
                  ></DatePicker>
                </div>
              </DateContainer>
            </CenteredDiv>
          </div>
          <CenteredDiv>
            <button
              type="submit"
              className="sendData"
              onClick={(e) => handleSubmit(e)}
            >
              Save
            </button>
            <div className="Cancelbtn">
              <LongStrokedBtn>Cancel</LongStrokedBtn>
            </div>
          </CenteredDiv>
        </Abc>
      </Container>
    </div>
  );
}

const DateContainer = styled.div`
  display: flex;
  width: 200px;
  height: 200px;
  flex-direction: column;
  align-items: center;

  .title-box {
    display: flex;
    justify-content: space-between;
    width: 294px;
    height: 42px;
    border-radius: 4px;
    margin-top: 15px;
    border: 2px solid #bdaf74;
  }
  .label {
    font-family: Noto Sans KR;
    color: grey;
    padding: 10px 0 0 20px;
  }
  .dateStyle {
    display: flex;
    font-family: Noto Sans KR;
    border: none;
    font-size: 16px;
    padding: 10px 0 0 10px;
    color: grey;
  }
`;

const CenteredDiv = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  font-color: bdaf74;
  color: #bdaf74;
  .Cancelbtn {
    margin-top: 5px;
  }
  .title {
    font-size: 24px;
  }
  .sendData {
    padding: 8px 25px;
    border-radius: 4px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 281px;
    height: 38px;
    border: none;

    font-family: Noto Sans KR;
    font-size: 100%;
    font-weight: 500;
    background: #bdaf74;
    color: #fff;
  }
`;
const StyledInput = styled.input`
  font-family: Noto Sans KR;
  font-size: 85%;
  font-weight: 500;
  width: 125px;
  padding-left: 10px;
  color: #bdaf74;
  border: none;
  outline: none;

  ::placeholder {
    color: #bdaf74;
  }
`;

const CenContent = styled.div`
  display: flex;
  align-items: center;
  width: 281px;
  height: 38px;
  border-radius: 4px;
  margin-top: 15px;
  border: 2px solid #bdaf74;
  padding: 0 10px;
`;

const Abc = styled.form`
  display: flex;
  width: 390px;
  height: 100vh;
  background-color: white;
  flex-direction: column;
`;

const StyledSelect = styled.select`
  width: 130px;
  height: 41.73px;
  color: grey;
  border: 2px solid #bdaf74;
  padding: 0 10px;
  border-radius: 4px;
  margin: 15px 0 0 20px;
  outline: none;
`;

const Minibox = styled.div`
  display: flex;
  align-items: center;

  width: 131px;
  height: 38px;
  border-radius: 4px;
  margin-top: 15px;
  border: 2px solid #bdaf74;
  padding: 0 10px;
`;
const Combine = styled.div`
  display: flex;

  justify-content: space-between;
`;

const HiddenImageInput = styled.input`
  display: none;
`;

const PreviewContainer = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  background-image: url(${(props) => (props.image ? 'none' : myImage)});
  background-repeat: no-repeat;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  background-position: center;
  position: relative;

  .camera {
    position: absolute;
    bottom: 20px;
    right: 20px;
    width: 40px;
    background-image: url(${myCamera});
    background-size: cover; 
    
`;
//카메라 못쓰는중.......
const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  text-align: center;
  display: ${(props) => (props.show ? 'block' : 'none')};
`;
export default RegisterDog;
