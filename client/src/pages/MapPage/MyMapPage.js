import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MapComponent from '../../components/myMapPage/Map';
import { LogoBar, NavBar } from '../../components/common/Header';
import { InputBox } from '../../components/common/Boxes';
import myMapIcon from '../../components/icons/myMapIcon.svg';
import { Modal } from '../../components/common/Modal';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchInput, setMarkers } from '../../slice/store';
import { showPlacesByTag } from '../../utils/mapApi';
import { setTag } from '../../slice/store';

const TagList = [
  { label: '산책', id: 'tag0' },
  { label: '애견동반', id: 'tag1' },
  { label: '상점', id: 'tag2' },
  { label: '기타', id: 'tag3' },
  { label: '전체보기', id: 'tag4' },
];
function MyMapPage() {
  const dispatch = useDispatch();
  const searchInput = useSelector((state) => state.map.searchInput);
  //검색
  const [inputVal, setInputVal] = useState('');
  const handleInputChange = (e) => {
    //사용자의 input 추적
    setInputVal(e.target.value);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    //검색 결과 저장
    dispatch(setSearchInput(inputVal));
  };

  useEffect(() => {
    dispatch(setSearchInput(searchInput));
  }, [dispatch, searchInput]);

  function getFilterClassName(id) {
    // 필터 버튼의 class name을 반환하는 함수.
    // isFilterClicked의 값에 따라 달라진다. clicked 클래스가 되면 스타일이 달라짐
    return tags[id] ? 'clicked' : '';
  }
  const [tags, setTags] = useState({
    tag0: false,
    tag1: false,
    tag2: false,
    tag3: false,
    tag4: true,
  });

  function handleFilterClick(id) {
    setTags((prev) => {
      const updatedTags = { ...prev, [id]: !prev[id] };

      // 나머지 키들을 false로 설정
      for (const key in updatedTags) {
        if (key !== id) {
          updatedTags[key] = false;
        }
      }

      return updatedTags;
    });

    //받아온 태그값으로 redux store에 태그 저장
    dispatch(setTag(id));
  }

  //아이콘 클릭

  const [isMyMapClicked, setIsMyMapClicked] = useState(false);
  function handleModal() {
    setIsMyMapClicked(!isMyMapClicked);
  }

  const navigate = useNavigate();

  return (
    <div>
      <LogoBar />
      <NavBar />
      <MapComponent />
      <MapUiStyle>
        <div className="map-background">
          <SearchContainer>
            <InputBox>
              <input
                className="text-input"
                type="text"
                placeholder="동네를검색하세요"
                onChange={handleInputChange}
              />
            </InputBox>
            <button className="button" onClick={handleSearch}>
              검색
            </button>
          </SearchContainer>
          <FilterContainer>
            {TagList.map(({ label, id }, item) => (
              <FilterBtn
                key={id}
                text={label}
                className={getFilterClassName(id)}
                onClick={() => handleFilterClick(id)}
              />
            ))}
          </FilterContainer>

          <MyMapIcon>
            <img src={myMapIcon} onClick={handleModal} alt="맵아이콘"></img>
            {isMyMapClicked && (
              <ModalContainerStyle>
                <div
                  className="text"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/mapPage/myPlace');
                  }}
                >
                  내 장소 보기
                </div>
                <div className="line"></div>
                <div
                  className="text"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/mapPage/registerPlace');
                  }}
                >
                  장소 등록하기
                </div>
                <div className="line"></div>
                <div
                  className="text"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/rankings');
                  }}
                >
                  랭킹 보기
                </div>
              </ModalContainerStyle>
            )}
          </MyMapIcon>
        </div>
      </MapUiStyle>
      <div></div>
    </div>
  );
}

export default MyMapPage;

export function FilterBtn({ text, onClick, className }) {
  return (
    <FilterBtnStyle onClick={onClick} className={className}>
      {text}
    </FilterBtnStyle>
  );
}

const MapUiStyle = styled.div`
  display: flex;
  flex-direction: column;
  .map-background {
    height: 119px;
    width: 100%;
    background: linear-gradient(
      180deg,
      rgba(3, 2, 0, 0.41) 0%,
      rgba(255, 248, 230, 0) 100%
    );
  }
`;
const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  .button {
    width: 20vw;
    height: 38px;
    padding: 5px;
    margin: 10px 5px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
  }
  .text-input {
    background-color: #fff;
    border: none;
    width: 70vw;
    height: 38px;
    padding: 5px;
    margin: 10px 5px;
    box-sizing: border-box;
  }
`;
const FilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;
const FilterBtnStyle = styled.div`
  width: 59px;
  height: 38px;
  border-radius: 18px;
  background: #5f5013;
  color: #fff8e6;

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: Inter;
  font-size: 12px;
  font-weight: 700;

  &.clicked {
    background: #f2d8b2;
    color: #5f5013;
  }
  cursor: pointer;
`;

const MyMapIcon = styled.div`
  position: fixed;
  bottom: 22px;
  right: 29px;
  cursor: pointer;
`;

const ModalContainerStyle = styled.div`
  position: absolute;
  bottom: 69px;
  right: 0;

  width: 207px;
  height: 120px;
  border-radius: 5px;
  background: #5f5013;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .text {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 171px;
    height: 53px;
    color: #fff;
    text-align: center;
    font-family: Noto Sans KR;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
  }

  .line {
    width: 201.999px;
    height: 1px;
    background: #fff;
  }
`;
