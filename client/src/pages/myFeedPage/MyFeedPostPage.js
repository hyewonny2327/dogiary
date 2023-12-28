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
import { postMyDiary, showAllDiaries } from '../../utils/diaryApi';
import closeBtn from '../../components/icons/closeBtn.svg';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
export default function MyFeedPostPage() {
  const navigate = useNavigate();
  const [count, setCount] = useState(1); // 복제할 개수를 상태로 관리
  const [uploadedImages, setUploadedImages] = useState([]);
  const [inputText, setInputText] = useState([]);
  const [imageUrl, setImageUrl] = useState([]);
  const formData = new FormData();
  const [diaryData, setDiaryData] = useState([]);
  const [_title, setTitle] = useState('');
  const [_date, setDate] = useState('');
  const [startDate, setStartDate] = useState(new Date());

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

      //이미지 미리보기
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl((prev) => {
          let newImage = [...prev];
          newImage[index] = reader.result;
          return newImage;
        });
      };
      reader.readAsDataURL(file);
    }
  }

  function handleTextChange(event, index) {
    const text = event.target.value;
    setInputText(text);
  }

  function handleTitleInput(e) {
    const inputTitle = e.target.value;
    console.log(inputTitle);
    setTitle(inputTitle);
  }
  function handleDateInput(date) {
    //이미 날짜 저장이 되어있으면 alert
    setStartDate(date);
    const dateFormat = dayjs(date).format('YYYY-MM-DD');
    console.log(typeof dateFormat);
    setDate(dateFormat);
  }
  useEffect(() => {
    isDuplicateData().then((res) => {
      if (res === true) {
        alert(
          '이미 게시물이 작성되어있는 날짜입니다. 기존 게시물을 수정해주세요.',
        );
      }
    });
  }, [_date]);
  async function isDuplicateData() {
    const diaries = await showAllDiaries();
    console.log('_date 확인', _date);
    return diaries && diaries.some((diary) => diary.date === _date);
  }

  const [submitData, setSubmitData] = useState({
    title: '',
    content: '',
    date: '',
    imageUrls: [],
  });

  function handleSubmit(e) {
    console.log('클릭됨');
    //e.preventDefault();

    if (_title === '' || _date === '') {
      alert('날짜, 제목을 빠짐없이 입력해주세요');
    } else {
      console.log('제목 잘 들어갔나', _title);
      formData.append('title', _title);
      formData.append('date', _date);
      formData.append('content', inputText);
      //배열 형태의 이미지
      uploadedImages.forEach((image, index) => {
        formData.append(`imageUrls`, image);
      });
      console.log('formData', formData);
      fetchDiaryData(formData);
    }
  }
  async function fetchDiaryData(formData) {
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
              <DatePicker
                className="title-box"
                selected={startDate}
                onChange={(date) => handleDateInput(date)}
                dateFormat={'yyyy-MM-dd'}
              />
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
          <button
            className="submit-button"
            onClick={(e) => handleSubmit(e)}
            type="submit"
          >
            등록하기
          </button>
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
const Content = styled.form`
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
  .react-datepicker-wrapper {
    width: 100%;
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

  .submit-button {
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
