import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TabMenu from '../components/Apply/TabMenu';
import ViewToggle from '../components/Apply/ViewToggle';
import CalendarView from '../components/Apply/CalendarView';
import ListView from '../components/Apply/ListView';
import AddJobButton from '../components/shared/AddJobButton';
import AddApplyModal from '../components/shared/AddApplyModal';
import WaitingList from '../components/Apply/WaitingList';
import ApplyList from '../components/Apply/ApplyList';
import ApplyStatus from '../components/Apply/ApplyStatus'; 

const Container = styled.div`
  width: 100%;
  max-width: 850px;
  margin: 0 auto;
  padding: 24px 40px;
  background-color: white;
  border-radius: 15px;
`;

const Title = styled.h1`
  color: var(--black, #000);
  font-family: Regular;
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 20px;
  margin-left: 18px;
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
  { id: 1, date: '2024-07-11', label: '인턴', details: '[OO기업] 2024 하반기 인턴 채용' },
  { id: 2, date: '2024-08-15', label: '신입', details: '[OO기업] 2024 신입사원 모집' },
  { id: 3, date: '2024-09-01', label: '경력', details: '[OO기업] 경력직 채용 공고' },
];

export default function Apply() {
  const [activeTab, setActiveTab] = useState('schedule');
  const [view, setView] = useState('calendar');
  const [date, setDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [jobs, setJobs] = useState(fakeData);
  const navigate = useNavigate();

  const handleAddJob = (newJob) => {
    setJobs([...jobs, newJob]);
  };

  const handleJobClick = (job) => {
    navigate(`/apply-detail/${job.id}`, { state: { job } });
  };

  return (
    <Container>
      <Title>지원관리</Title>
      <TabMenu activeTab={activeTab} onTabClick={setActiveTab} />
      {activeTab === 'schedule' && (
        <>
          <TopSection>
            <StatusContainer>
              <WaitingList count={jobs.length} />
              <ApplyList count={jobs.length} />
            </StatusContainer>
            <ViewToggle view={view} onToggle={setView} />
          </TopSection>
          {view === 'calendar' && (
            <>
              <CalendarView date={date} setDate={setDate} />
              <ListView data={jobs} onJobClick={handleJobClick} />
            </>
          )}
          {view === 'list' && <ListView data={jobs} onJobClick={handleJobClick} />}
        </>
      )}
      {activeTab === 'status' && (
        <TopSection>
          <StatusContainer>
            {/* 지원 현황에서는 아무것도 보이지 않음 */}
          </StatusContainer>
          <ApplyStatus /> 
        </TopSection>
      )}
      <AddJobButton onClick={() => setShowModal(true)} />
      {showModal && (
        <AddApplyModal
          onClose={() => setShowModal(false)}
          onSave={handleAddJob}
        />
      )}
    </Container>
  );
}




