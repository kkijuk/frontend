import React, {useState} from 'react'
import styled from 'styled-components'
import '../../pages/History/history.css'
import Edu from './Edu'
import Date from './Date'

const EditItem=({ dummy, onCancel })=>{

    return(
        <div style={{display:'flex'}}>
            <TimeLine>
                뷁
            </TimeLine>
            <Container>
                <form style={{position:'relative'}}>
                    <div style={{display:'flex', justifyContent:'space-between', height:'45px', width:'610px'}}>
                        <Edu isLevel="학력구분"/>
                        <Input placeholder='학교명(ex.00대학교)' style={{width:'455px'}}></Input>
                    </div>
                    <br/>
                    <div style={{display:'flex', justifyContent:'space-between', height:'45px', width:'610px'}}>
                        <Input placeholder='전공 및 계열(ex. 00학과 또는 인문계열)' style={{width:'610px'}}></Input>    
                    </div>
                    <br/>
                    <div style={{display:'flex', justifyContent:'space-between', height:'45px', width:'610px'}}>
                        <Edu isLevel="학력상태"/>
                            <div style={{width:'150px'}}>
                                <Date></Date>  
                            </div>
                            
                            <div style={{width:'10px', height:'45px', top:'-25px', right:'50px'}}>~</div>
                            <div style={{width:'150px'}}>
                                <Date></Date>  
                            </div>

                        <Button style={{color:'#FA7C79', border:'1px solid #FA7C79',backgroundColor:'#FFF',marginRight:'5px'}}
                                onClick={onCancel}>
                            삭제
                        </Button>
                        <Button style={{color:'#FFF', borderColor:'#3AAF85',backgroundColor:'#3AAF85'}}>저장</Button>
                    </div>



                </form>
            </Container>
        </div>
    )
}
export default EditItem

const TimeLine = styled.div`
    width: 60px;
    margin: 15px 0px;
`

const Container = styled.div`
    width:610px;
    padding: 30px 0px;
    margin: 15px 0px;
    display:flex;
    justify-content:space-between;
    background-color:#F5F5F5;
    border-radius:10px;
    padding:20px;
    font-family:Regular;
`

const Input = styled.input`
    height:45px;
    border-radius: 10px;
    background: var(--white, #FFF);
    border:none;
`

const Button = styled.div`
    width: 65px;
    height: 25px;
    border-radius: 10px;
    display:flex;
    justify-content:center;
    align-items:center;
    cursor:pointer;

`