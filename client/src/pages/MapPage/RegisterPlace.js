import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ContainerBox,InputBox } from '../../components/common/Boxes';
import { LongColoredBtn,LongStrokedBtn } from '../../components/common/Buttons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchInput } from '../../slice/store';
import { callMapApi } from '../../utils/callMapApi';
import closeBtn from '../../components/icons/closeBtn.svg'
import imageIcon from '../../components/icons/imageIcon.svg'
import { getAddress } from '../../utils/getAddress';
import { registerMyPlace } from '../../utils/mapApi';

function RegisterPlace(){
    
    //이 페이지에서 searchInput, markers를 사용하기 위해 필요함 
    const dispatch = useDispatch();
    const searchInput = useSelector((state)=>state.map.searchInput)
    const markers = useSelector((state)=>state.map.markers);
    //페이지 이동 (라우터)
    const navigate = useNavigate();

    //! 장소 검색 기능 
    //검색 버튼 클릭여부를 판별해서 장소 목록 리스트를 보여준다. 
    const [isSearchBtnClicked, setIsSearchBtnClicked ] = useState(false);
    const [inputVal, setInputVal] = useState('')
    //저장된 장소의 장소이름과 위도,경도를 저장한다. -> 주소 받아올때, 데이터 저장할때 필요함 
    const [selectedPlace, setSelectedPlace] = useState({placename:'',lat:0,lng:0})
    

    const handleInputChange = (e) =>{
        //사용자의 input 추적
        setInputVal(e.target.value);
    };
    const handleSearch = (e) =>{
        e.preventDefault();
        setIsSearchBtnClicked(!isSearchBtnClicked);
        //검색 결과 저장
        dispatch(setSearchInput(inputVal));
        console.log(searchInput)
        
    } 
    useEffect(()=>{
        callMapApi(dispatch,searchInput)
        //검색어로 마커 정보 가져옴 (페이지로드 / 검색버튼 클릭시)
        dispatch(setSearchInput(searchInput));
    },[dispatch,searchInput])

    //장소 리스트에서 marker의 pos 정보를 기준으로 주소를 받아와서 보여줌 
    const [markerAddresses, setMarkerAddresses] = useState([]);

    // marker에 변경이 생기면 promise all 로 모든 marker의 좌표값에 대한 주소를 받아온다. 
    // 그리고나서 아래 map 에서 index별로 보여줌 
    useEffect(() => {
        const fetchMarkerAddresses = async () => {
          try {
            const addresses = await Promise.all(
              markers.map(async (marker) => {
                const addressResult = await getAddress(Number(marker.position.lng), Number(marker.position.lat));
                return addressResult;
              })
            );
            setMarkerAddresses(addresses);
          } catch (error) {
            console.error('주소 가져오기 오류:', error);
          }
        };
      
        fetchMarkerAddresses();
      }, [markers]);

    //장소리스트에서 선택 버튼 누를때 (장소 1개 최종선택)
    function handleSelect(index){
        setIsSearchBtnClicked(false);
        const newSelectedPlace = {
            content: markers[index].content,
            lat: markers[index].position.lat,
            lng: markers[index].position.lng,
            //주소값을 추가해서 selectedPlace state를 업데이트해준다. (이렇게해도 되나 ?????)
            address: markerAddresses[index],
          };
        setSelectedPlace(newSelectedPlace);

    }

    
    //! 이미지 업로드 기능 
    const [uploadedImage, setUploadedImage] = useState('./img.png');
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setUploadedImage(URL.createObjectURL(file));
        }
    };
    
    //! 사용자의 입력값 저장 
    
    const [selectedTag, setSelectedTag] = useState('tag0');
    const [selectedToggle, setSelectedToggle] = useState(true);
    const [content,setContent] = useState('');

    function handleToggleChange(event){
        if(event.target.vale === 'true'){
            setSelectedToggle(true);
        }else if(event.target.value === 'false')
        {
            setSelectedToggle(false);
        }
        
    }
    function handleTagChange(event){
        setSelectedTag(event.target.value);
    }
    function handleContentChange(event){
        setContent(event.target.value);
    }
    //! 등록하기 버튼 클릭 시 
    function handleSubmit(){
        //post요청보낼 정보들을 저장한다. 
        
        const submitData = {
            "title": selectedPlace.placename,
            "toggle": selectedToggle,
            "tag": [selectedTag],
            "content": content,
            "imageUrl": uploadedImage,
            "position": [selectedPlace.lng,selectedPlace.lat],
            "address": selectedPlace.address 
        };
        //submitData 속 내용을 인자로 보내서 api 호출 (아직 구현 진행중 )
        registerMyPlace(submitData)
        console.log('클릭했음');
        navigate('/mapPage');
    }

    return(
        <RegisterPlaceContainer>
            <ContainerBox>
                <ContentContainerStyle>
                    <div className='header-text'>나만의 장소를 저장해보세요!</div>
                        <InputContainerStyle>
                        <DropdownStyle>
                            <select value={selectedToggle} onChange={handleToggleChange}>
                                <option disabled selected>공개여부 선택</option>
                                <option value='true'>공개</option>
                                <option value='false'>비공개</option>
                            </select>
                        </DropdownStyle>
                        <DropdownStyle>
                            <select value={selectedTag} onChange={handleTagChange}>
                                <option value='' disabled selected>카테고리 선택</option>
                                <option value='tag1'>산책</option>
                                <option value='tag2'>애견동반</option>
                                <option value='tag3'>상점</option>
                                <option value='tag4'>기타</option>
                            </select>
                        </DropdownStyle>
                            
                            <InputBox>
                            <div className='search-container'>
                                <div className='search-box'>
                                    <input className='text-input' type='text'placeholder='장소를검색하세요' onChange={handleInputChange}/>
                                    <button className='button'onClick={handleSearch}>{isSearchBtnClicked ? '닫기':'검색'}</button>
                                </div>
                                {selectedPlace.content !== '' ? (
                                    <div>선택한 장소 : {selectedPlace.content}</div>

                                ):''}
                            </div>
                            
                            </InputBox>
                            <div className='image-container'>
                                <img src={uploadedImage ? uploadedImage:imageIcon} style={{width:'109px', height:'96px', objectFit:'contain' }}></img>
                                <input className='add-photo' type="file" id="file-input" name="ImageStyle" onChange={handleImageUpload}/>
                                <label className='upload-btn' htmlFor="file-input" >이미지 업로드</label>
                            </div>
                            <InputBox>
                                <div className='content-container'>
                                    <input className='content-input' type='text'placeholder='내용을 넣어주세요' onChange={handleContentChange}></input>
                                </div>
                            </InputBox>
                        </InputContainerStyle>
                    {
                        isSearchBtnClicked && (
                            <PlaceListStyle className='place-list'>
                                <div className='header-container'>
                                    <div>장소를 선택하세요</div>
                                    <img src={closeBtn}/>
                                </div>
                                {markers.map((item,index)=>(
                                    <div className='list-container' key={index}>
                                        <div className='place-container'>
                                            <div className='text'>{item.content}</div>
                                            <div className='address'>{markerAddresses[index]}</div>
                                        </div>
                                            <button className='btn' onClick={()=>handleSelect(index)}>선택</button>
                                    </div>
                                    ))}
                            </PlaceListStyle>
                        )
                    }
                    
                </ContentContainerStyle>
            </ContainerBox>
            <BtnContainer>
                <LongStrokedBtn text='취소하기'/>
                <LongColoredBtn text='등록하기' onClick={handleSubmit
                    
                }/>
            </BtnContainer>
        </RegisterPlaceContainer>
        
    )
}


export default RegisterPlace;

const RegisterPlaceContainer = styled.div`
font-family: Noto Sans KR;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
height:100vh;
.header-text{
    margin-bottom:7px;
}
`
const BtnContainer = styled.div`
margin : 2rem 48.5px;
display:flex;
flex-direction:column;
height:87px;

justify-content:space-between;
`
const ContentContainerStyle= styled.div`
height:100%;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
margin:2% 5%;
position:relative;
`
const InputContainerStyle = styled.div`
height:80%;
display:flex;
flex-direction:column;
justify-content:flex-start;
.search-container{
    display:flex;
    flex-direction:column;
    margin:6px;
}
.search-box{
    display:flex;
    flex-direction:row;
    justify-content:space-between;
}
.text-input{
    width:80%;
}

select{
    margin:6px;
}
.image-container{
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    height:200px;
    

}
.add-photo{
    display:none;
}
.upload-btn{
    width: 121px;
height: 28px;
border-radius: 6px;
background: #BDAF74;
color: #FFF;

text-align: center;
font-weight:600;
}
.content-container{
    display:flex;
    justify-content:center;
    
}
.content-input{
    margin:6px;
    height:125px;
    
}


`
const PlaceListStyle = styled.div`
position:absolute;
top:40%;
height:270px;
overflow:auto;
border-radius: 5px;
background: #BDAF74;
padding:10px 20px;
width:90%;

.header-container{
    display:flex;
    justify-content:space-between;
    color: #5F5013;
    font-size: 16px;
    font-weight: 700;
    margin: 10px 0;

}
.list-container{
    padding:14px;
    border-top:1px solid #fff;
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    font-family: Noto Sans KR;
}
.text{
    width:70%;
    font-weight:800;
}
.btn{
    width: 52px;
    height: 37px;
    border-radius: 2px;
    background: #FFF8E6;
    color: #5F5013;
    font-weight: 800;
    border:none;
    font-family: Noto Sans KR;
    
}
.address{
    font-size:0.8rem;
}

`

const DropdownStyle = styled.div`
select{
    width: 320px;
    height: 37px;
    border-radius: 2px;
    border: 1px solid #BDAF74;
    background: rgba(255, 255, 255, 0.00);
  }  

`