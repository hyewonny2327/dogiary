import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import menuIcon from '../icons/menuIcon.svg'

//로고, 마이페이지 버튼이 있는 상단 로고 bar
export function LogoBar(){
    return(
        <LogoBarStyle>
            <Logo>Dogiary</Logo>
            <svg className='myPage-icon' xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
            <path d="M18 1C8.61116 1 1 8.61116 1 18C1 27.3888 8.61116 35 18 35C27.3888 35 35 27.3888 35 18C35 8.61116 27.3888 1 18 1Z" stroke="#5F5013" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4.86066 28.7879C4.86066 28.7879 8.64999 23.9502 18 23.9502C27.35 23.9502 31.1394 28.7879 31.1394 28.7879" stroke="#5F5013" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18 17.9998C20.8168 17.9998 23.1 15.7165 23.1 12.8998C23.1 10.0832 20.8168 7.7998 18 7.7998C15.1833 7.7998 12.9 10.0832 12.9 12.8998C12.9 15.7165 15.1833 17.9998 18 17.9998Z" stroke="#5F5013" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </LogoBarStyle>
    )
}


//카테고리로 이동할 수 있는 nav bar
export function NavBar(){
    const [isIconClicked, setIsIconClicked] = useState(false);
    //const [clickedIndex, setClickedIndex] = useState(null);

    let navigate = useNavigate();
    const location = useLocation();
    
    const getCategoryClassName = (index) => {
      // 현재 주소와 links의 주소가 일치하는지 확인
      const isCurrentPage = location.pathname === `/${links[index]}`;
      return isCurrentPage ? 'current-page' : '';
    };
    
      const handleCategoryClick = (index) => {
        //setClickedIndex(index);
        //index에 따라 다른 link로 navigate 
        navigate(`/${links[index]}`);
      };

      const categories = ["강아지 등록하기", "내 피드 들어가기", "내 반려견 페이지", "마이페이지" , '마이맵'];
      const links = ["registerPuppy","myFeed",'myPuppyPage','myPage','myMap']


    return(
        <NavBarStyle>
            <img src={menuIcon} className='menu-icon' onClick={()=>setIsIconClicked(!isIconClicked)} />
            {isIconClicked && (
                <CategoryContainer>
                    {categories.map((category, index) => (
                    <Category
                    key={index}
                    className={getCategoryClassName(index)}
                    onClick={() => handleCategoryClick(index)}
                    >
                    {category}
                    </Category>
                ))}
                </CategoryContainer>
                
            )}
        </NavBarStyle>
    )
}

const LogoBarStyle = styled.div`
height: 6vh;

background-color: #F2D8B2;
display: flex;
justify-content: space-between;
align-items: center;
padding: 0px 20px;

.myPage-icon {
    
    cursor:pointer;
  }
`
const Logo = styled.div`
font-family: 'Righteous', sans-serif;
font-size: 24px;
color:#5F5013;
margin: 0 auto;
width: 34px;
height: 34px;
`

const NavBarStyle = styled.div`
height: 6vh;
background-color: #FFF8E6;
display: flex;
align-items: center;

padding: 0px 20px;
position:relative;

.menu-icon{
    cursor:pointer;
    padding:10px 0;
}

`
const CategoryContainer = styled.div`
height: 88vh;
width:60vw;
background-color: #FFF8E6;
box-sizing: border-box;

position:absolute;
left:0;
top:6vh;
padding: 20px 20px;

display: flex;
flex-direction:column;
align-items: flex-start;
align-content: flex-start;
gap: 12px 6px;
flex-wrap: wrap;

`
const Category = styled.div`
font-family: 'Noto Sans KR', sans-serif;
font-weight:normal;
color:#BDAF74;
font-size:100%;
cursor:pointer;

&.current-page{
    color:#5F5013;
    font-weight:bold;
}
&.title{
    font-size:120%;
    color:#5F5013;
    font-weight:bolder;
}
`
