

 import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { useDropdown } from '../../hooks/useDropdown';



function Dropdown({options,placeholder}){
    const {selectedOption, onSelect} = useDropdown();

    return(
        <DropdownStyle className="dropdown">
           <select
        className="dropdown-menu"
        value={selectedOption ? selectedOption.value : ''}
        onChange={(e) => {
          const selectedValue = e.target.value;
          const selectedOption = options.find((option) => option.value === selectedValue);
          onSelect(selectedOption);
          console.log('여기는 dropdown 컴포넌트', selectedOption);
        }}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
        </DropdownStyle>
    )
}
export default Dropdown;

const DropdownStyle = styled.div`
select{
  width: 320px;
  height: 37px;
  border-radius: 2px;
  border: 1px solid #BDAF74;
  
  background: rgba(255, 255, 255, 0.00);

}


`

/**
 * context api 를 사용해야하는 이유 
 * option 리스트 같은건 그냥 props로 받아와도 되는데, 특정 값을 선택했을 때, 그 값을 selectedOption 이라는 상태에 저장해서 이리저리 공유하게 될것. 
 * 그럴려면 selectedOption 값을 계속 props 로 전달 전달 받는건 비효율적임 
 * => context api 를 사용해서 전역으로 쓸 수 있게한다. 
 */