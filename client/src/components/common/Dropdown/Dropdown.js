import { useState, createContext, cloneElement,Children,ReactElement } from 'react';
import DropdownButton from './DropdownButton'
import DropdownItem from './DropdownItem'
import { DropdownContext } from './DropdownContext';

function Dropdown({children,onChange}){
    const [selectedItem,setSelectedItem] = useState('');

    //children으로 받아온 div 콘텐츠들을 배열로 변환한다. 
    //저장된 배열에서 child.type을 통해 각각의 컴포넌트를 필터링 -> 변수에 저장한다. 
    const _children = Children.toArray(children);
    const [dropdownButton, dropdownItems] = [
        _children.find((child)=>child.type === DropdownButton),
        _children.filter((child)=>child.type === DropdownItem),
    ];

    //provider 에 value속성으로 넣어줄 공유할 값들 
    const contextValue = {selectedItem, setSelectedItem, onChange,};

    return(
        <DropdownContext.Provider value={contextValue}>
            {dropdownButton}
            {/* map으로 배열에 저장한 item들을 각각 펼쳐준다.  
            cloneElement함수는 첫번째 인자로 전달된 react엘리먼트를 복제, 두번째로 props를 받음
            
            굳이 클론 하는 이유? -> 이미 존재하는 컴포넌트들의 배열을 가지고 map으로 펼치는거니까
            새로 컴포넌트를 만들면 원래 가지고있던 props속성을 유지할 수 없음 (맞나요??) */}
            {dropdownItems.map((dropdownItem,index)=>
                cloneElement(dropdownItem,{
                    ...dropdownItem.props,
                    key: `dropdown-item-${index}`,
                }))
            }
        </DropdownContext.Provider>
    )
}
export default Dropdown;