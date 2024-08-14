import React, {useState} from 'react'
import styled from 'styled-components'
import '../../pages/History/history.css'

// api에서 받는 구분(state)으로 만료 여부도 표현
const Edu =({isLevel})=> {
    const [dropdownOpend, setDropdownOpend] = useState(false);
    const level = ["고등학교","전문대학교","대학교","대학원(석사)","대학원(박사)"];
    const status = ["재학", "휴학", "졸업예정", "졸업", "중퇴", "편입"];
    const [education, setEducation] = useState(level);

    const handleToggleClick=()=>{
        setDropdownOpend(!dropdownOpend);
    }

    return(
        <>
        <EditContainer>
            <div style={{display:'flex',flexDirection:'column', gap:'0', width:'135px'}}>
                <DropdownBox onClick={handleToggleClick}>
                    {isLevel==="학력구분" ? "학력구분" : "학력상태"}
                </DropdownBox>
                {dropdownOpend && <Dropdown>
                    {education.map((edu)=>(
                        <DropdownItem>{edu}</DropdownItem>
                    ))}
                </Dropdown>}
            </div>

         </EditContainer>
        </>
    )
}
export default Edu



// 여기부터는 수정 박스
const EditContainer = styled.div`
    width:135px;
    height:215px;   
`
const DropdownBox = styled.div`
    width:135px;
    height:45px;
    border-radius: 10px;
    border:none;
    background: var(--white, #FFF);
    display:flex;
    justify-content:center;
    align-items:center;
    color:#D9D9D9;
    cursor:pointer;

`

const Dropdown=styled.div`
    width: 135px;
    flex-shrink: 0;
    border-radius: 13px;
    border: 1px solid var(--gray-03, #D9D9D9);
    background: #FFF;
`
const DropdownItem=styled.p`
    text-align: center;
    font-family: Regular;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    cursor:pointer;
    margin-bottom:15px;
`