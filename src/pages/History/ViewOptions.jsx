import api from "../../Axios";
import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import Toggle from "../../components/History/Toggle";
import AddButton from "../../components/History/AddButton";

// Todo  
// - 옵션 로직 수정

const ViewOptions = () => {
    const navigate = useNavigate();
    const location = useLocation();

    //(Data) 토글 체크, 현재 선택한 공고, 리스트 조회 상태, 자기소개서 목록
    const [isChecked, setIsChecked] = useState(location.path !== '/history/list');
    const [currentApply, setCurrentApply] = useState('master');
    const [state, setState] = useState(3);
    const [recruits, setRecruits] = useState([]);

    //(API) 자기소개서 목록 불러오기
    useEffect(()=>{
        api.get('/history/intro/list')
        .then(response=>{
            console.log(response.data);
            const Data = response.data.data;
            setRecruits(Data);
            console.log(Data);
        })
        .catch(error=>{
            console.log(error);
        })
    },[])
    

    //토글 클릭
    const handleToggleClick = () => {
        isChecked ? navigate('/history/list/3') : navigate('/history/master');
        setIsChecked(!isChecked);
    };

    useEffect(() => {
        if (location.pathname === '/history/master') {
            setCurrentApply('master');
        } else if (location.pathname.startsWith('/history/others/')) {
            const match = location.pathname.match(/\/history\/others\/(\d+)/);
            if (match) {
                setCurrentApply(match[1]);
                console.log(match[1]);
            }

        }
        
    }, [location.pathname]);


    // 하위 페이지 라우팅
    const handleApplyClick = (id) => {
        setCurrentApply(id);
        id === 'master'
            ? navigate('/history/master')
            : navigate(`/history/others/${id}`);
    };

    

    const handleStateClick = (state) => {
        navigate(`/history/list/${state}`);
        setState(state);
    };


    return (
        <>
            {isChecked && <SButton type="button"
                onClick={() => handleApplyClick('master')}
                style={{ backgroundColor: currentApply === 'master' ? '#E1FAED' : '#F5F5F5' }}
            >Master</SButton>}
            {isChecked && recruits.map(resume => (
                <SButton type="button"
                    key={resume.id}
                    onClick={() => handleApplyClick(resume.id)}
                    style={{ backgroundColor: currentApply === String(resume.id) ? '#E1FAED' : '#F5F5F5' }}
                >{resume.recruitTitle}
                </SButton>
            ))}
            {!isChecked &&
                <>
                    <SButton type="button"
                        onClick={() => handleStateClick(3)}
                        style={{ backgroundColor: state === 3 ? '#E1FAED' : '#F5F5F5' }}
                    >전체</SButton>
                    <SButton type="button"
                        onClick={() => handleStateClick(0)}
                        style={{ backgroundColor: state === 0 ? '#E1FAED' : '#F5F5F5' }}
                    >작성중</SButton>
                    <SButton type="button"
                        onClick={() => handleStateClick(1)}
                        style={{ backgroundColor: state === 1 ? '#E1FAED' : '#F5F5F5' }}
                    >작성완료</SButton>
                    <SButton type="button"
                        onClick={() => handleStateClick(2)}
                        style={{ backgroundColor: state === 2 ? '#E1FAED' : '#F5F5F5' }}
                    >보관</SButton>
                </>}
            <div style={{ position: 'absolute', right: 0, display: 'inline-block' }}>
                <Toggle
                    checked={isChecked}
                    onChange={handleToggleClick}
                />
            </div>
            <AddButton/>
            {/* {!isHistoryListState
                &&
                (<EditButton onClick={handleEditClick} style={{ right: '100px' }}>
                    <svg width="60" height="60" viewBox="2-2 80 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path id="Vector" d="M20 39.7509V46H26.2491L44.6799 27.5692L38.4308 21.3201L20 39.7509ZM49.5126 22.7366C50.1625 22.0867 50.1625 21.0368 49.5126 20.3869L45.6131 16.4874C44.9632 15.8375 43.9133 15.8375 43.2634 16.4874L40.2139 19.537L46.463 25.7861L49.5126 22.7366Z" fill="white" />
                    </svg>
                </EditButton>)}
            <AddButton onClick={handleAddClick} style={{ right: '20px', fontSize: '36px', fontWeight: 700 }}>+</AddButton> */}
            <Outlet key={location.pathname} />
        </>
    )
}
export default ViewOptions;

const SButton = styled.button`
    height: 35px;
    margin-right: 12px;
    font-family: 'Regular';
    border: none;
    border-radius: 10px;
    padding: 6px 16px;
    background-color: #F5F5F5;
    color: #707070;
    cursor: pointer;
    white-space: nowrap;

    &:first-child {
        background-color: #E1FAED;
        color: #000000;
    }
`;

// const EditButton = styled.button`
//     width: 60px;
//     height: 60px;
//     border: none;
//     border-radius: 50%;
//     background-color: #B0B0B0;
//     color: white;
//     position: fixed;
//     bottom: 20px;
//     cursor: pointer;
// `;

// const AddButton = styled.button`
//     width: 60px;
//     height: 60px;
//     border: none;
//     border-radius: 50%;
//     background-color: #3AAF85;
//     color: white;
//     position: fixed;
//     bottom: 20px;
//     cursor: pointer;
// `;
