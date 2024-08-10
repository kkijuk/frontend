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
    // 비동기 함수 선언 및 실행
    const fetchData = async () => {
      // 현재 view 상태에 따라 API에 전달할 status 값을 설정
      const status = view === 'year' ? 'year' : 'category';
  
      // CareerViewSelect 함수를 호출하여 API 요청을 보냄
      const data = await CareerViewSelect(status);
  
      // API에서 받은 데이터가 있을 경우, careers 상태를 업데이트
      if (data) {
        setCareers(data);
      }
    };
  
    // 비동기 함수를 호출하여 데이터 가져오기
    fetchData();
  
  // useEffect의 의존성 배열에 view를 추가하여, view가 변경될 때마다 이 useEffect가 실행되도록 함
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