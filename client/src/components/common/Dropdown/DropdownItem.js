import { useContext } from 'react';
import { DropdownContext } from './DropdownContext';

function DropdownItem({id,label}){
    //context에 저장된 데이터를 사용하기 위해 꺼내는 작업
    const {setSelectedItem, selectedItem, onChange} = useContext(DropdownContext);

    function handleClickDropdownItem(){
        //아이템을 클릭해서 선택했을 때, selected item에 선택된 item의 id값을 넣어주고, 
        //컴포넌트를 사용하는페이지에서 정의할 onChange 함수에서 id를 사용할 수 있도록 인자로 넘겨줌  
        setSelectedItem(id);
        onChange(id);
    }
    
    return(
        <div onClick={handleClickDropdownItem}>{label}</div>
    )
}

export default DropdownItem;