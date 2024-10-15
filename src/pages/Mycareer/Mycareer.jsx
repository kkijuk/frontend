import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Title from '../../components/Apply/Title';
import CareerView from '../../components/Mycareer/CareerView';
import CareerViewYear from '../../components/Mycareer/CareerViewYear';
import CareerViewCategory from '../../components/Mycareer/CareerViewCategory';
import AddJobButton from '../../components/shared/AddJobButton';
import AddCareerModal from '../../components/Modal/AddCareerModal';
import Timeline from '../../components/Mycareer/Timeline';
import SearchBar from '../../components/Mycareer/shareSearchBar';
import { CareerViewSelect } from '../../api/Mycareer/CareerviewSelect';
import { useAuth } from '../../components/AuthContext';
import { useNavigate } from 'react-router-dom'; // useNavigate import


const Container = styled.div`
  width: 820px;
  margin: auto;
  background-color: white;
  border-radius: 15px;
  box-sizing: border-box;
`;

const SearchBox = styled.div`
  width: 820px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  margin-top: 35px;
  box-sizing: border-box;
`;

export default function Mycareer() {
  const [view, setView] = useState('year');
  const [showModal, setShowModal] = useState(false);
  const [careers, setCareers] = useState([]);
  const [triggerEffect, setTriggerEffect] = useState(false);
  const { isLoggedIn } = useAuth();  // 로그인 상태 확인
  const navigate = useNavigate();  // useNavigate 훅 사용

  const fetchData = async () => {
    const status = view === 'year' ? 'year' : 'category';
    const data = await CareerViewSelect(status);
    if (data) {
      setCareers(data);
    }
  };

  useEffect(() => {
    // 로그인된 상태일 때만 데이터 가져오기
    if (isLoggedIn) {
      fetchData();
    }
  }, [view, isLoggedIn]);

  const handleAddCareer = () => {
    if (isLoggedIn) { 
      fetchData();
      setTriggerEffect(prev => !prev); 
    }
  };

  const handleSearchClick = () => {
    navigate('/Mycareer_search');  // 원하는 경로로 페이지 이동
  };

  return (
    <Container>
      <SearchBox>
        <Title>내커리어</Title>
        <SearchBar onClick={handleSearchClick} /> {/* 클릭 이벤트 추가 */}
      </SearchBox>
      {isLoggedIn && (
        <>
          <Timeline triggerEffect={triggerEffect} />
          <CareerView view={view} onToggle={setView} />
          {view === 'year' && <CareerViewYear data={careers} />}
          {view === 'category' && <CareerViewCategory data={careers} />}
          <AddJobButton onClick={() => setShowModal(true)} />
          {showModal && (
            <AddCareerModal
              onClose={() => setShowModal(false)}
              onSave={handleAddCareer}
            />
          )}
        </>
      )}
    </Container>
  );
}