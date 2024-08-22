import api from '../../Axios.js'
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import './history.css'
import SubNav from '../../components/History/SubNav'
import Convert from '../../components/History/Convert'
import Toggle from '../../components/History/Toggle'
import ButtonOptions from '../../components/History/AddButton.jsx'
import Alert from '../../components/History/Alert'
import AddJobModal from '../../components/shared/AddJobModal.jsx'
import { click } from '@testing-library/user-event/dist/click.js'


const OthersRewrite=()=> {
    const navigate = useNavigate();
    const { id } = useParams();

    // (Data) questions: 질문 목록, contents: 질문 외 정보
    const [questions, setQuestions] = useState([]);//{title, content, number}
    const [contents, setContents] = useState({
        id:0,
        recruitId:0,
        memberId:0,
        recruitTitle:"",
        deadline:"",
        link:"",
        tags:[],
        timeSinceUpdate:"",
        updatedAt:"",
        state:0
        
    })
    const [modalOpend, setModalOpend] = useState(false); //삭제 경고문 알람 모달
    const [dropdownOpend, setDropdownOpend] = useState(false);
    const [isCompleted, setIsCompleted] = useState(0);//작성중or작성완료
    const [addJobModalOpened, setAddJobModalOpened] = useState(false); //공고 추가 모달
    const [show, setShow] = useState(false);//추가 불가 알람창
    const [gotoShow, setGotoShow] = useState(false);//공고 보러가기 불가 알람창
    const [charCounts, setCharCounts] = useState([]);
    
    useEffect(()=>{
        setCharCounts(questions.map((question) => question.content.length));
    },[questions]);
    

    //(API) 자기소개서 개별 조회
    useState(()=>{
        api.get(`/history/intro/detail/${id}`)
            .then(response=>{
                console.log(response.data);
                const Data = response.data.data;
                setQuestions(Data.questionList);
                setContents({
                    id:Data.id,
                    recruitId:Data.recruitId,
                    memberId:Data.memberId,
                    recruitTitle:Data.recruitTitle,
                    deadline:Data.deadline,
                    link:Data.link,
                    tags:Data.tags,
                    timeSinceUpdate:Data.timeSinceUpdate,
                    updatedAt:Data.updatedAt,
                })
                setIsCompleted(Data.state);
            })
            .catch(error=>{
                console.log(error);
            })
    },[])

    //(API) 자기소개서 삭제
    const deleteResume=()=>{
        api.delete(`/history/intro/${id}`)
            .then(response=>{
                console.log(response.data);
                changeState();
                navigate('/history/list/3')
            })
            .catch(error=>{
                console.log(error);
            })
    }

    //(API) 자기소개서 삭제 후 공고상태 변경
    const changeState=()=>{
        api.patch(`/recruit/${contents.recruitId}`,{"status":"unapplied"})
        .then(response=>{
            console.log('상태 변경 결과: ', response.data);
        })
        .catch(error=>{
            console.log(error);
        })
    }




    //Others 변경 내용 수정
    const handleInputChange = (number, field, event)=>{
        const newQuestions = questions.map((question=>
            question.number === number ? {...question, [field]:event.target.value} : question
        ));
        setQuestions(newQuestions); 
        setCharCounts(prev=>prev.map((count, i)=>i===number ? event.target.value.length : count));   
        console.log(charCounts); 
    }

    const submitData=()=>{
        const Data = {
            questionList: questions,
            state: isCompleted
          }
          console.log("자소서 수정 데이터: ", Data);
          //(API) 내용 수정
        api.patch(`history/intro/${contents.id}`,Data)
            .then(response=>{
                console.log(response.data);
            })
            .catch(error=>{
                console.log(error);
            })
    }

    setInterval(submitData,60000);

    const handleSubmit = (event)=>{
        event.preventDefault();
        submitData();
        navigate(`/history/others/${id}`);
    }

    //-----Clicks-----------------------------------------------------------
    //공고추가 모달 오픈
    const toggleAddJobModal=()=>{
        setAddJobModalOpened(!addJobModalOpened);
    }
    //삭제 모달 오픈
    const toggleModal=()=>{
        setModalOpend(!modalOpend);
    }
    //드롭다운클릭
    const handleDropdownClick=(isCompleted)=>{
        setIsCompleted(isCompleted);
        const status = isCompleted ? "applying" : "planned";
        //(API) 자소서 상태 변
        api.patch(`/recruit/${contents.recruitId}`,{status:status})
        .then(response=>{
            console.log('상태 변경 결과: ', response.data);
        })
        .catch(error=>{
            console.log(error);
        })

        toggleDropdown();
    }
    const toggleDropdown=()=>{
        setDropdownOpend(!dropdownOpend);
    }
    //질문 추가 버튼 클릭
    const handleAddClick =()=>{
        let count = 0;
        questions.map(question=>{
            if(!(question.subTitle)&&!question.content) {count++; console.log(question.number);}
        })
        if(count<3) setQuestions([...questions,{number:questions.length,subTitle:'', content:''}]);
        else showLimiter();
    }

    const showLimiter=()=>{
        setShow(true);
        setTimeout(()=>{
            setShow(false);
        },3000);
    }
    //질문 삭제 버튼 클릭
    const deleteItem=(number)=>{
        const deletedQuestions = questions.filter(question=>question.number!==number);
        setQuestions(deletedQuestions);
    }
    //공고 보러가기 클릭
    const clickGotoApply=()=>{
        if(contents.link){
            window.open(contents.link);
        }
        else{
            setGotoShow(true);
            setTimeout(()=>{
                setGotoShow(false);
            },3000);
        }  
    }
    return (
        
        <BackgroundDiv>
            <BaseDiv>
                <ContentTitle>
                    <h1 style={{position:'relative',display:'inline-block', marginRight:'12px'}}>{contents.recruitTitle}</h1>
                    <div style={{display:'inline-block', position:'relative'}}>
                        {modalOpend && <Alert closeModal={toggleModal} deleteResume={deleteResume}></Alert>}{/* 삭제 경고문 */}
                        <Limiter show={show}>빈 질문을 먼저 채워주세요!</Limiter>{/* 질문추가 경고문 */}
                        <Limiter show={gotoShow} style={{width:"250px"}}>등록된 링크가 없습니다. <br/>공고 수정에서 링크를 등록해주세요!</Limiter>
                        {addJobModalOpened && <AddJobModal onClose={toggleAddJobModal} style={{position:'relative', zIndex:1000}}></AddJobModal>}{/* 공고추가 모달 */}
                        <Tag onClick={toggleDropdown} style={{color:'white', width:'60px',cursor:'pointer'}}>{isCompleted ? "작성 완료" : "작성 중"} ▼</Tag>
                        {dropdownOpend&&<Dropdown>
                            <DropdownItem onClick={()=>handleDropdownClick(0)}>작성 중</DropdownItem>
                            <DropdownItem onClick={()=>handleDropdownClick(1)}>작성 완료</DropdownItem>
                        </Dropdown>}
                    </div>
                    {contents.tags.map(tag=>(
                        <Tag style={{background: '#F5F5F5', color:'#3AAF85'}}>{tag}</Tag>
                    ))}
                    <br/>
                    <p className='lastUpdated' style={{display:'inline-block',color:'red', margin:'0 20px 8px 0px', textAlign:'left'}}>공고 마감 일시 : {contents.deadline}</p>               
                        <button
                            onClick={clickGotoApply}
                            style={{display:'inline-block',width:'140px', height:'30px', background:'#FFF', border:'1px solid #707070', borderRadius:'10px',fontFamily:'Regular', color:'#707070',fontSize:'15px',cursor:'pointer'}}
                        >공고 보러가기</button>
                    <svg
                        onClick={toggleAddJobModal}
                        style={{width:'30px', height:'30px', position:'absolute', top:'50px', right:'5px', cursor:'pointer', zIndex:'900'}} 
                        xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                        <path d="M0 23.7509V30H6.24913L24.6799 11.5692L18.4308 5.32009L0 23.7509ZM29.5126 6.73656C30.1625 6.08665 30.1625 5.0368 29.5126 4.38689L25.6131 0.487432C24.9632 -0.162477 23.9133 -0.162477 23.2634 0.487432L20.2139 3.53701L26.463 9.78614L29.5126 6.73656Z" fill="#707070"/>
                    </svg>
                </ContentTitle>
                
                <Linear style={{width:'820px'}}/>
                <p className='lastUpdated' style={{marginTop:0}}>마지막 수정일시: {contents.updatedAt}</p>                  
                <form>
                    {questions.map((question, index)=>(
                        <div style={{position:'relative'}}>
                            <Delete style={{left:'10px', top:'10px', color:'#707070', fontSize:'24px',lineHeight:'normal',cursor:'default'}}>
                                {index+1}
                            </Delete>
                            <Delete onClick={()=>deleteItem(question.number)}>삭제</Delete>
                            <InputTitle
                                placeholder={'질문을 작성하세요'}
                                style={{height:'50px', marginBottom:'12px', paddingLeft:'50px', width:'770px'}}
                                value={question.title || ''}
                                onChange={(e)=>handleInputChange(question.number,'title',e)}
                            />
                            <InputTitle
                                placeholder={'답변을 작성하세요'}
                                style={{height:'150px', marginBottom:'35px'}}
                                value={question.content || ''}
                                onChange={(e)=>handleInputChange(question.number,'content',e)}
                            />
                            <p style={{fontFamily:'Regular', fontSize:'16px', color:'#707070', position:'absolute', right:'20px', top:`${index+165}px` }}>
                                {charCounts[index]} (공백포함)
                            </p>

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
export default OthersRewrite

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

const Delete = styled.div`
    width: 30px;
    height: 20px;
    color: #707070;
    font-size:15px;
    font-family:Regular;
    cursor:pointer;
    position:absolute;
    top: 16px;
    right:10px;
`