import { configureStore, createSlice } from '@reduxjs/toolkit';

//슬라이스 생성 -> action creator, reducer, state를 하나의 객체에 저장하는 것 
const mapSlice = createSlice({
    name:'map',
    initialState:{
        searchInput:'이태원 맛집',
        markers:[],
    },
    reducers: {
        //searchInput값을 저장하는 reducer 
        setSearchInput: (state,action)=>{
            state.searchInput = action.payload;
        },
        //marker list ({장소이름,좌표값}) 를 저장하는 reducer
        setMarkers : (state,action) => {
            state.markers = action.payload;
        },
    },
});

const dropDownSlice = createSlice({
    name:'dropDown_RegisterPlace',
    initialState:{
        selectedOption:{
            show:null,
            filter:null,
        },
    },
    reducers: {
        setSelectedOption: (state,action)=>{
            state.selectedOption = action.payload;
        },
    },
});


//액션 및 리듀서 내보내기
//configureStore를 사용해서 리듀서들을 전달함 (createStore같은것. 저장공간생성)
export const {setSearchInput,setMarkers} = mapSlice.actions;
export const {setSelectedOption} = dropDownSlice.actions;


export default configureStore({
    reducer:{
        map:mapSlice.reducer,
        dropDown_RegisterPlace: dropDownSlice.reducer,
    },
});