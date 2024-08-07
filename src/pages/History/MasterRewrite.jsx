import api from "../../Axios";
import React,{useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SubNav from '../../components/History/SubNav'
import Toggle from '../../components/History/Toggle'
import ButtonOptions from '../../components/History/AddButton'

const MasterRewrite =()=>{

    const navigate = useNavigate();

    //(Data) 한줄소개, 지원동기및포부 제목 및 내용, 장단점 제목 및 내용, 직무적합성 제목 및 내용
    const [questions, setQuestions] = useState({
        memberId:0,
        oneLiner:"",
        motiveTitle:"",
        motive:"",
        prosAndConsTitle:"",
        prosAndCons:"",
        jobSuitabilityTitle:"",
        jobSuitability:"",
        updatedAt:""
    })

    //1. 마스터 저장 내용 불러오기
    //(API) 마스터 조회
    useEffect(()=>{
        api.get('/history/intro/master')
            .then(response=>{
                console.log(response.data);
                const Data = response.data.data[0];
                console.log(Data.id);
                setQuestions({
                    memberId:Data.memberId,
                    oneLiner:Data.oneLiner,
                    motiveTitle:Data.motiveTitle,
                    motive:Data.motive,
                    prosAndConsTitle:Data.prosAndConsTitle,
                    prosAndCons:Data.prosAndCons,
                    jobSuitabilityTitle:Data.jobSuitabilityTitle,
                    jobSuitability:Data.jobSuitability,
                    updatedAt:Data.updatedAt
                })

            })
            .catch(error=>{
                console.log("Error:", error);
            })
    },[])

    //2. 마스터 변경 내용 수정(저장 버튼 + 정기 호출)
    const handleOnChange =(id, value)=>{
        const updatedQuestions = {...questions, [id]:value};
        setQuestions(updatedQuestions);
    };


    //(API) 마스터 수정
    const submitData =()=>{
        api.patch('/history/intro/master?id=1',questions)
            .then(response=>{
                console.log(response.data);
            })
            .catch(error=>{
                console.log("Error: ", error);
            })
    }

    setInterval(submitData,60000);

    const handleSubmit = (event)=>{
        event.preventDefault();
        submitData();
        navigate('/history/master');
    }


    return(
        <BackgroundDiv>
            <BaseDiv>
                <InputTitle
                    id="oneLiner"
                    placeholder="한줄소개를 작성하세요"
                    style={{height:'50px', marginBottom:'12px'}}
                    value={questions.oneLiner||''}
                    onChange={(e)=>handleOnChange(e.target.id, e.target.value)}
                />
                <Linear style={{width:'820px'}}/>
                {/* <p className='lastUpdated' style={{marginTop:0}}>마지막 수정일시: {content.updated_at}</p>            */}
                <InputTitle
                    id="motiveTitle"
                    placeholder="지원동기 제목을 작성하세요"
                    style={{height:'50px', marginBottom:'12px'}}
                    value={questions.motiveTitle||''}
                    onChange={(e)=>handleOnChange(e.target.id, e.target.value)}
                />
                <InputTitle
                    id="motive"
                    placeholder="지원동기를 작성하세요"
                    style={{height:'150px', marginBottom:'12px'}}
                    value={questions.motive||''}
                    onChange={(e)=>handleOnChange(e.target.id, e.target.value)}
                />
                <InputTitle
                    id="prosAndConsTitle"
                    placeholder="장단점 제목을 작성하세요"
                    style={{height:'50px', marginBottom:'12px'}}
                    value={questions.prosAndConsTitle||''}
                    onChange={(e)=>handleOnChange(e.target.id, e.target.value)}
                />
                <InputTitle
                    id="prosAndCons"
                    placeholder="장단점을 작성하세요"
                    style={{height:'150px', marginBottom:'12px'}}
                    value={questions.prosAndCons||''}
                    onChange={(e)=>handleOnChange(e.target.id, e.target.value)}
                />
                <InputTitle
                    id="jobSuitabilityTitle"
                    placeholder="직무적합성 제목을 작성하세요"
                    style={{height:'50px', marginBottom:'12px'}}
                    value={questions.jobSuitabilityTitle||''}
                    onChange={(e)=>handleOnChange(e.target.id, e.target.value)}
                />
                <InputTitle
                    id="jobSuitability"
                    placeholder="직무적합성을 작성하세요"
                    style={{height:'150px', marginBottom:'12px'}}
                    value={questions.jobSuitability||''}
                    onChange={(e)=>handleOnChange(e.target.id, e.target.value)}
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
