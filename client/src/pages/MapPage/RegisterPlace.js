import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ContainerBox,InputBox } from '../../components/common/Boxes';
import { LongColoredBtn,LongStrokedBtn } from '../../components/common/Buttons';
import Dropdown from '../../components/common/Dropdown';
import { DropdownProvider } from '../../hooks/useDropdown';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchInput } from '../../slice/store';
import { setMarkers } from '../../slice/store';
import imageIcon from '../../components/myMapPage/imageIcon.svg'
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
        console.log(searchInput)
        
    } 

    useEffect(() => {
        //이렇게 또 호출하는게 맞나 ,..?  
        //여기서 redux에 상태 업데이트하면 변경된거 인지하고 map에서 해줘야하는거 아닌가 . .

  const ps = new kakao.maps.services.Places();
      
        ps.keywordSearch(`${searchInput}`, (data, status) => {
          if (status === kakao.maps.services.Status.OK) {
            const newMarkers = data.map((place) => ({
              position: { lat: place.y, lng: place.x },
              content: place.place_name,
            }));
            dispatch(setMarkers(newMarkers));
          }
        });
      }, [dispatch, searchInput]);
 
      useEffect(()=>{
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


    return(
        <RegisterPlaceContainer>
            <ContainerBox>
                <ContentContainerStyle>
                    <DropdownProvider>
                        <InputContainerStyle>
                            <Dropdown  options={showOptions} placeholder='공개여부' onSelect={(option)=> setSelectedShowOption(option)} />
                            <Dropdown  options={filterOptions} placeholder='카테고리' onSelect={(option)=>setSelectedFilterOption(option)} />
                            <InputBox>
                            <div className='search-container'>

                                <input className='text-input' type='text'placeholder='장소를검색하세요' onChange={handleInputChange}/>
                                <button className='button'onClick={handleSearch}>검색</button>
                            </div>
                            </InputBox>
                            <div className='image-container'>
                                <img src={imageIcon}></img>
                                <input className='add-photo' type="file" id="file-input" name="ImageStyle" onChange={handleImageUpload}/>
                                <label className='upload-btn' htmlFor="file-input" >이미지 업로드</label>
                            </div>
                            <InputBox>
                                <div className='content-container'>
                                    <input className='content-input' type='text'placeholder='내용을 넣어주세요'></input>
                                </div>
                            </InputBox>
                        </InputContainerStyle>
                    </DropdownProvider>
                    {/* <div>
                        {markers.map((item)=>(
                            <div>{item.content}</div>
                            ))}
                    </div> */}

                </ContentContainerStyle>
            </ContainerBox>
            <BtnContainer>
                <LongStrokedBtn text='취소하기'/>
                <LongColoredBtn text='등록하기' onClick={
                    ()=>{
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
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
height:100vh;
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
`
const InputContainerStyle = styled.div`
height:80%;
display:flex;
flex-direction:column;
justify-content:flex-start;

.search-container{
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    margin:6px;
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