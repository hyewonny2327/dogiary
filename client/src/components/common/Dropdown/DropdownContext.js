import { useState, createContext, cloneElement,Children,ReactElement } from 'react';

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

