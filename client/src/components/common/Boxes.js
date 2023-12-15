import React from 'react';
import styled from 'styled-components';

export function ContainerBox({content}){
    return(
        <ContainerBoxStyle>
            {content}
        </ContainerBoxStyle>
    )
}

export function TextInputBox({ placeholder,customStyle,onChange}){
    return(
        <InputBoxStyle customStyle={customStyle}>
            <input type='text' placeholder={placeholder} onChange={onChange}/>
        </InputBoxStyle>
    )
}

const ContainerBoxStyle = styled.div`
width: 354px;
height: 513px;
border-radius: 5px;
border: 1px solid #BDAF74;

background: #FFF;

box-shadow: 0px 8px 13px -3px rgba(0, 0, 0, 0.07);
`
const InputBoxStyle = styled.div`
input[type=text] {
    width: 284px;
    height: 29px;
    border-radius: 4px;
    border: 1px solid #BDAF74;
    background: rgba(255, 255, 255, 0);

    
}

${(props) => props.customStyle && props.customStyle};

`