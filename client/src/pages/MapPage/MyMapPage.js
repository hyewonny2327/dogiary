import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MapComponent from '../../components/myMapPage/Map';
import { LogoBar,NavBar } from '../../components/common/Header';
import { InputBox } from '../../components/common/Boxes';
import myMapIcon from '../../components/icons/myMapIcon.svg';
import { Modal } from '../../components/common/Modal';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchInput } from '../../slice/store';
function MyMapPage(){

    const dispatch = useDispatch();
    const searchInput = useSelector((state)=>state.map.searchInput);
    //검색
    //const [searchInput, setSearchInput] = useState('이태원 맛집');
    const [inputVal, setInputVal] = useState('')
    const handleInputChange = (e) =>{
        //사용자의 input 추적
        setInputVal(e.target.value);
    };
    const handleSearch = (e) =>{
        e.preventDefault();
        //검색 결과 저장
        dispatch(setSearchInput(inputVal));
    } 

    useEffect(()=>{
        dispatch(setSearchInput(searchInput));
    },[dispatch,searchInput]);


    //필터
    const categoryList = ['산책','애견동반','상점','기타','전체보기'];
    //id로 관리 
    const [isFilterClicked, setIsFilterClicked] = useState(Array(categoryList.length).fill(false));


    function getFilterClassName(index){
        //필터 버튼의 class name을 반환하는 함수. 
        //isFilterClicked의 값에 따라 달라진다. clicked 클래스가 되면 스타일이 달라짐
        return isFilterClicked[index] ? 'clicked' : ''
    }
    function handleFilterClick(index){
        //버튼을 클릭할때 index번호를 기준으로 boolean 값을 바꿔줌
        //! 여기 수정 (오피스아워)

        const updatedFilterClicked = Array(categoryList.length).fill(false);
        updatedFilterClicked[index] = !updatedFilterClicked[index];
        setIsFilterClicked(updatedFilterClicked);
    }

    //아이콘 클릭

    const [isMyMapClicked, setIsMyMapClicked] = useState(false);
    function handleModal(){
        setIsMyMapClicked(!isMyMapClicked);
    }
    
    const navigate = useNavigate();

 
    return(
        <div>
            <LogoBar/>
            <NavBar/>
            <MapComponent/>
            <MapUiStyle>
                <div className='map-background'>
                    <SearchContainer>
                        <InputBox>
                            <input className='text-input' type='text'placeholder='동네를검색하세요' onChange={handleInputChange}/>
                        </InputBox>
                        <button className='button'onClick={handleSearch}>검색</button>
                    </SearchContainer>
                    <FilterContainer>
                        {categoryList.map((item, index)=> (
                        <FilterBtn key={index} text={item} className={getFilterClassName(index)} onClick={()=>handleFilterClick(index)}/>
                        ))}
                    </FilterContainer>
                    
                        <MyMapIcon>
                            <img src={myMapIcon} onClick={handleModal}></img>
                            {isMyMapClicked && (
                                <ModalContainerStyle>
                                    <div className='text' onClick={(e)=>{
                                        e.stopPropagation();
                                        navigate('/myPlace');
                                    }}>내 장소 보기 (32)</div>
                                    <div className='line'></div>
                                    <div className='text' onClick={(e)=>{
                                        e.stopPropagation();
                                        navigate('/registerPlace');
                                    }}>장소 등록하기</div>
                                </ModalContainerStyle>
                            )}

                        </MyMapIcon>


                        
                </div>
               

            </MapUiStyle>
            <div>
            
            </div>
            
            
        </div>
    );
}

export default MyMapPage;

export function FilterBtn({text,onClick,className}){

    return(
        <FilterBtnStyle onClick={onClick} className={className}>
           {text}
        </FilterBtnStyle>
    )
} 

const MapUiStyle = styled.div`
display:flex;
flex-direction:column;
.map-background{
    height: 119px;
    width:100%;
    background: linear-gradient(180deg, rgba(3, 2, 0, 0.41) 0%, rgba(255, 248, 230, 0.00) 100%);

}

`
const SearchContainer = styled.div`
display:flex;
justify-content:center;
.button{
    
    width:20vw;
    height:38px;
    padding:5px;
    margin:10px 5px;
    border-radius: 4px;
    border:none;

}
.text-input{
    background-color:#fff;
    border:none;
    width:70vw;
    height:38px;
    padding:5px;
    margin:10px 5px;
    box-sizing: border-box;

}
`
const FilterContainer=styled.div`
display:flex;
flex-direction:row;
justify-content:space-evenly;
`
const FilterBtnStyle = styled.div`

width: 59px;
height: 38px;
border-radius: 18px;
background: #5F5013;
color: #FFF8E6;

display:flex;
align-items:center;
justify-content:center;
text-align: center;
font-family: Inter;
font-size: 12px;
font-weight: 700;

&.clicked{
    background:#F2D8B2;
    color: #5F5013;
}
cursor:pointer;
`


const MyMapIcon = styled.div`
position:fixed;
bottom:22px;
right:29px;

`

const ModalContainerStyle = styled.div`
position:absolute;
bottom:69px;
right:0;

width: 207px;
height: 106px;
border-radius: 5px;
background: #5F5013;

display:flex;
flex-direction:column;
justify-content:center;
align-items:center;

.text{
    display:flex;
    justify-content:center;
    align-items:center;
    width: 171px;
height: 53px;
color: #FFF;
text-align: center;
font-family: Noto Sans KR;
font-size: 14px;
font-style: normal;
font-weight: 700;
}

.line{
    width: 201.999px;
height: 1px;
background:#fff;
}
`