import api from '../../Axios';
import React, { useState } from 'react';
import styled from 'styled-components';
import './history.css';
import EducationItem from '../../components/History/Resume/EducationItem';
import EditItem from '../../components/History/Resume/EditItem';
import CareerItem from '../../components/History/Resume/CareerItem';
import AddItem from '../../components/History/Resume/AddItem';
import AddCareerModal from '../../components/shared/AddCareerModal';
import AddCareerModalEdit from '../../components/shared/AddCareerModalEdit';
import Address from '../../components/History/Address';

//Todo
//- +버튼 onClick 함수 정의
//api 파일생성해서 데이터 받아오기, async/await로 불러오기
//디자인 수정

const History = () => {

    const profileTitles = ["이름", "생년월일", "전화번호", "이메일", "주소"];

    //(Data) - dummy
    const [profiles, setProfiles] = useState({
        name:"박하은",
        birth:"1999.07.17",
        mobile:"010-1234-5678",
        email:"kkijuk@gmail.com",
        address:""
    });

    const [educations, setEducations] = useState([
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
    ]);
    
    const [careers,setCareers] = useState([
        {
            category:"아르바이트",
            title:"하늘학원",
            startDate:"2023.06",
            endDate:"2024.01",
            period:8,
            task:"중학생 수업 지도"
        }
    ])

    const [activities, setActivities] = useState([
        {
            category:"동아리",
            title:"IT 서비스 개발 동아리 / UMC",
            startDate:"2024.03",
            endDate:"2024.08",
            period:8,
            task:"스터디, 웹서비스 기획(팀 프로젝트)"
        },
        {
            category:"대외활동",
            title:"하나은행 대학생 서포터즈 1기",
            startDate:"2023.12",
            endDate:"2024.02",
            period:8,
            task:"SNS 콘텐츠 제작, 오프라인 캠페인 기획"
        },
        {
            category:"공모전",
            title:"서울시 공공데이터 공모전",
            startDate:"2023.09",
            endDate:"2023.10",
            period:8,
            task:"공공데이터 활용 웹 서비스 기획 및 개발"
        },
        
    ])

    //state
    const [isEdit, setIsEdit] = useState([false, false]);
    const [isAddItemOpen, setIsAddItemOpen] = useState(false);
    const [show, setShow] = useState(false);//추가 불가 알람창
    const [isEditActModalOpen, setIsEditActModalOpen] = useState(false);
    const [isAddActModalOpen, setIsAddActModalOpen] = useState(false);
    const [isAddressNull, setIsAddressNull] = useState(true);
    const [addressStatus, setAddressStatus] = useState(0);

    //(Actions)
    const handleNullAddressClick=()=>{
        setIsAddressNull(false);
        setAddressStatus(1);
    }
    const handleSaveAddress=(data)=>{
        setProfiles(prev=>({...prev, address:data}));
        setAddressStatus(0);
        if(!data){setIsAddressNull(true)}
    }

    //학력 편집모드->읽기모드 전환
    const handleCancelEdit = (index) => {
        setIsEdit(prev => prev.map((edit, i) => i === index ? false : edit));
    };
    //학력 읽기모드->편집모드 전환
    const handleEdit = (index) => {
        setIsEdit(prev => prev.map((edit, i) => i === index ? true : edit));
    };
    //학력 추가 취소
    const handleCancleAdd=()=>{
        setIsAddItemOpen(false);
    }
    //학력 추가 제한
    const showLimiter =()=>{
        setShow(true);
        setTimeout(()=>{
            setShow(false);
        },3000);
    }
    //학력 추가 제한
    const handleAdd = ()=>{
        isAddItemOpen 
        ? showLimiter()
        : setIsAddItemOpen(true);
    }
    //학력 수정
    const editEducation =(index, updatedData)=>{
        setEducations(prev => prev.map((education, i) => i === index ? {...education, ...updatedData}: education));
        handleCancelEdit(index);
        console.log(updatedData);
    }
    //학력 추가
    const addEducation =(updatedData)=>{
        console.log(updatedData);
        if(!updatedData){
            console.log('내용이 없음');
        }
        else{
            setEducations(prev=>[...prev, updatedData]);
            setIsAddItemOpen(false);
        }
    }
    //학력 삭제
    const deleteEducation =(index)=>{
        setEducations(prev => prev.filter((_,i) => i !== index));
        handleCancelEdit(index);
    }
    //활동 추가 모달 토글
    const toggleAddActModalOpen =()=>{
        setIsAddActModalOpen(!isAddActModalOpen);
    }
    //활동 수정 모달 토글
    const toggleEditActModalOpen =()=>{
        setIsEditActModalOpen(!isEditActModalOpen);
    }
    //활동수정
    //추가 예정

    return (
        <BackgroundDiv>

            <BaseDiv>
            {isAddActModalOpen && <AddCareerModal onClose={toggleAddActModalOpen}/>}
            {isEditActModalOpen && <AddCareerModalEdit onClose={toggleEditActModalOpen}/>}
                {/* 1. Profiles */}
                <div style={{display:'flex', alignContent:'center', gap:'40px'}}>
                    <div style={{width:'150px', height:'200px',backgroundColor:'#707070'}}>
                        {/* 프로필사진 */}
                    </div>
                    <div style={{width:'70px'}}>
                        {profileTitles.map((profileTitle, index) => (
                            <p key={index} style={{color:'#707070', fontSize:'18px'}}>{profileTitle}</p>
                        ))}
                    </div>
                    <div style={{height:'203px'}}>
                        <p style={{color:'#707070', fontSize:'14px',margin:'15px 0px 19px 0px'}}>{profiles.name}</p>
                        <p style={{color:'#707070', fontSize:'14px',margin:'15px 0px 19px 0px'}}>{profiles.birth}</p>
                        <p style={{color:'#707070', fontSize:'14px',margin:'15px 0px 19px 0px'}}>{profiles.mobile}</p>
                        <p style={{color:'#707070', fontSize:'14px',margin:'15px 0px 19px 0px'}}>{profiles.email}</p>
                        {/* <p style={{color:'#707070', fontSize:'14px', textDecorationLine:'underline',margin:'15px 0px'}}>{profiles.address}</p> */}
                        {isAddressNull
                        ?(
                            <p 
                                style={{color:'#707070', fontSize:'14px', textDecorationLine:'underline',margin:'15px 0px', cursor:'pointer'}}
                                onClick={handleNullAddressClick}>
                            주소를 입력하세요</p>
                        )
                        :(
                            <Address
                            data={profiles.address}
                            status={addressStatus}
                            isEdit={()=>{setAddressStatus(!addressStatus)}}
                            onSave={(data)=>{handleSaveAddress(data)}}/>)}     
                    </div>
                </div>

                <Linear />
                {/* (2) Educations */}
                <h3>학력</h3>
                {educations.map((education, index) => (
                    isEdit[index] 
                    ? <EditItem key={index} 
                        dummy={education}  
                        isLastItem={index === educations.length - 1}
                        onCancel={() => deleteEducation(index)}
                        onEdit={(updatedData)=>editEducation(index, updatedData)}
                        /> 
                    : <EducationItem key={index} dummy={education} onEdit={() => handleEdit(index)}
                        isLastItem={index === educations.length - 1} />
                ))}
                <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                    {isAddItemOpen &&
                        <AddItem onCancel={handleCancleAdd} onAdd={(updatedData)=>addEducation(updatedData)}></AddItem>}
                    <AddButton onClick={handleAdd}>+</AddButton>
                    <Limiter show={show}>현재 학력을 먼저 채워주세요!</Limiter>
                </div>


                
                <Linear />
                {/* (3) Careers */}
                <h3 style={{marginBottom:'30px'}}>경력</h3>
                {careers.map((career, index)=>(
                    <CareerItem 
                        key={index} 
                        dummy={career} 
                        isLastItem={index === careers.length - 1}
                        onEdit={toggleEditActModalOpen}/>
                ))}
                <AddButton onClick={toggleAddActModalOpen}>+</AddButton>

                <Linear />
                {/* (4) Activities */}
                <h3 style={{marginBottom:'30px'}}>활동 및 경험</h3>
                {activities.map((activity, index)=>(
                    <CareerItem 
                        key={index} 
                        dummy={activity} 
                        isLastItem={index === activities.length - 1}
                        onEdit={toggleEditActModalOpen}/>
                ))}
                <AddButton onClick={toggleAddActModalOpen}>+</AddButton>
            </BaseDiv>
        </BackgroundDiv>
    );
};

export default History;

const BackgroundDiv = styled.div`
    width: 100%;
    height: 100%;
    margin-top:40px;
    display:flex;
    justify-content:center;
`;

const BaseDiv = styled.div`
    width: 820px;
    max-width: 820px;
    position:relative;
    z-index:999;
`;

const Linear = styled.div`
    width:820px;
    height:2px;
    background: #F1F1F1;
    margin: 30px 0px;
`;

const AddButton = styled.button`
    width: 820px;
    height: 50px;
    flex-shrink: 0;
    border-radius: 10px;
    border: 1px solid var(--gray-03, #D9D9D9);
    text-align:center;
    background: #FFF;
    color:#D9D9D9;
    font-size: 30px;
    cursor:pointer;

    &:hover{
        border:1px solid #707070;
        color:#707070;
    }
`;

const Limiter = styled.div`
    width:200px;
    height: 80px;
    background-color: RGBA(0,0,0,0.7);
    color:white;
    font-family:Regular;
    font-size:16px;
    border-radius:10px;
    display:flex;
    justify-content:center;
    align-items:center;
    position:fixed;
    top:550px;
    opacity: ${props => props.show ? 1 : 0};
    transition: opacity 1s;
`