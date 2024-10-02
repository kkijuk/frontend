// 버튼 컴포넌트 사용하는 곳 없음 
import React, { useState } from 'react'
import styled from 'styled-components'

const Button = styled.button`
    height: 50px;
    border:none;
    border-radius: 10px; 
    cursor:pointer;
    width: ${props => props.width || 'auto'};
`

const GeneralButton=({type, text, width, onClick})=>{

    const [selected, setSelected] = useState(false);

    const handleClick =(e)=>{
        if(type==='select') setSelected(!selected);
    }

    const getButtonStyles =()=>{
        switch(type){
            case 'submit':
                return{
                    backgroundColor:'#3AAF85',
                    color:'#FFFFFF',
                    // width:`${width}px`
                }
            case 'delete':
                return{
                    backgroundColor: '#FFFFFF',
                    color: 'red',
                    border:'1px solid red',
                    // width:`${width}px`
                }
            case 'select':
                return selected
                ?{
                    backgroundColor:'#E1FAED',
                    color:'#3AAF85',
                    border:'1px solid #3AAF85',
                    // width:`${width}px`
                }
                :{
                    backgroundColor:'#F1F1F1',
                    color:'#424242',
                    // width:`${width}px`
                    
                }
            default:
                return{};
        }
    }

    return(
        <Button style={getButtonStyles()} onClick={handleClick}>
            {text}
        </Button>
    );
};

export default GeneralButton;