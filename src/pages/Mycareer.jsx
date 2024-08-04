import React, { useState } from 'react';
import styled from 'styled-components';
import Title from '../components/Apply/Title';
import CareerView from '../components/Mycareer/CareerView'; //시간순/분류별 선택
import CareerViewDate from '../components/Mycareer/CareerViewDate'; //시간순 정렬 컴포넌트
import CareerViewCategory from '../components/Mycareer/CareerViewCategory'; //분류별 정렬 컴포넌트
import AddJobButton from '../components/shared/AddJobButton'; //버튼추가
import AddCareerModal from '../components/shared/AddCareerModal'; //모달 내용
import CareerTimeline from '../components/Mycareer/CareerTimeline'; //타임라인 임포트

const Container = styled.div`
  max-width: 820px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  border-radius: 15px;
`;

const dummyData = [
    { startDate: '2023-02-11', endDate: '2024-12-10', careerName: 'ㅌㅌ 학원 아르바이트', category: '아르바이트/인턴', alias: 'ㅌㅌㅌ학원' },
    { startDate: '2022-06-24', endDate: '2024-01-10', careerName: '학원 아르바이트', category: '아르바이트/인턴', alias: 'OO학원' },
    { startDate: '2023-06-24', endDate: '2024-02-10', careerName: 'IT 서비스 개발 동아리', category: '동아리', alias: 'UMC' },
    { startDate: '2024-02-11', endDate: '2024-04-11', careerName: '데이터분석 공모전', category: '공모전/대회', alias: 'dd 공모전'},
    { startDate: '2024-04-01', endDate: '2024-06-01', careerName: 'UXUI 소학회', category: '동아리', alias: 'SWUX' },
    { startDate: '2023-04-01', endDate: '2024-03-01', careerName: '게임 소학회', category: '동아리', alias: 'SWUX' },

];

export default function Mycareer() {
  const [view, setView] = useState('date');
  const [showModal, setShowModal] = useState(false);
  const [careers, setCareers] = useState(dummyData);

  const handleAddCareer = (newCareer) => {
    setCareers([...careers, newCareer]);
  };

  return (
    <Container>
      <Title>내 커리어</Title>
      <CareerTimeline data={careers}/>

      <CareerView view={view} onToggle={setView} />
      {view === 'date' && <CareerViewDate data={careers} />}
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
