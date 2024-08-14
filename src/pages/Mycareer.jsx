import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Title from '../components/Apply/Title';
import CareerView from '../components/Mycareer/CareerView'; //시간순/분류별 선택
import CareerViewYear from '../components/Mycareer/CareerViewYear'; //시간순 정렬 컴포넌트
import CareerViewCategory from '../components/Mycareer/CareerViewCategory'; //분류별 정렬 컴포넌트
import AddJobButton from '../components/shared/AddJobButton'; //버튼추가
import AddCareerModal from '../components/shared/AddCareerModal'; //모달 내용
import Timeline from '../components/Mycareer/Timeline';
import { CareerViewSelect } from '../api/Mycareer/CareerviewSelect';

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
  const [careersData, setCareersData] = useState([]);
  const location = useLocation();

  useEffect(() => {
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

    fetchData();
  }, [view]);

  useEffect(() => {
    if (location.state?.showModal) {
      setShowModal(true);
    }
  }, [location.state]); //홈화면에서 활동 추가 누르면 모달 열리도록

  const handleAddCareer = (newCareer) => {
    // 새로운 커리어를 추가할 때, 연도별로 데이터 구조에 맞게 추가해야 함
    setCareersData((prevData) => {
      const updatedData = [...prevData];
      // 여기서 newCareer의 year에 해당하는 데이터에 추가
      const yearIndex = updatedData.findIndex((item) => item.year === newCareer.year);

      if (yearIndex >= 0) {
        updatedData[yearIndex].careers.push(newCareer);
      } else {
        // 만약 해당 연도가 없으면 새로 추가
        updatedData.push({
          year: newCareer.year,
          count: 1,
          careers: [newCareer],
        });
      }

      return updatedData;
    });
  };

  return (
    <Container>
      <Title>내 커리어</Title>
      <Timeline />

      <CareerView view={view} onToggle={setView} />
      {view === 'year' && <CareerViewYear data={careersData} />}
      {view === 'category' && <CareerViewCategory data={careersData} />}

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
