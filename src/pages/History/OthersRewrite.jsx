import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import './history.css'
import SubNav from '../../components/History/SubNav'
import Convert from '../../components/History/Convert'
import Toggle from '../../components/History/Toggle'
import ButtonOptions from '../../components/History/ButtonOptions'
import Alert from '../../components/History/Alert'
import AddJobModal from '../../components/shared/AddJobModal.jsx'


export default function OthersRewrite() {
    const dummyData = [
        {
            "id": 100,
            "oneLiner": "UMC 7기 지원",
            "questions":[
                {
                    "number": 0,
                    "subTitle": "첫 번째 질문",
                    "content": ""
                },
                {
                    "number":1,
                    "subTitle": "",
                    "content": "아직 지원동기 및 포부를 작성하지 않았어요."
                },
                {
                    "number":2,
                    "subTitle": "세 번째 질문",
                    "content": "세 번째 질문의 답변입니다."
                },
                {
                    "number":3,
                    "subTitle":"",
                    "content": ""
                }
            ],
            "complete":0,//state로 변경하기
            "career_tag":["동아리","서비스 기획"],
            "deadline": "2024-07-23T15:47:38.011066",
            "updated_at": "2024-07-23 15:47"
        }
    ]

    const resume = dummyData[0];
    const navigate = useNavigate();

    const [questions, setQuestions] = useState(resume.questions);
    const [modalOpend, setModalOpend] = useState(false);
    const [dropdownOpend, setDropdownOpend] = useState(false);
    const [isCompleted, setIsCompleted] = useState(resume.complete);
    const [addJobModalOpened, setAddJobModalOpened] = useState(false);

    const handleAddClick =()=>{
        setQuestions([...questions,{number:questions.length,subTitle:'', content:''}]);
    }

    const handleInputChange = (number, field, event)=>{
        const newQuestions = questions.map((question=>
            question.number === number ? {...question, [field]:event.target.value} : question
        ));
        setQuestions(newQuestions);     
    }

    const handleSubmit = (event)=>{
        event.preventDefault();
        navigate(-1);
        //수정 요청
        console.log('폼 제출', questions);
    }



    const toggleModal=()=>{
        setModalOpend(!modalOpend);
    }

    const toggleDropdown=()=>{
        setDropdownOpend(!dropdownOpend);
    }
    const handleDropdownClick=(isCompleted)=>{
        setIsCompleted(isCompleted);
        toggleDropdown();
    }

    const toggleAddJobModal=()=>{
        setAddJobModalOpened(!addJobModalOpened);
    }


    return (
        <BackgroundDiv>
            {modalOpend && <Alert closeModal={toggleModal}></Alert>}
            {addJobModalOpened && <AddJobModal onClose={toggleAddJobModal} style={{position:'relative', zIndex:1000}}></AddJobModal>}
            <BaseDiv>
                <ContentTitle>
                    <h1 style={{position:'relative',display:'inline-block', marginRight:'12px'}}>{resume.oneLiner}</h1>
                    <div style={{display:'inline-block', position:'relative'}}>
                        <Tag onClick={toggleDropdown} style={{color:'white', width:'60px',cursor:'pointer'}}>{isCompleted ? "작성 완료" : "작성 중"} ▼</Tag>
                        {dropdownOpend&&<Dropdown>
                            <DropdownItem onClick={()=>handleDropdownClick(0)}>작성 중</DropdownItem>
                            <DropdownItem onClick={()=>handleDropdownClick(1)}>작성 완료</DropdownItem>
                        </Dropdown>}
                    </div>
                    {resume.career_tag.map(tag=>(
                        <Tag style={{background: '#F5F5F5', color:'#3AAF85'}}>{tag}</Tag>
                    ))}
                    <div>
                        <p className='lastUpdated' style={{display:'inline-block',color:'red', margin:'0 20px 8px 0px', textAlign:'left'}}>공고 마감 일시 : {resume.deadline}</p>               
                        <button
                            //onClick={}
                            style={{display:'inline-block',width:'140px', height:'30px', background:'#FFF', border:'1px solid #707070', borderRadius:'10px',fontFamily:'Regular', color:'#707070',fontSize:'15px',cursor:'pointer'}}
                        >공고 보러가기</button>
                    </div>
                    <svg
                        onClick={toggleAddJobModal}
                        style={{width:'30px', height:'30px', position:'absolute', top:'50px', right:'5px', cursor:'pointer'}} 
                        xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                        <path d="M0 23.7509V30H6.24913L24.6799 11.5692L18.4308 5.32009L0 23.7509ZM29.5126 6.73656C30.1625 6.08665 30.1625 5.0368 29.5126 4.38689L25.6131 0.487432C24.9632 -0.162477 23.9133 -0.162477 23.2634 0.487432L20.2139 3.53701L26.463 9.78614L29.5126 6.73656Z" fill="#707070"/>
                    </svg>
                </ContentTitle>
                
                <Linear style={{width:'820px'}}/>
                <p className='lastUpdated' style={{marginTop:0}}>마지막 수정일시: {resume.updated_at}</p>                  
                <form>
                    {questions.map((question)=>(
                        <div>
                            <InputTitle
                                placeholder={`${question.number+1} 질문을 작성하세요`}
                                style={{height:'50px', marginBottom:'12px'}}
                                value={question.subTitle || ''}
                                onChange={(e)=>handleInputChange(question.number,'subTitle',e)}
                            />
                            <InputTitle
                                placeholder={'답변을 작성하세요'}
                                style={{height:'150px', marginBottom:'35px'}}
                                value={question.content || ''}
                                onChange={(e)=>handleInputChange(question.number,'content',e)}
                            />
                        </div>
                    ))}

                </form>
                <AddButton onClick={handleAddClick}>+</AddButton>
                <div style={{height:'70px'}}></div>
                <div style={{display: 'inline-flex', justifyContent: 'center', alignItems: 'center',gap: '15px'}}>
                    <Button 
                        onClick={toggleModal}
                        style={{width:'160px',border:'1.5px solid #FF7979',borderRadius:'10px', background:'#FFF',color:'red'}}>
                    삭제</Button>
                    <Button 
                        onClick={handleSubmit}
                        style={{width:'645px',borderRadius:'10px', background:'#3AAF85', color:'#FFF'}}>
                    저장하고 나가기</Button>
                        
                </div>
            </BaseDiv>
        </BackgroundDiv>
    )
}

const BackgroundDiv = styled.div`
    width: 100%;
    height: 100%;
    margin-top:40px;
    display:flex;
    // align-items:center;
    justify-content:center;
`

const BaseDiv = styled.div`
    width: 820px;
    // display:flex;
    // margin-left:400px;
    max-width: 820px;
    // background-color:#D9D9D9
    position:relative
    z-index:999;
    // & > * {
    //     positon:relative;
    //     z-index: 990; 
    // }
`

const SButton = styled.button`
    width: 76px;
    height: 35px;
    margin-right: 12px;
    font-family: 'Regular';
    border:none;
    border-radius: 10px;
    border-color: #FFFFFF;
    padding: 6px 16px 6px 16px;
    gap: 10px;
    background-color:#F5F5F5;
    color:#707070;
    cursor:pointer;
    
`
const ContentTitle=styled.div`
    position:relative;
    z-index:890;
    margin-top:10px;
    margin-bottom:33px;
`

const Tag=styled.div`
    display: inline-flex;
    height: 22px;
    padding: 0px 16px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    margin-right:12px;

    border-radius: 20px;
    background: #3AAF85;    
    font-family:'Regular';
    font-size:12px;
    text-align: center;
    font-weight: 400;
    line-height: normal;
`
const Linear = styled.div`
    height: 4px;
    background-color: #F1F1F1;
    margin-top: 12px;
    margin-bottom: 20px;
`
const InputTitle = styled.input`
    width: 820px;
    flex-shrink: 0;
    border:none;
    border-radius: 10px;
    background: var(--gray-06, #F5F5F5);    

    color: var(--gray-02, #707070);
    font-family:Regular;
    font-size:16px;
    font-weight:400;
    line-height:normal;
`
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
    
`
const Button = styled.button`
    height: 50px;
    border:none;
    border-radius: 10px; 
    cursor:pointer;
    font-family:Regular;
    font-size:18px;
`

const Dropdown=styled.div`
    width: 90px;
    height: 70px;
    flex-shrink: 0;
    border-radius: 13px;
    border: 1px solid var(--gray-02, #707070);
    background: #FFF;
    position:absolute;
    top:23px;
`
const DropdownItem=styled.p`
    color: var(--gray-01, #424242);
    text-align: center;
    font-family: Regular;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    cursor:pointer;

`