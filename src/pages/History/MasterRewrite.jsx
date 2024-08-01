import api from "../../Axios";
import React,{useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SubNav from '../../components/History/SubNav'
import Toggle from '../../components/History/Toggle'
import ButtonOptions from '../../components/History/AddButton'

const MasterRewrite =()=>{

    const dummyData = [
        {
            "id": 1,
            "oneLiner": "한줄소개",
            "introduce": "자기소개입니다.",
            "reason_for_applying":"지원동기입니다.",
            "strengths_and_weaknesses":"장단점입니다.",
            "job_fit":"직무적합성입니다.",
            "created_at": "2024-07-23T15:47:38.011066",
            "updated_at": "2024-07-23 15:47"
        }
    ]
    const content = dummyData[0];

    const navigate = useNavigate();

    const [questions, setQuestions] = useState({
        oneLiner:"",
        introduction:"",
        motive:"",
        prosAndCons:"",
    }) 

    const handleOnChange =(id,value)=>{
        setQuestions(prevQuestions => ({ ...prevQuestions, [id]: value }));
        console.log(questions);
    }

    //(API) 마스터 조회
    useEffect(()=>{
        api.get('/history/intro/master')
            .then(response=>{
                const Data = response.data.data[0];
                console.log(Data);
                setQuestions({
                    oneLiner:Data.oneLiner,
                    introduction:Data.introduction,
                    motive:Data.motive,
                    prosAndCons:Data.prosAndCons
                })
            })
            .catch(error=>{
                console.log("Error:", error);
            })
    },[])

    const submitData =()=>{
        api.patch('/history/intro/master/1',questions)
            .then(response=>{
                console.log(response.data);
            })
            .catch(error=>{
                console.log("Error: ", error);
            })
    }

    // setInterval({submitData},5000);

    const handleSubmit = (event)=>{
        event.preventDefault();
        // navigate('/history/master');
        submitData();
    }

    return(
        <BackgroundDiv>
            <BaseDiv>
                <h1 style={{display:'inline-block'}}>Master</h1>
                <Linear style={{width:'820px'}}/>
                <p className='lastUpdated' style={{marginTop:0}}>마지막 수정일시: {content.updated_at}</p>           
                <InputTitle
                    id="oneLiner"
                    placeholder="한줄소개를 작성하세요"
                    style={{height:'50px', marginBottom:'12px'}}
                    value={questions.oneLiner||''}
                    onChange={(e)=>handleOnChange(e.target.id, e.target.value)}
                />
                <InputTitle
                    id="introduction"   
                    placeholder="자기소개를 작성하세요"
                    style={{height:'150px', marginBottom:'12px'}}
                    value={questions.introduction||''}
                    onChange={(e)=>handleOnChange(e.target.id, e.target.value)}
                />
                <h2>지원동기</h2>
                <InputTitle
                    id="motive"
                    placeholder="지원동기를 작성하세요"
                    style={{height:'150px', marginBottom:'12px'}}
                    value={questions.motive||''}
                    onChange={(e)=>handleOnChange(e.target.id, e.target.value)}
                />
                <h2>장단점</h2>
                <InputTitle
                    id="prosAndCons"
                    placeholder="장단점을 작성하세요"
                    style={{height:'150px', marginBottom:'12px'}}
                    value={questions.prosAndCons||''}
                    onChange={(e)=>handleOnChange(e.target.id, e.target.value)}
                />
                <h2>직무적합성</h2>
                <InputTitle
                    id="jobFit"
                    placeholder="직무적합성을 작성하세요"
                    style={{height:'150px', marginBottom:'12px'}}
                    value={content.job_fit||''}
                    onChange={console.log('api수정필요-직무적합성 추가')}
                />
                <div style={{height:'70px'}}></div>
                <Button 
                        onClick={handleSubmit}
                        style={{width:'820px',borderRadius:'10px', background:'#3AAF85', color:'#FFF'}}>
                    저장하고 나가기</Button>


            </BaseDiv>
        </BackgroundDiv>
    )
}
export default MasterRewrite

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
`

const InputTitle = styled.input`
    width: 780px;
    flex-shrink: 0;
    border:none;
    border-radius: 10px;
    background: var(--gray-06, #F5F5F5);    
    padding: 0px 20px;
    color: var(--gray-02, #707070);
    font-family:Regular;
    font-size:16px;
    font-weight:400;
    line-height:normal;
`

const Linear = styled.div`
    height: 4px;
    background-color: #F1F1F1;
    margin-top: 12px;
    margin-bottom: 20px;
`
const Button = styled.button`
    height: 50px;
    border:none;
    border-radius: 10px; 
    cursor:pointer;
    font-family:Regular;
    font-size:18px;
`
