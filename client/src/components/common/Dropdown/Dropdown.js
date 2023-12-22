import { useState, createContext, cloneElement,Children,ReactElement } from 'react';
import DropdownButton from './DropdownButton'
import DropdownItem from './DropdownItem'

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
            
            filter 된 컴포넌트들은 배열 형태로 전달되기때문에 map을 써서 펼침
            clone을 쓰는 이유는 dropdown item을 외부에서 선언할 때 따로 key라는 props를 주지 않고 있기 때문에 내부에 key props를 추가해주기 위함*/}
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

//컴포넌트를 사용할때 주고받을 데이터가 적혀있는 context 
//.provider로 감싸주면 하위 컴포넌트에서 데이터를 사용할 수 있음 
export function DropdownContext(){
    //선택된 아이템, 선택된 아이템을 저장하는 set함수, 변화를 감지할 onChange함수
    createContext({
        selectedItem:'',
        setSelectedItem:()=>{},
        onChange:()=>{},
    })
    
}
