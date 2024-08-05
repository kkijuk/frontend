import React, { useState, useEffect } from 'react';
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
import { getRecruitDetails } from '../api/RecruitDetails';

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

export default function Apply() {
  const [activeTab, setActiveTab] = useState('schedule');
  const [view, setView] = useState('calendar');
  const [date, setDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  // 공고 목록을 마감일시 기준으로 오름차순 정렬하는 함수
  const sortJobsByEndTime = (jobs) => {
    return jobs.sort((a, b) => new Date(a.endTime) - new Date(b.endTime));
  };

  // 페이지가 로드될 때 모든 공고 목록을 가져오는 useEffect
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const recruitIds = [1, 2, 3, 4, 5]; // 여기에 실제로 존재하는 recruit ID 목록을 추가해야 합니다.
        const recruitDetailsPromises = recruitIds.map(id => getRecruitDetails(id));
        const recruitDetails = await Promise.all(recruitDetailsPromises);
        const sortedJobs = sortJobsByEndTime(recruitDetails);
        setJobs(sortedJobs);
      } catch (error) {
        console.error('Error fetching recruits:', error);
      }
    };

    fetchJobs();
  }, []); // 컴포넌트가 마운트될 때 한 번만 실행

  const handleAddJob = async (recruitId) => {
    try {
      const recruitDetails = await getRecruitDetails(recruitId); // 공고 생성 후 상세 정보 가져오기
      const updatedJobs = [...jobs, recruitDetails];
      const sortedJobs = sortJobsByEndTime(updatedJobs); // 목록을 마감일시 기준으로 정렬
      setJobs(sortedJobs); // 정렬된 목록을 설정
    } catch (error) {
      console.error('Error adding job:', error);
    }
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
          onSave={handleAddJob} // recruitId 전달
        />
      )}
    </Container>
  );
}









