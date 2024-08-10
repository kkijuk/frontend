import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Title from '../components/Apply/Title';
import CareerView from '../components/Mycareer/CareerView'; //시간순/분류별 선택
import CareerViewDate from '../components/Mycareer/CareerViewDate'; //시간순 정렬 컴포넌트
import CareerViewCategory from '../components/Mycareer/CareerViewCategory'; //분류별 정렬 컴포넌트
import AddJobButton from '../components/shared/AddJobButton'; //버튼추가
import AddCareerModal from '../components/shared/AddCareerModal'; //모달 내용
import Timeline from '../components/Mycareer/Timeline';
import {CareerViewSelect} from '../api/Mycareer/CareerviewSelect';

const Container = styled.div`
  max-width: 820px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  border-radius: 15px;
`;


export default function Mycareer() {
  const [view, setView] = useState('year');
  const [showModal, setShowModal] = useState(false);
  const [careers, setCareers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const status = view === 'year' ? 'year' : 'category';
      const responseData = await CareerViewSelect(status);
  
      if (responseData && responseData.data) {
        // careers 배열을 추출하여 상태에 저장
        const careersData = responseData.data[0]?.careers || [];
        setCareers(careersData);
  
        // 추출한 데이터를 콘솔에 출력
        console.log('추출된 careers 데이터:', careersData);
      }
    };
  
    fetchData();
  }, [view]);
  


  
  const handleAddCareer = (newCareer) => {
    setCareers([...careers, newCareer]);
  };

  return (
    <Container>
      <Title>내 커리어</Title>
      <Timeline></Timeline>

      <CareerView view={view} onToggle={setView} />
      {view === 'year' && <CareerViewDate data={careers} />}
      {view === 'category' && <CareerViewCategory data={careers} />}

      <AddJobButton onClick={() => setShowModal(true)} />
      {showModal && (
        <AddCareerModal
          onClose={() => setShowModal(false)}
          onSave={handleAddCareer}
        />
      )}
    </Container>
  );
}