import { configureStore, createSlice } from '@reduxjs/toolkit';

//슬라이스 생성 -> action creator, reducer, state를 하나의 객체에 저장하는 것
const mapSlice = createSlice({
  name: 'map',
  initialState: {
    searchInput: '서울시청',
    markers: [],
    tag: 'tag4',
    toggle: true,
  },
  reducers: {
    //searchInput값을 저장하는 reducer
    setSearchInput: (state, action) => {
      state.searchInput = action.payload;
    },
    //marker list ({장소이름,좌표값}) 를 저장하는 reducer
    setMarkers: (state, action) => {
      state.markers = action.payload;
    },
    setTag: (state, action) => {
      state.tag = action.payload;
    },
    setToggle: (state, action) => {
      state.toggle = action.payload;
    },
  },
});

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpen: false,
  },
  reducers: {
    setIsOpen: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});

const feedSlice = createSlice({
  name: 'feedTab',
  initialState: {
    isTimelineClicked: false,
  },
  reducers: {
    setIsTimelineClicked: (state, action) => {
      state.isTimelineClicked = action.payload;
    },
  },
});

//액션 및 리듀서 내보내기
//configureStore를 사용해서 리듀서들을 전달함 (createStore같은것. 저장공간생성)
export const { setSearchInput, setMarkers, setTag, setToggle } =
  mapSlice.actions;
export const { setIsOpen } = modalSlice.actions;
export const { setIsTimelineClicked } = feedSlice.actions;

export default configureStore({
  reducer: {
    map: mapSlice.reducer,
    modal: modalSlice.reducer,
    feedTab: feedSlice.reducer,
  },
});
