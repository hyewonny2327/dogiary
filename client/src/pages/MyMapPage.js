import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MapComponent from '../components/myMapPage/Map';
import { LogoBar,NavBar } from '../components/common/Header';
import { TextInputBox } from '../components/common/Boxes';


function MyMapPage(){

    

    const [searchInput, setSearchInput] = useState('이태원 맛집');
    const [inputVal, setInputVal] = useState('')
    const handleInputChange = (e) =>{
        setInputVal(e.target.value);
        
    };

    const handleSearch = () =>{
        console.log(searchInput);
        setSearchInput(inputVal);

    } // 최신 값을 보장함
    useEffect(() => {
        handleSearch()
      }, [searchInput]);

    return(
        <div>
            <LogoBar/>
            <NavBar/>
            <MapComponent searchInput={searchInput}/>
            <MapUiStyle>
                <div className='map-background'>
                    <TextInputBox 
                        className='text-input' 
                        customStyle={searchInputCustomStyle} 
                        placeholder={'장소를검색하세요.'} 
                        value ={searchInput}
                        onChange = {handleInputChange}/>
                    <button className='button'onClick={handleSearch}>검색</button>
                    {/* <FilterBtn text={산책}/> */}

                </div>

            </MapUiStyle>
            
            
        </div>
    )
}

export default MyMapPage;

// export function FilterBtn({text}){
//     return(
//         <FilterBtnStyle>
//             <div>{text}</div>
//         </FilterBtnStyle>
//     )
// } 

const MapUiStyle = styled.div`

.button{
    
    width:20vw;
    height:38px;
    padding:5px;
    margin-top:10px;
    border-radius: 4px;
    border:none;

}
    .map-background{
        display:flex;
        height: 119px;
        background: linear-gradient(180deg, rgba(3, 2, 0, 0.41) 0%, rgba(255, 248, 230, 0.00) 100%);

    }


`
const FilterBtnStyle = styled.div`
div{
    width: 59px;
height: 38px;
border-radius: 18px;
background: #5F5013;
}
`
const searchInputCustomStyle=`
    input[type=text]{
        background-color:#fff;
        border:none;
        width:70vw;
        height:38px;
        padding:5px;
        margin:10px;
        box-sizing: border-box;

    }

    display:flex;
    justify-content:center;
    
    `