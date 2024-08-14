import React, { useState } from 'react';
import styled from 'styled-components';
import './history.css';
import EducationItem from '../../components/History/EducationItem';
import EditItem from '../../components/History/EditItem';

//Todo
//- +버튼 onClick 함수 정의
//api 파일생성해서 데이터 받아오기, async/await로 불러오기
//디자인 수정

const History = () => {

    const profileTitles = ["이름", "생년월일", "전화번호", "이메일", "주소"];
    const [isEdit, setIsEdit] = useState([false, true]);

    const [profile] = useState({
        name:"박하은",
        birth:"1999.07.17",
        mobile:"010-1234-5678",
        email:"kkijuk@gmail.com",
        address:"주소를 입력하세요"
    });

    const [educations] = useState([
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

    const handleCancelEdit = (index) => {
        setIsEdit(prev => prev.map((edit, i) => i === index ? false : edit));
    };

    const handleEdit = (index) => {
        setIsEdit(prev => prev.map((edit, i) => i === index ? true : edit));
    };

    return (
        <BackgroundDiv>
            <BaseDiv>
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
                        <p style={{color:'#707070', fontSize:'14px',margin:'15px 0px 19px 0px'}}>{profile.name}</p>
                        <p style={{color:'#707070', fontSize:'14px',margin:'15px 0px 19px 0px'}}>{profile.birth}</p>
                        <p style={{color:'#707070', fontSize:'14px',margin:'15px 0px 19px 0px'}}>{profile.mobile}</p>
                        <p style={{color:'#707070', fontSize:'14px',margin:'15px 0px 19px 0px'}}>{profile.email}</p>
                        <p style={{color:'#707070', fontSize:'14px', textDecorationLine:'underline',margin:'15px 0px'}}>{profile.address}</p>
                    </div>
                </div>

                <Linear />

                <h3>학력</h3>
                {educations.map((education, index) => (
                    isEdit[index] 
                    ? <EditItem key={index} dummy={education} onCancel={() => handleCancelEdit(index)} /> 
                    : <EducationItem key={index} dummy={education} onEdit={() => handleEdit(index)} />
                ))}
                <AddButton>+</AddButton>
                <Linear />

                <h3>경력</h3>
                <AddButton>+</AddButton>
                <Linear />

                <h3>활동 및 경험</h3>
                <AddButton>+</AddButton>
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
`;

