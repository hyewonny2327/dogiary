import styled from 'styled-components';
import { LogoBar, NavBar } from '../../components/common/Header';
import seoulMap from '../../components/icons/seoulMap.svg';
import { showMyPlaces } from '../../utils/mapApi';
import { useEffect, useRef, useState } from 'react';
import deleteIcon from '../../components/icons/deleteIcon.svg';
import deleteIconHover from '../../components/icons/deleteIconHover.svg';
import { deleteMyPlace } from '../../utils';
import useInfinityScroll from '../../hooks/useInfinityScroll';

export default function MyPlacePage() {
  const [myPlaces, setMyPlaces] = useState([]);
  const [isPublicClicked, setIsPublicClicked] = useState(true);
  const [isHover, setIsHover] = useState(Array(myPlaces.length).fill(false));
  const getData = async () => {
    try {
      if (!moreData) {
        console.log('No more data to fetch');

        return;
      }
      const lastItemId =
        myPlaces.length > 0 ? myPlaces[myPlaces.length - 1]._id : null;
      console.log('공개,비공개 클릭', isPublicClicked);
      const res = await showMyPlaces(isPublicClicked, lastItemId);
      if (Array.isArray(res)) {
        //array인지 체크, 개수보다 이하이면 =>
        if (!res || res.length < 10) {
          // 데이터가 없을 때의 처리
          setMoreData(false); // 더 이상 데이터가 없다고 표시
          setMyPlaces((prev) => [...prev, ...res]);
        } else {
          setMyPlaces((prev) => [...prev, ...res]); // 기존 데이터와 새로운 데이터 합치기
        }
      } else {
        console.log('배열이 아님');
      }
    } catch (error) {
      console.error('Error fetching data in MyPlacePage:', error);
    }
  };

  const { setTargetRef } = useInfinityScroll(handleIntersect);
  const targetRef = useRef(null);
  const [moreData, setMoreData] = useState(true);

  async function handleIntersect() {
    if (moreData) {
      console.log('handleIntersect 실행, 지금 공개상태는?', isPublicClicked);
      setMoreData(true);
      await getData();
    } else {
      setTargetRef(null);
      console.log('끝');
    }
  }

  function getTagName(tag) {
    if (tag === 'tag0') {
      return '산책';
    } else if (tag === 'tag1') {
      return '애견동반';
    } else if (tag === 'tag2') {
      return '상점';
    } else if (tag === 'tag3') {
      return '기타';
    } else {
      return '몰라';
    }
  }

  function handleTabClick() {
    setIsPublicClicked((prevIsPublicClicked) => !prevIsPublicClicked);
    setMoreData(true);

    console.log('탭을 클릭했습니다');
  }

  useEffect(() => {
    // isPublicClicked 상태가 변경될 때 감시
    setMyPlaces([]);
    setTargetRef(targetRef.current);
  }, [isPublicClicked, targetRef]);

  useEffect(() => {
    // targetRef가 null이 아닌 경우에만 targetRef 설정
    if (targetRef.current) {
      setTargetRef(targetRef.current);
    }
    console.log('targetRef변경', targetRef.current);
  }, []);
  function handleMouseIn(index) {
    setIsHover((prev) => {
      const newHoverState = [...prev];
      newHoverState[index] = true;
      return newHoverState;
    });
  }
  function handleMouseOut(index) {
    setIsHover((prev) => {
      const newHoverState = [...prev];
      newHoverState[index] = false;
      return newHoverState;
    });
  }
  function handleDeleteClick(id) {
    deleteMyPlace(id)
      .then(() => {
        // myPlaces에서 삭제된 데이터를 제외하고 업데이트
        setMyPlaces((prev) => prev.filter((place) => place._id !== id));
      })
      .catch((error) => {
        console.error('Error deleting data:', error);
      });
  }

  return (
    <PageContainer>
      <LogoBar />
      <NavBar />
      <MyPlaceContainer>
        <div className="title">내 장소 보기</div>
        <MapImage src={seoulMap} alt="서울이미지" />
        <TabContainer>
          <div
            className={isPublicClicked ? 'tab public clicked' : 'tab public'}
            onClick={() => handleTabClick()}
          >
            공개
          </div>
          <div
            className={isPublicClicked ? 'tab private' : 'tab private clicked'}
            onClick={() => handleTabClick()}
          >
            비공개
          </div>
        </TabContainer>
        <ListContainer>
          {myPlaces.length == 0 ? <div>등록된 장소가 없습니다.</div> : ''}
          {myPlaces.map((item, index) => (
            <div className="place-container">
              <div className="left-container">
                <div className="place-name">{item.title}</div>
                <div className="address">{item.address}</div>
                <div className="tag">{getTagName(item.tag[0])}</div>
              </div>
              <div className="right-container">
                <img
                  src={item.imageUrl}
                  alt="장소이미지"
                  className="image"
                ></img>
                {/* <div className="image">이미지</div> */}
                <img
                  src={isHover[index] ? deleteIconHover : deleteIcon}
                  alt="삭제버튼"
                  className="delete-icon"
                  onMouseEnter={() => handleMouseIn(index)}
                  onMouseLeave={() => handleMouseOut(index)}
                  onClick={() => handleDeleteClick(item._id)}
                ></img>
              </div>
            </div>
          ))}
          {/* 여기에 타겟? */}
          {moreData ? <div ref={targetRef}></div> : null}
        </ListContainer>
      </MyPlaceContainer>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;
const MyPlaceContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  font-family: Noto Sans KR;

  flex: 1;
  .title {
    color: #5f5013;
    font-family: Noto Sans KR;
    font-size: 20px;
    font-weight: 700;
  }
`;
const MapImage = styled.img`
  width: 311px;
  height: 279px;
  margin: 20px 0;
`;
const TabContainer = styled.div`
  width: 30%;
  height: 35px;
  margin: 10px 0;
  box-sizing: content-box;
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
  color: #d9d9d9;
  margin-right: auto;
  font-size: 18px;
  font-weight: 700;
  .clicked {
    color: #5f5013;
  }
`;
const ListContainer = styled.div`
  width: 100%;
  height: 360px;
  border-radius: 35px 35px 0 0;
  background: #fff8e6;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  padding: 20px 5px;
  overflow: auto;
  .place-container {
    display: flex;
    justify-content: space-between;
    //border: 1px solid red;
    border-bottom: 1px dotted #f2d8b2;
    padding: 20px 20px;
  }
  .left-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .place-name {
      font-size: 20px;
      font-weight: 700;
    }
    .address {
      font-size: 16px;
      font-weight: 500;
    }
    .tag {
      width: 59px;
      height: 26px;
      border-radius: 13px;
      background-color: #5f5013;
      color: #fff8e6;
      display: flex;
      justify-content: center;
      font-weight: 500;
    }
  }
  .right-container {
    display: flex;
    align-items: center;
    .delete-icon {
      margin: 0 10px 0px 20px;
      width: 16px;
    }
  }
  .image {
    width: 92px;
    height: 92px;
    border: 1px solid red;
  }
`;
