import api from '../../Axios';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import './history.css';
import EducationItem from '../../components/History/Resume/EducationItem';
import EditItem from '../../components/History/Resume/EditItem';
import CareerItem from '../../components/History/Resume/CareerItem';
import AddItem from '../../components/History/Resume/AddItem';
import AddCareerModal from '../../components/shared/AddCareerModal';
import AddCareerModalEdit from '../../components/shared/AddCareerModalEdit';
import Address from '../../components/History/Address';
import createRecord from '../../api/Record/createRecord';
import updateRecord from '../../api/Record/updateRecord';
import readRecord from '../../api/Record/readRecord';
import createEducation from '../../api/Record/createEducation';
import deleteEducation from '../../api/Record/deleteEducation';


const History = () => {

    const profileTitles = ["이름", "생년월일", "전화번호", "이메일", "주소"];

    //(Data)
    const [recordId, setRecordId] = useState(0);
    const [lastUpdated, setLastUpdated] = useState('');
    const [profiles, setProfiles] = useState({
        img:"",
        name:"",
        birth:"",
        mobile:"",
        email:"",
        address:""
    });

    const [educations, setEducations] = useState([
        {
            level : "",
            schoolName : "",
            department : "" ,
            startDate : "",
            endDate : "",
            status : ""
        }
    ]);
    
    const [careers,setCareers] = useState([]);

    const [activities, setActivities] = useState([]);

    //state
    const [isEdit, setIsEdit] = useState([]);
    const [isAddItemOpen, setIsAddItemOpen] = useState(false);
    const [show, setShow] = useState(false);//추가 불가 알람창
    const [isEditActModalOpen, setIsEditActModalOpen] = useState(false);
    const [isAddActModalOpen, setIsAddActModalOpen] = useState(false);
    const [isAddressNull, setIsAddressNull] = useState(true);
    const [addressStatus, setAddressStatus] = useState(0);

    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                const data = await readRecord();
                setRecordId(data.record_id);
                setLastUpdated(data.updatedAt);
                setProfiles({
                    img:data.profileImageUrl,
                    name:data.name,
                    birth:data.birthday,
                    mobile:data.phone,
                    email:data.email,
                    address:data.address
                })
                setEducations(data.educationList);
                setCareers(data.jobs);
                setActivities(data.activitiesAndExperiences);
            }catch(err){
                console.log('Failed to load records');
            }
        }
        fetchData();
    },[])

    //(Actions)
    //########################################################################
    //학력 추가
    const handleAddEducation = async (newEducation)=>{
        try{
            const addedEducation = await createEducation(recordId, newEducation);
            setEducations([...educations, addedEducation]);
            setIsAddItemOpen(false);
        }catch(err){
            console.error('Failed to add education: ', err);
        }
    }
    //학력 수정
    const handleUpdateEducation = async (index, updatedData)=>{
        try{
            // const updatedEducation = await updateRecord(educations[index].id, updatedData);
            // setEducations(educations.map((edu, i)=>(i===index ? updatedEducation : edu)));
            setEducations(educations.map((edu, i)=>(i===index ? updatedData : edu)));
            setIsEdit(prev => prev.map((edit, i)=>i===index ? false : edit));
            handleCancelEdit(index);
        }catch(err){
            console.error('Failed to update education: ', err);
        }
    }

    //학력 삭제
    const handleDeleteEducation = async (index, educationId)=>{
        try{
            await deleteEducation(educationId);
            setEducations(educations.filter((_,i)=>i !== index));
            // handleCancelEdit(index);
        }catch(err){
            console.error('Failed to delete education: ', err);
        }
    }
    //########################################################################
    //주소 상태
    const handleNullAddressClick=()=>{
        setIsAddressNull(false);
        setAddressStatus(1);
    }
    //주소 변경
    const handleSaveAddress= async (data)=>{
        try{
            await updateRecord(profiles.id, {address:data});
            setProfiles(prev=>({...prev, address:data}));
            setAddressStatus(0);
            if(!data) setIsAddressNull(true);
        }catch(err){
            console.error('Failed to update address: ', err);
        }
    }

    //etc about showing
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
            <p style={{fontFamily:'Regular', fontSize:'14px', color:'#707070', position:'absolute', top:'-30px', right:'0px'}}>
                마지막 수정 일시: {lastUpdated}
            </p>
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
                        data={education}  
                        isLastItem={index === educations.length - 1}
                        onCancel={() => handleDeleteEducation(index, education.educationId)}//api
                        onEdit={(updatedData)=>handleUpdateEducation(updatedData)}//api - 수정 필요
                        /> 
                    : <EducationItem key={index} data={education} onEdit={() => handleEdit(index)}
                        isLastItem={index === educations.length - 1} />
                ))}
                <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                    {/* //api */}
                    {isAddItemOpen &&
                        <AddItem onCancel={handleCancleAdd} onAdd={(updatedData)=>handleAddEducation(updatedData)}></AddItem>}
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
                        //api onSubmit 추가해야함
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
                        //api onSubmit 추가해야함
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