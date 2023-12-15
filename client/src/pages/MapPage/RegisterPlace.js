import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ContainerBox,InputBox } from '../../components/common/Boxes';
import { LongColoredBtn,LongStrokedBtn } from '../../components/common/Buttons';
import Dropdown from '../../components/common/Dropdown';
import { DropdownProvider } from '../../hooks/useDropdown';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchInput, setSelectedOption } from '../../slice/store';
import { callMapApi } from '../../utils/callMapApi';
import closeBtn from '../../components/icons/closeBtn.svg'
import imageIcon from '../../components/icons/imageIcon.svg'
import { getAddress } from '../../utils/getAddress';
import { callRegisterPlaceApi } from '../../utils/registerPlace';
const { kakao } = window;

function RegisterPlace(){
    const dispatch = useDispatch();

    //이 페이지에서 searchInput, markers를 사용하기 위해 필요함 
    const searchInput = useSelector((state)=>state.map.searchInput)
    const markers = useSelector((state)=>state.map.markers);
    
    const navigate = useNavigate();

    const [selectedShowOption, setSelectedShowOption] = useState(null);
    const [selectedFilterOption, setSelectedFilterOption] = useState(null);

    const showOptions=[
        { label: '공개', value: 'Public' },
        { label: '비공개', value: 'Private' },
      ]
    const filterOptions =[
        { label: '산책', value: '0' },
        { label: '애견동반', value: '1' },
        { label: '상점', value: '2' },
        { label: '기타', value: '3' },
        { label: '전체보기', value: '4' },
    ]

    //검색 버튼 클릭여부를 판별해서 장소 목록 리스트를 보여준다. 
    const [isSearchBtnClicked, setIsSearchBtnClicked ] = useState(false);

    const [inputVal, setInputVal] = useState('')
    const [selectedPlace, setSelectedPlace] = useState({content:'',lat:0,lng:0})
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
        

    const [uploadedImage, setUploadedImage] = useState(null);
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
    
        // Make sure a file is selected
        if (file) {
          // Display the uploaded image
          setUploadedImage(URL.createObjectURL(file));
        }
      };

    function handleSelect(index){
        setIsSearchBtnClicked(false);
        const newSelectedPlace = selectedPlace;
        newSelectedPlace.content = markers[index].content;
        newSelectedPlace.lat = markers[index].position.lat;
        newSelectedPlace.lng = markers[index].position.lng;
        setSelectedPlace(newSelectedPlace);
        
        console.log('클릭',markers[index].content)
        console.log('좌표값', markers[index].position.lat );
    }

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

      useEffect(()=>{
        console.log('selectedPlace' ,selectedPlace);
      },[selectedPlace]);

      const handleShowSelect = (selectedOption) => {
        setSelectedShowOption(selectedOption);
      };
    
      const handleFilterSelect = (selectedOption) => {
        setSelectedFilterOption(selectedOption);
    };

    useEffect(()=>{
        
    },[])
    
    return(
        <RegisterPlaceContainer>
            <ContainerBox>
                <ContentContainerStyle>
                    <div className='header-text'>나만의 장소를 저장해보세요!</div>
                        <InputContainerStyle>
                            <Dropdown  options={showOptions} placeholder='공개여부' onSelect={handleShowSelect} />
                            <Dropdown  options={filterOptions} placeholder='카테고리' onSelect={handleFilterSelect} />
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
                                    <input className='content-input' type='text'placeholder='내용을 넣어주세요'></input>
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
                <LongColoredBtn text='등록하기' onClick={
                    ()=>{
                        dispatch(setSelectedOption({show:selectedShowOption, filter:selectedFilterOption}));
                        callRegisterPlaceApi();
                        console.log('클릭했음');
                        //장소 검색에 등록한 내용 저장 
                        navigate('/mapPage');
                    }
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