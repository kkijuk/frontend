import api from '../../Axios';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import './history.css';
import EducationItem from '../../components/History/Resume/EducationItem';
import EditItem from '../../components/History/Resume/EditItem';
import CareerItem from '../../components/History/Resume/CareerItem';
import AddItem from '../../components/History/Resume/AddItem';
import AddCareerModal from '../../components/shared/AddCareerModal';
import AddCareerModalEdit from '../../components/History/Resume/AddCareerModalEdit';
import Address from '../../components/History/Address';
import createRecord from '../../api/Record/createRecord';
import updateRecord from '../../api/Record/updateRecord';
import readRecord from '../../api/Record/readRecord';
import createEducation from '../../api/Record/createEducation';
import updateEducation from '../../api/Record/updateEducation';
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

    const [educations, setEducations] = useState([]);
    
    const [careers,setCareers] = useState([]);

    const [activities, setActivities] = useState([]);

    //state
    const [isEdit, setIsEdit] = useState([]);
    const [isAddItemOpen, setIsAddItemOpen] = useState(false);
    const [show, setShow] = useState(false);//추가 불가 알람창
    const [isEditActModalOpen, setIsEditActModalOpen] = useState(false);
    const [isAddActModalOpen, setIsAddActModalOpen] = useState(false);
    const [addressStatus, setAddressStatus] = useState(null);
    const [selectedCareer, setSelectedCareer] = useState(null);


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
                });
                setEducations(data.educationList || []);
                setIsEdit(Array((data.educationList || []).length).fill(false));
                setCareers(data.jobs);
                setActivities(data.activitiesAndExperiences|| []);
                // 주소가 있으면 addressStatus를 0으로 설정, 없으면 1로 설정
                if (data.address) {
                    setAddressStatus(0);
                } else {
                    setAddressStatus(null); // null로 설정하여 '주소를 입력하세요'가 표시되도록 함
                }

            }catch(err){
                console.log('Failed to load records');
            }
        }
        fetchData();
    },[]);

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
    };
    //학력 수정
    const handleUpdateEducation = async (educationId, updatedData)=>{
        try{
            console.log("Updated Data:", updatedData);
            const updatedEducation = await updateEducation(educationId, updatedData);
            console.log("Updated Education from API:", updatedEducation);

        setEducations(prevEducations =>
            prevEducations.map(edu => edu.educationId === educationId ? updatedEducation : edu)
        ); 

        const educationIndex = educations.findIndex(edu => edu.educationId === educationId);
        setIsEdit(prev => prev.map((edit, i) => (i === educationIndex ? false : edit)));
        handleCancelEdit(educationIndex); 
        }catch(err){
            console.error('Failed to update education: ', err);
        }
    };

    //학력 삭제
    const handleDeleteEducation = async (index, educationId)=>{
        try{
            await deleteEducation(educationId);
            handleCancelEdit(index);
            setEducations(educations.filter((_,i)=>i !== index));
        }catch(err){
            console.error('Failed to delete education: ', err);
        }
    };
    //########################################################################
    //주소 상태
    const handleNullAddressClick = () => {
        setAddressStatus(1); // 주소를 입력할 수 있는 상태로 전환
    };

    //주소 변경
    const handleSaveAddress = async (newAddress) => {
        try {
            const updatedRecord = await updateRecord(recordId, { address: newAddress, prifileImageUrl: profiles.img });
            if (updatedRecord) {
                setProfiles(prev => ({
                    ...prev,
                    address: updatedRecord.data.address,  // 응답 데이터를 이용해 상태 업데이트
                }));
                setAddressStatus(0);
            }
        } catch (err) {
            console.error('Failed to update address: ', err);
        }
    };

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
    };
    //학력 추가 제한
    const showLimiter =()=>{
        setShow(true);
        setTimeout(()=>{
            setShow(false);
        },3000);
    };
    //학력 추가 제한
    const handleAdd = ()=>{
        isAddItemOpen 
        ? showLimiter()
        : setIsAddItemOpen(true);
    };

    //활동 추가 모달 토글
    const toggleAddActModalOpen =()=>{
        setIsAddActModalOpen(!isAddActModalOpen);
    };
    // 활동 수정 모달 토글
    const toggleEditActModalOpen = (careerId) => {
        const career = [...careers, ...activities].find(item => item.careerId === careerId);
        if (career) {
            const careerData = {
                id: careerId,
                categoryName: career.category,
                categoryId: null, // 실제 값으로 채워야 함
                careerName: career.careerName,
                alias: career.alias,
                startDate: career.startDate,
                endDate: career.endDate,
                isUnknown: null, // 적절한 값으로 채워야 함
                summary: career.summary
            };

            setSelectedCareer({ data: careerData });
        }
        setIsEditActModalOpen(prev => !prev);
    };
    //추가한 활동 업데이트
    const handleAddCareer = (newCareer) => {
    setCareers([...careers, newCareer]);
    };

    //수정한 활동 업데이트
    const handleSaveCareerEdit = (updatedData)=>{
        setCareers(prevCareers => 
            prevCareers.map(career =>
                career.careerId === updatedData.careerId ? updatedData : career
            )
        )
        setIsEditActModalOpen(false);
    }

    return (
        <BackgroundDiv>
            <BaseDiv>
            {isAddActModalOpen && <AddCareerModal onClose={toggleAddActModalOpen} onSave={handleAddCareer}/>}
            {isEditActModalOpen && 
                <AddCareerModalEdit 
                    onClose={toggleEditActModalOpen}
                    data={selectedCareer}
                    onSave={handleSaveCareerEdit}/>}
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
                        {
                            addressStatus === 1 ? (
                                <Address
                                    data={profiles.address}
                                    status={addressStatus}
                                    isEdit={() => setAddressStatus(1)}
                                    onSave={(curData) => handleSaveAddress(curData)}
                                />
                            ) : !profiles.address || addressStatus === null ? (
                                <p
                                    style={{ color: '#707070', fontSize: '14px', textDecorationLine: 'underline', margin: '15px 0px', cursor: 'pointer' }}
                                    onClick={handleNullAddressClick}
                                >
                                    주소를 입력하세요
                                </p>
                            ) : (
                                <Address
                                    data={profiles.address}
                                    status={addressStatus}
                                    isEdit={() => setAddressStatus(1)}
                                    onSave={(curData) => handleSaveAddress(curData)}
                                />
                        )}



                    </div>
                </div>

                <Linear />
                {/* (2) Educations */}
                <h3>학력</h3>
                {educations.slice().reverse().map((education, index) => (
                    isEdit[index] 
                    ? <EditItem key={index} 
                        data={education}  
                        isLastItem={index === educations.length - 1}
                        onCancel={() => handleDeleteEducation(index, education.educationId)}
                        onEdit={(updatedData)=>handleUpdateEducation(education.educationId, updatedData)}
                        /> 
                    : <EducationItem key={index} data={education} onEdit={() => handleEdit(index, education.educationId)}
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
                {careers.slice().reverse().map((career, index)=>(
                    <CareerItem
                        key={index} 
                        data={career} 
                        isLastItem={index === careers.length - 1}
                        onEdit={() => toggleEditActModalOpen(career.careerId)}
                    />
                ))}
                <AddButton onClick={toggleAddActModalOpen}>+</AddButton>

                <Linear />
                {/* (4) Activities */}
                <h3 style={{marginBottom:'30px'}}>활동 및 경험</h3>
                {activities.slice().reverse().map((activity, index)=>(
                    <CareerItem 
                        key={index} 
                        data={activity} 
                        isLastItem={index === activities.length - 1}
                        onEdit={() => toggleEditActModalOpen(activity.careerId)}/>
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
`;
