import React, { useState } from 'react';
import styled from 'styled-components';
import Title from '../components/Title';
import TabMenu from '../components/TabMenu';
import ViewToggle from '../components/ViewToggle';
import CalendarView from '../components/CalendarView';
import ListView from '../components/ListView';
import AddJobButton from '../components/shared/AddJobButton';
import AddJobModal from '../components/shared/AddJobModal';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  border-radius: 15px;
`;

const fakeData = [
  { date: '2024-07-11', label: '인턴', details: '[OO기업] 2024 하반기 인턴 채용' },
  { date: '2024-08-15', label: '신입', details: '[XX기업] 2024 신입사원 모집' },
  { date: '2024-09-01', label: '경력', details: '[YY기업] 경력직 채용 공고' },
];

export default function Apply() {
  const [activeTab, setActiveTab] = useState('schedule');
  const [view, setView] = useState('calendar');
  const [date, setDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [jobs, setJobs] = useState(fakeData);

  const handleAddJob = (newJob) => {
    setJobs([...jobs, newJob]);
  };

  return (
    <Container>
      <Title>지원관리</Title>
      <TabMenu activeTab={activeTab} onTabClick={setActiveTab} />
      {activeTab === 'schedule' && (
        <>
          <ViewToggle view={view} onToggle={setView} />
          {view === 'calendar' && <CalendarView date={date} setDate={setDate} />}
          {view === 'list' && <ListView data={jobs} />}
        </>
      )}
      {activeTab === 'status' && <ListView data={jobs} />}
      <AddJobButton onClick={() => setShowModal(true)} />
      {showModal && (
        <AddJobModal
          onClose={() => setShowModal(false)}
          onSave={handleAddJob}
        />
      )}
    </Container>
  );
}

