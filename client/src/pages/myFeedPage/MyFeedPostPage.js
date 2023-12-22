import styled from 'styled-components';
import { ContainerBox, InputBox } from '../../components/common/Boxes';
import { LogoBar, NavBar } from '../../components/common/Header';
import { useState } from 'react';
import imageIcon from '../../components/icons/imageIcon.svg';
import {
  LongColoredBtn,
  LongStrokedBtn,
} from '../../components/common/Buttons';
import plusIcon from '../../components/icons/plusIcon.svg';

export default function MyFeedPostPage() {
  const [count, setCount] = useState(1); // 복제할 개수를 상태로 관리

  const handleAddContent = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const [uploadedImage, setUploadedImage] = useState([]);
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      let imageArray = [...uploadedImage];
      imageArray.push(URL.createObjectURL(file));
      setUploadedImage(imageArray);
    }
  };

  //! form 데이터 써야함 const formData = new FormData(); formData.append(“key”, data);
  //전송할때 url말고 달느거

  return (
    <PageContainer>
      <LogoBar />
      <NavBar />
      <PostPageContainer>
        <div className="title">추억 기록하기</div>
        <Content>
          <TitleContainer>
            <InputBox>
              <input
                className="title-box"
                type="text"
                placeholder="날짜를 입력하세요"
              ></input>
            </InputBox>
            <InputBox>
              <input
                className="title-box"
                type="text"
                placeholder="제목을 작성하세요"
              ></input>
            </InputBox>
          </TitleContainer>
          <ContentContainerBox>
            {[...Array(count)].map((_, index) => (
              <ContentBox
                key={index}
                uploadedImage={uploadedImage[index]}
                handleImageUpload={() => handleImageUpload()}
              />
            ))}
          </ContentContainerBox>
          <PlusIcon
            className="plus-icon"
            src={plusIcon}
            onClick={handleAddContent}
          />
        </Content>
        <ButtonContainer>
          <LongStrokedBtn className="button">취소하기</LongStrokedBtn>
          <LongColoredBtn className="button">등록하기</LongColoredBtn>
        </ButtonContainer>
      </PostPageContainer>
    </PageContainer>
  );
}

export function ContentBox({ uploadedImage, handleImageUpload }) {
  return (
    <ContentContainer className="container">
      <ImageContainer>
        <img
          src={uploadedImage ? uploadedImage : imageIcon}
          style={{ width: '109px', height: '96px', objectFit: 'contain' }}
        ></img>
        <input
          className="add-photo"
          type="file"
          id="file-input"
          name="ImageStyle"
          onChange={handleImageUpload}
        />
        <label className="upload-btn" htmlFor="file-input">
          이미지 업로드
        </label>
      </ImageContainer>

      <textarea
        className="input-box"
        type="text"
        placeholder="일기를 입력하세요"
      ></textarea>
    </ContentContainer>
  );
}
const PageContainer = styled.div`
  font-family: Noto Sans KR;
  color: #383030;
  font-weight: 700;

  display: flex;
  flex-direction: column;
  height: 100vh;
  .title {
    font-size: 20px;
    font-weight: 700;
    padding: 10px;
  }
`;
const PostPageContainer = styled.div`
  flex: 1;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 60vh;
  margin-top: 10px;
`;
const TitleContainer = styled.div`
  width: 100%;
  input {
    font-family: Noto Sans KR;
    width: 100%;
  }
  .title-box {
    margin: 5px 0;

    font-weight: 700;
    color: #383030;
  }
`;
const PlusIcon = styled.img`
  width: 53px;
  height: 53px;
  margin: 10px 0;
`;
const ContentContainerBox = styled.div`
  width: 100%;
  height: 45vh;
  overflow: auto;
  margin-top: 10px;
`;
const ContentContainer = styled.div`
  background-color: #fff8e6;
  width: 354px;
  height: 253px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 18px 0;

  .input-box {
    margin-top: 20px;
    border: 1px solid #bdaf74;
    font-weight: 700;
    color: #383030;
    height: 61px;
    background-color: rgb(0, 0, 0, 0);
    font-family: Noto Sans KR;
    width: 80%;
  }
`;
const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .add-photo {
    display: none;
  }
  .upload-btn {
    width: 121px;
    height: 28px;
    border-radius: 6px;
    background: #bdaf74;
    color: #fff;

    text-align: center;
    font-weight: 600;
  }
`;

const ButtonContainer = styled.div`
  margin: 1rem 48.5px;
  display: flex;
  flex-direction: column;
  height: 87px;
  justify-content: space-between;
`;
