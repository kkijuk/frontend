import api from "../../Axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './history.css'
import styled from "styled-components";
import AddApplyModal from "../../components/shared/AddApplyModal";
import { createRecruit } from "../../api/Apply/Recruit";

// Todo
// - 미지원 공고 api 연결
// - 선택 공고 상세 api 연결
// - 자소서 생성 api 연결
// - 해당 공고 상태 변경 api 연결
// - 다음 버튼 라우팅
// - 공고 추가 모달 연결

const Select =()=>{
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const formattedDate =(date)=>{
        const year = date.getFullYear();
        const month = String(date.getMonth()+1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}`;
    }

    //(Data) 미지원 공고(id), 선택 공고 세부 정보, 생성된 자소서의 id
    const [recruits, setRecruits] = useState([]);
    const [currentApply, setCurrentApply] = useState(0);
    const [detail, setDetail] = useState({
        startTime:"",
        endTime:"",
        tag:[]
    })
    const [newId, setNewId] = useState(0);

    //1. 미지원 공고 불러오기
    //(API) unapplied 공고 조회
    useEffect(()=>{
        //오늘 날짜
        const now = new Date();
        const formattedTime = formattedDate(now);
        const encodedTime = encodeURIComponent(formattedTime);
        console.log(encodedTime);

        api.get(`/recruit/list/valid?time=${encodedTime}`)
            .then(response=>{
                console.log(response.data);
                const recruitsData = response.data.unapplied.recruits;
                setRecruits(recruitsData);
                if (recruitsData.length > 0) {
                    setCurrentApply(recruitsData[0].id);
                }
            })
            .catch(error=>{
                console.log("Error: ", error);
            })
    },[])

    useEffect(()=>{
        console.log("Recruits 목록: ", recruits);
    },[recruits])

    //2. 선택된 미지원 공고 세부정보 불러오기
    const handleClickItem=(id)=>{
        setCurrentApply(id);
    }
    //(API) 공고 세부정보 조회
    useEffect(()=>{
        api.get(`/recruit/${currentApply}`)
            .then(response=>{
                console.log(response.data);
                const detailData = response.data;
                setDetail({
                    startTime:detailData.startTime,
                    endTime:detailData.endTime,
                    tag:detailData.tags
                })
            })
            .catch(error=>{
                console.log("Error: ", error);
            })
    },[currentApply])

    //3. 해당 공고 자소서 생성하기 
    const handleNextClick =()=>{
        const postData = {
            questionList:[
                {title:"string", content:"string", number:0},
                {title:"string", content:"string", number:1},
                {title:"string", content:"string", number:2}
            ],
            state: 0
        };

        //(API) 자소서 생성
        api.post(`/history/intro/${currentApply}`,postData)
            .then(response=>{
                console.log("자소서생성: ",response.data);
                //결과물로 '자소서'아이디 생성되면
                //useEffect로 id 변화 감지해서, 해당 페이지로 라우팅.
                setNewId(response.data.data.id);
            })
            .catch(error=>{
                console.error('Error:',error);
        })

        //(API) 해당 공고 상태 변경
        api.patch(`/recruit/${currentApply}`,{"status":"planned"})
            .then(response=>{
                console.log('상태 변경 결과: ', response.data);
            })
            .catch(error=>{
                console.log(error);
            })
        
    }

    useEffect(()=>{
        if(newId) navigate(`/history/others/${newId}/rewrite`);
    },[newId])

    const handleSave = (id) => {
        // 공고 데이터를 추가하고 recruits 목록을 업데이트
        const now = new Date();
        const formattedTime = formattedDate(now);
        const encodedTime = encodeURIComponent(formattedTime);

        api.get(`/recruit/list/valid?time=${encodedTime}`)
            .then(response => {
                const recruitsData = response.data.unapplied.recruits;
                setRecruits(recruitsData); // 전체 목록을 새로 가져와 업데이트
                setCurrentApply(id); // 추가한 공고를 선택 상태로 설정
            })
            .catch(error => {
                console.log("Error: ", error);
            });
    };

    return( 
        <BackgroundDiv>
            <BaseDiv>
                <div style={{position:'absolute', zIndex:1000}}>
                    {isModalOpen && 
                        <AddApplyModal
                            onClose={()=>setIsModalOpen(false)}
                            onSave={handleSave}
                        />}
                        {/* //id 리스트에 추가해서 id가 변하면 공고 목록도 새로 불러옴 */}
                </div>
                <div style={{height:'140px'}}></div>
                <h1>자기소개서를 작성할 공고를 선택해주세요.</h1>
                <div style={{height:'50px'}}></div>
                <ListDiv>
                    <ItemsDiv>
                        {
                            recruits.map(recruit=>(
                                <ListItem 
                                    onClick={()=>{handleClickItem(recruit.id)}}  
                                    style={{backgroundColor: currentApply===recruit.id ? '#E1FAED' :'#F5F5F5',
                                            color: currentApply===recruit.id ? 'black' :'#707070',
                                            border: currentApply===recruit.id ? '2px solid var(--main-01, #3AAF85)' :'none'}}>
                                {recruit.title}
                                </ListItem>
                            ))
                        }
                    </ItemsDiv>
                    <AddButton onClick={()=>setIsModalOpen(true)}>공고 추가</AddButton>
                </ListDiv>
                <div style={{height:'30px'}}></div>
                <InfoDiv>
                    <Item style={{top:'10px'}}>
                        <p style={{fontWeight:800}}>접수시작</p>
                        <p >{detail.startTime}</p>
                    </Item>
                    <Item style={{top:'10px',right:'150px'}}>
                        <p style={{fontWeight:800}}>접수마감</p>
                        <p style={{color:'#FC5555'}}>{detail.endTime}</p>
                    </Item>
                    <Item style={{top:'50px'}}>
                        <p style={{fontWeight:800}}>태그</p>
                        {detail.tag.map(tag=>(
                            <Tag style={{background: '#FFF', color:'#3AAF85'}}>{tag}</Tag>
                        ))}
                    </Item>
                    {/* <button
                        style={{width:'140px',height:'28px',border:'1px solid #707070'}}>
                            공고 보러가기
                    </button> */}
                </InfoDiv>
                <Button onClick={handleNextClick}>다음</Button>
            </BaseDiv>
        </BackgroundDiv>
    )

}

export default Select

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
    display:flex;
    flex-direction: column;
    align-items:center;
    // margin-left:400px;
    max-width: 820px;
    // background-color:#D9D9D9
    position:relative
`
const ListDiv = styled.div`
    width: 720px;
    height: 84px;
    flex-shrink: 0;
    border-radius: 12px;
    border: 1px solid var(--gray-02, #707070);
    display:flex;
    align-items:center;
    gap:10px;
    padding: 0px 10px;
`

const ItemsDiv=styled.div`
    display:flex;
    overflow-x:auto;
    gap:10px;
    flex: 1;
    white-space: nowrap; /* 항목들이 한 줄에 배치되도록 설정 */

    &::-webkit-scrollbar {
        height: 0px;
    }
`

const ListItem=styled.div`
    display: flex;
    max-width:100px;
    height: 60px;
    padding: 0px 36px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 10px;
    text-align: center;
    font-family: Regular;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    cursor:pointer;
`

const InfoDiv = styled.div`
    width: 720px;
    height: 70px;
    flex-shrink: 0;
    border-radius: 12px;
    background: var(--gray-06, #F5F5F5);
    padding: 15px 10px;
    position:relative;
    z-index:0;
`

const Button = styled.div`
    width: 620px;
    height: 50px;
    flex-shrink: 0;
    border-radius: 10px;
    background: var(--main-01, #3AAF85);
    color: #FFF;
    text-align: center;
    font-family: Regular;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    display:flex;
    align-items:center;
    justify-content:center;
    cursor:pointer;
    margin-top:97px;
`

const Item = styled.div`
    width:250px;
    display:flex;
    align-items:center;
    gap:20px;
    position:absolute;
`

const Tag=styled.div`
    display: inline-flex;
    height: 22px;
    padding: 0px 16px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;

    border-radius: 20px;
    background: #3AAF85;    
    font-family:'Regular';
    font-size:12px;
    text-align: center;
    font-weight: 400;
    line-height: normal;
`
const AddButton = styled.div`
    width: 120px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    background: var(--gray-04, #707070);
    color: white;
    cursor: pointer;

    color: #FFF;
    text-align: center;
    font-family: Regular;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`
