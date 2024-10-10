import React, { useState } from 'react';
import styled from 'styled-components';

import { Affiliation1 } from './Affiliation';
import { Button } from '@mobiscroll/react';

const AddActivityModal =({onAdd, onClose})=>{

    const categoryMap = {
        1: "동아리", 2:"대외활동", 3:"공모전/대회", 4:"프로젝트", 5:"경력", 6:"교육", 7:"기타"
    }
    const categoryColors = {
        1: "#FCC400", 2: "#77AFF2", 3: "#C48DEF", 4: "#78D333", 5: "#FA7C79", 6: "#F99538", 7: "#707070", 
    }

    //현재 선택된 카테고리
    const [selectedCategory, setSelectedCategory] = useState(1);

    //12가지 유형의 form Data 상태관리
    const [title, setTitle] = useState(""); //활동명
    const [alias, setAlias] = useState(""); //별칭
    const [period, setPeriod] = useState(""); //기간 type?
    const [affiliation, setAffiliation] = useState(0); //소속(0: 교내, 1: 교외, 2: 기타)
    const [role, setRole] = useState(""); //역할
    const [organizer, setOrganizer] = useState(""); //주최
    const [careerType, setCareerType] = useState(""); //경력분류
    const [workplace, setWorkplace] = useState(""); //근무처
    const [position, setPosition] = useState(""); //직급/직위
    const [jobField, setJobField] = useState(""); //직무/분야
    const [educationHours, setEducationHours] = useState(0); //교육시간
    const [participantType, setParticipantType] = useState({}); //인원-팀인원-기여도

    //Logic: 선택된 카테고리에 따라 상이한 forms 조합을 렌더링합니다.
    const renderFormByCategory =()=>{
        switch(selectedCategory){
            case 1:
                return(
                    <>
                    <FormItem spanTwoColumns>
                        <label>활동명 <span style={{color:"#FC5555"}}>*</span></label>   
                        <input type="text" placeholder='ex) 광고 기획 동아리, 앱 개발 프로젝트 등(20자 이내)'></input>
                    </FormItem>
                    <FormItem spanTwoColumns>
                        <label>별칭 <span style={{color:"#FC5555"}}>*</span></label>   
                        <input type="text" placeholder='ex) UMC, 멋쟁이사자처럼 등(20자 이내)'></input>
                    </FormItem>
                    <FormItem spanTwoColumns>
                        <label>기간 <span style={{color:"#FC5555"}}>*</span></label>   
                    </FormItem>
                    <FormItem><input placeholder='YYYY-MM-DD'></input></FormItem>
                    <FormItem><input placeholder='YYYY-MM-DD'></input></FormItem>
                    <FormItem>
                        <label>소속 <span style={{color:"#FC5555"}}>*</span></label>   
                    </FormItem>
                    <FormItem>
                        <label>역할</label>     
                    </FormItem>
                    <FormItem>
                        <Affiliation1 onAffiliationChange={() => console.log("not yet")}/>
                    </FormItem>
                    <FormItem><input type="text" placeholder='ex) 팀장, 부원, 기획자 등'></input></FormItem>
                    </>

                )
            case 2:
                return(
                    <></>
                )
            case 3:
                return(
                    <></>
                )
            case 4:
                return(
                    <></>
                )
            case 5:
                return(
                    <></>
                )
            case 6:
                return(
                    <></>
                )
            case 7:
                return(
                    <></>
                )
            default:
                return null;
        }
    }


    return(
        <ModalBackground>
            <ModalContainer>
                <h1 style={{textAlign: "center"}}>활동추가</h1>
                <ButtonContainer>
                    {Object.keys(categoryMap).map((key)=>(
                        <CategoryButton 
                            type="button"
                            key={key} 
                            isSelected={selectedCategory === parseInt(key)}
                            bgColor={categoryColors[key]}
                            onClick={()=>setSelectedCategory(parseInt(key))}
                        >
                            {categoryMap[key]}
                        </CategoryButton>
                ))}
                </ButtonContainer>
                <ModalForm>
                    {renderFormByCategory()}
                </ModalForm>
                <SaveButton
                    type="button"
                >저장</SaveButton>
            </ModalContainer>
        </ModalBackground>


    )
}

export default AddActivityModal


// Modal 전체 레이아웃
const ModalForm = styled.form`
    border-radius: 10px;
    background: #FFF;
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* 두 개의 열 */
    grid-gap: 20px; /* 요소들 간의 간격 */
    width: 100%;

    // 스크롤바
    max-height: 400px;
    overflow-y: auto;
    overflow-x:hidden;
    padding-right: 20px;
`;

// 전체 너비를 차지하는 폼 요소 (활동명, 별칭 등)
const FullWidthInput = styled.div`
    grid-column: span 2; /* 열 두 개를 차지 */
`;

// 개별 폼 요소 스타일
const FormItem = styled.div`
    display: flex;
    flex-direction: column;
    grid-column: ${(props) => (props.spanTwoColumns ? 'span 2' : 'span 1')}; /* 열을 조건부로 설정 */
    width:100%;
    label {
        margin-bottom: 8px;
        font-size: 18px;
        font-weight: bold;
    }
    input {
        height: 40px;
        padding: 10px;
        font-size: 16px;
        border: none;
        border-radius: 10px;
        background: #F5F5F5;
        width: 100%;
}`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 10px; /* 버튼들 간의 간격 설정 */
    justify-content: center; /* 버튼을 가운데 정렬 */
    flex-wrap: wrap; /* 버튼들이 화면에 맞지 않을 경우 줄바꿈 처리 */
`;

const CategoryButton = styled.button`
    display: flex;
    height: 35px;
    padding: 6px 16px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 10px;
    font-size: 14px;
    cursor: pointer;
    border:none;

    background-color: ${(props) => (props.isSelected ? props.bgColor : "#F5F5F5")};
    color: ${(props) => (props.isSelected ? "#FFF" : "#707070")};

    &:focus {
        outline: none;
    }
`
const ModalContainer = styled.div`
    position: fixed;
    top: 50%; 
    left: 50%; 
    transform: translate(-50%, -50%); 
    width: 900px;
    max-width: 90%;
    background-color:#FFF;
    border-radius:10px;
    padding: 50px 60px;
    z-index: 1000;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 768px) {
    width: 100%;
    max-height: 90%;
    overflow-y: auto;
    }
`

const ModalBackground = styled.div`
    position:fixed;
    top: 0;
    left:0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    z-index: 999;
`

const SaveButton = styled.button`
    width: 680px;
    height: 50px;
    background-color: #3AAF85;
    border: none;
    border-radius: 10px;
    color: white;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    font-size: 18px;
`