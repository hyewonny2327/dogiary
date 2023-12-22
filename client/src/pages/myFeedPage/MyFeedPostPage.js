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
import { useNavigate } from 'react-router-dom';
import { postMyDiary } from '../../utils/diaryApi';

export default function MyFeedPostPage() {
  const navigate = useNavigate();
  const [count, setCount] = useState(1); // 복제할 개수를 상태로 관리
  const [uploadedImage, setUploadedImage] = useState([]);
  const [inputText, setInputText] = useState([]);

  const handleAddContent = () => {
    setCount((prev) => prev + 1);

    setUploadedImage((prev) => {
      const newUploadedImage = [...prev, ''];
      return newUploadedImage;
    });

    setInputText((prev) => {
      const newInputText = [...prev, ''];
      return newInputText;
    });
  };

  //const [formData, setFormData] = useState(new FormData());

  function handleImageUpload(event, index) {
    const file = event.target.files[0];
    if (file) {
      setUploadedImage((prev) => {
        let newImage = [...prev];
        newImage[index] = URL.createObjectURL(file);
        return newImage;
      });
      console.log(uploadedImage);

      //formData.set(`image_${index}`, file);
      //console.log(formData);
    }
  }

  function handleTextChange(event, index) {
    const text = event.target.value;
    setInputText((prev) => {
      let newText = [...prev];
      newText[index] = text;
      return newText;
    });
    // formData.set(`text_${index}`, text);
    // console.log(formData);
  }

  const [_title, setTitle] = useState('');
  const [_date, setDate] = useState('');

  function handleTitleInput(e) {
    const inputTitle = e.target.value;
    setTitle(inputTitle);
  }
  function handleDateInput(e) {
    const inputDate = e.target.value;
    setDate(inputDate);
  }

  const [submitData, setSubmitData] = useState({
    imageUrl: [],
    title: '',
    content: '',
    date: '',
  });
  function handleSubmit() {
    setSubmitData((prev) => {
      const newSubmit = { ...prev };
      newSubmit.imageUrl = uploadedImage;
      newSubmit.title = _title;
      newSubmit.content = inputText;
      newSubmit.date = _date;
    });
    postMyDiary(submitData);
    console.log(uploadedImage, inputText);
  }

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
                onChange={(e) => handleDateInput(e)}
              ></input>
            </InputBox>
            <InputBox>
              <input
                className="title-box"
                type="text"
                placeholder="제목을 작성하세요"
                onChange={(e) => handleTitleInput(e)}
              ></input>
            </InputBox>
          </TitleContainer>
          <ContentContainerBox>
            {[...Array(count)].map((_, index) => (
              <ContentBox
                key={index}
                uploadedImage={uploadedImage}
                handleImageUpload={(event) => handleImageUpload(event, index)}
                handleTextChange={(event) => handleTextChange(event, index)}
                index={index}
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
          <LongStrokedBtn
            className="button"
            onClick={() => navigate('/myFeed')}
          >
            취소하기
          </LongStrokedBtn>
          <LongColoredBtn className="button" onClick={handleSubmit}>
            등록하기
          </LongColoredBtn>
        </ButtonContainer>
      </PostPageContainer>
    </PageContainer>
  );
}

export function ContentBox({
  uploadedImage,
  handleImageUpload,
  handleTextChange,
  index,
}) {
  return (
    <ContentContainer className="container">
      <ImageContainer>
        <img
          src={uploadedImage[index] ? uploadedImage[index] : imageIcon}
          style={{ width: '109px', height: '96px', objectFit: 'contain' }}
        ></img>
        <input
          className="add-photo"
          type="file"
          id={`file-input-${index}`}
          name={`ImageStyle-${index}`}
          onChange={(event) => handleImageUpload(event, index)}
        />
        <label className="upload-btn" htmlFor={`file-input-${index}`}>
          이미지 업로드
        </label>
      </ImageContainer>

      <textarea
        className="input-box"
        type="text"
        placeholder="일기를 입력하세요"
        onChange={(event) => handleTextChange(event, index)}
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
