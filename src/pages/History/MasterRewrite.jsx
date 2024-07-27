import React from "react";
import styled from "styled-components";

const MasterRewrite =()=>{

    return(
        <>
                        <form>
                    <InputTitle placeholder='한줄소개' style={{height:'50px', marginBottom:'12px'}}></InputTitle>
                    <InputTitle placeholder='자기소개를 작성하세요' style={{height:'150px',marginBottom:'35px'}}></InputTitle>
                    <h3>지원동기</h3>
                    <InputTitle placeholder='지원동기를 작성하세요' style={{height:'150px',marginBottom:'35px'}}></InputTitle>
                    <h3>장단점</h3>
                    <InputTitle placeholder='장단점을 작성하세요' style={{height:'150px',marginBottom:'35px'}}></InputTitle>

                </form>
        </>
    )
}
export default MasterRewrite

const InputTitle = styled.input`
    width: 820px;
    flex-shrink: 0;
    border:none;
    border-radius: 10px;
    background: var(--gray-06, #F5F5F5);    
    padding-left: 20px;
    color: var(--gray-02, #707070);
    font-family:Regular;
    font-size:16px;
    font-weight:400;
    line-height:normal;
`