import styled from 'styled-components';
import { ContainerBox, InputBox } from '../../components/common/Boxes';
import { LogoBar, NavBar } from '../../components/common/Header';
import { useEffect, useState } from 'react';
import imageIcon from '../../components/icons/imageIcon.svg';
import {
  LongColoredBtn,
  LongStrokedBtn,
} from '../../components/common/Buttons';
import plusIcon from '../../components/icons/plusIcon.svg';
import { useNavigate } from 'react-router-dom';
import { postMyDiary } from '../../utils/diaryApi';
import closeBtn from '../../components/icons/closeBtn.svg';

export default function MyFeedPostPage() {
  const navigate = useNavigate();
  const [count, setCount] = useState(1); // 복제할 개수를 상태로 관리
  const [uploadedImages, setUploadedImages] = useState([]);
  const [inputText, setInputText] = useState([]);

  const formData = new FormData();

  const handleAddContent = () => {
    setCount((prev) => prev + 1);
    setUploadedImages((prev) => [...prev, '']);
  };

  function handleImageUpload(event, index) {
    const file = event.target.files[0];
    if (file) {
      setUploadedImages((prev) => {
        let newImage = [...prev];
        newImage[index] = file;
        return newImage;
      });
    }
  }

  function handleTextChange(event, index) {
    const text = event.target.value;
    setInputText(text);
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
    title: '',
    content: '',
    date: '',
    imageUrl: [],
  });

  // useEffect(() => {
  //   console.log(formData);

  //   if (submitData.title !== '' && submitData.date !== '') {
  //     fetchDiaryData();
  //   }
  // }, [submitData.title, submitData.date]);

  function handleSubmit() {
    //! 폼데이터로 저장하기 아직 구현중 ..
    // uploadedImages.forEach((image, index) => {
    //   formData.append(`image_${index}`, image);
    // });
    formData.append('title', _title);
    formData.append('date', _date);
    formData.append('content', inputText);

    if (_title === '' || _date === '') {
      alert('날짜, 제목을 빠짐없이 입력해주세요');
    } else {
      console.log('formData', formData);
      fetchDiaryData();
    }
  }
  async function fetchDiaryData() {
    try {
      await postMyDiary(formData);
      alert('게시글이 등록되었습니다.');
      navigate('/myFeed');
    } catch (error) {
      console.error(error);
    }
  }

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
                key={`diaryContent-${index}`}
                uploadedImage={uploadedImages}
                f
                handleImageUpload={(event) => handleImageUpload(event, index)}
                index={index}
              />
            ))}
          </ContentContainerBox>
          <PlusIcon
            className="plus-icon"
            src={plusIcon}
            onClick={handleAddContent}
          />
          <textarea
            className="content-input-box"
            type="text"
            placeholder="일기를 입력하세요"
            onChange={(event) => handleTextChange(event)}
          ></textarea>
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

export function ContentBox({ uploadedImage, handleImageUpload, index }) {
  function handleCloseBtn() {}
  return (
    <ContentContainer className="container">
      <img src={closeBtn} className="close-btn" onClick={handleCloseBtn} />
      <ImageContainer>
        <img
          src={uploadedImage[index] ? uploadedImage[index] : imageIcon}
          className="uploadedImage"
        ></img>
        <input
          className="add-photo"
          type="file"
          id={`file-input-${index}`}
          name={`ImageStyle-${index}`}
          onChange={(event) => handleImageUpload(event, index)}
        />
        {!uploadedImage[index] ? (
          <label className="upload-btn" htmlFor={`file-input-${index}`}>
            이미지 업로드
          </label>
        ) : (
          ''
        )}
      </ImageContainer>
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

  .content-input-box {
    margin-top: 10px;
    border: 1px solid #bdaf74;
    font-weight: 700;
    color: #383030;
    height: 100px;
    background-color: rgb(0, 0, 0, 0);
    font-family: Noto Sans KR;
    width: 100%;
  }
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
  height: 25vh;
  overflow: auto;
  margin-top: 10px;
`;
const ContentContainer = styled.div`
  background-color: #fff8e6;
  width: 354px;
  height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 18px 0;
  position: relative;

  .close-btn {
    width: 20px;
    height: 20px;
    position: absolute;
    top: 10px;
    right: 20px;
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
  .uploadedImage {
    width: 200px;
    height: 130px;
    object-fit: contain;
  }
`;

const ButtonContainer = styled.div`
  margin: 1rem 48.5px;
  display: flex;
  flex-direction: column;
  height: 87px;
  justify-content: space-between;
`;
