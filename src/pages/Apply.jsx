import React, { useState } from 'react';
import styled from 'styled-components';
import Title from '../components/Apply/Title';
import TabMenu from '../components/Apply/TabMenu';
import ViewToggle from '../components/Apply/ViewToggle';
import CalendarView from '../components/Apply/CalendarView';
import ListView from '../components/Apply/ListView';
import AddJobButton from '../components/shared/AddJobButton';
import AddJobModal from '../components/shared/AddJobModal';
import WaitingList from '../components/Apply/WaitingList';
import ApplyList from '../components/Apply/ApplyList';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  border-radius: 15px;
`;

const TopSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const StatusContainer = styled.div`
  display: flex;
  align-items: center;
`;

const fakeData = [
  { date: '2024-07-11', label: '인턴', details: '[OO기업] 2024 하반기 인턴 채용' },
  { date: '2024-08-15', label: '신입', details: '[OO기업] 2024 신입사원 모집' },
  { date: '2024-09-01', label: '경력', details: '[OO기업] 경력직 채용 공고' },
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
      <TopSection>
        <StatusContainer>
          <WaitingList />
          <ApplyList />
        </StatusContainer>
        <ViewToggle view={view} onToggle={setView} />
      </TopSection>
      {activeTab === 'schedule' && (
        <>
          {view === 'calendar' && (
            <>
              <CalendarView date={date} setDate={setDate} />
              <ListView data={jobs} />
            </>
          )}
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

