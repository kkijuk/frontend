import React, {useState} from 'react'
import styled from 'styled-components'
import '../../pages/History/history.css' 
import EditItem from './EditItem'
import EducationItem from './EducationItem'

const EducationList =()=>{
    const dummys = [
        {
            level : "대학교",
            schoolName : "서울여자대학교",
            department : "언론영상학부 디지털영상전공, 소프트웨어융합학과" ,
            startDate : "2018.03",
            endDate : "2025.02",
            status : "졸업예정"
        },
        {
            level : "고등학교",
            schoolName : "유엠씨고등학교",
            startDate : "2015.03",
            endDate : "2018.02",
            status : "졸업"
        }
    ]

    const [isEdit, setIsEdit] = useState([false, true]);

    return(
        <>
        {dummys.map((dummy, index) => (
            isEdit[index] 
            ? <EditItem key={index} dummy={dummy} onCancel={()=>setIsEdit(!isEdit[index])}/> 
            : <EducationItem key={index} dummy={dummy} onEdit={()=>setIsEdit(!isEdit[index])}/>
        ))}
        </>

    )

}

export default EducationList

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

const Content = styled.div`
    width: 300px;
`   
const Circle = styled.div`
    width: 22px;
    height: 22px;
    border-radius: 50%;
    border-color: ${props => props.color};
    background-color: ${props => props.color}; // 만료 상태인 경우 white
`

const State = styled.div`
    height: 22px;
    color: white;
    font-family: Regular;
    font-size: 14px;
    border-radius: 5px;
    background-color: ${props => props.color};
`


const Edit = styled.div`
    width:65px;
    height: 25px;
    border-radius: 10px;
    background: var(--gray-06, #F5F5F5);
`