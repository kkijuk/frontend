import React, {useState} from 'react'
import styled from 'styled-components'
import '../../pages/History/history.css'
import Edu from './Edu'
import Date from './Date'

const EditItem=({ dummy, onCancel })=>{

    return(
        <Container>
            <form style={{position:'relative'}}>
                <div style={{display:'flex', justifyContent:'space-between', height:'45px', width:'610px'}}>
                    <Edu isLevel="학력구분"/>
                    <Input placeholder='학교명(ex.00대학교)' style={{width:'455px'}}></Input>
                </div>
                <div style={{height:'20px'}}/>
                <Input placeholder='전공 및 계열(ex. 00학과 또는 인문계열)' style={{width:'610px'}}></Input>
                <div style={{height:'20px'}}/>
                <div style={{display:'flex', height:'45px'}}>
                    <div style={{display:'flex', justifyContent:'space-between', height:'45px'}}>
                        <Edu isLevel="학력상태"/>
                    </div>
                    <div style={{display:'flex',justifyContent:'space-between',height:'45px', width:'250px', position:'relative'}}>
                        <div style={{width:'90px', height:'45px', position:'absolute', top:'-25px'}}>
                            <Date></Date>
                        </div>
                        <div style={{width:'10px', height:'45px', top:'-25px', right:'50px'}}>~</div>
                        <div style={{width:'90px', height:'45px', position:'absolute', top:'-25px', right:'0'}}>
                            <Date></Date>
                        </div>
                    </div>
                </div>
                <Button style={{color:'#77AFF2', border:'1px solid #77AFF2',backgroundColor:'#FFF'}}
                        onClick={onCancel}>
                    취소
                </Button>
                <Button style={{color:'#FFF', borderColor:'#3AAF85',backgroundColor:'#3AAF85'}}>추가</Button>
            </form>
        </Container>
    )
}
export default EditItem

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