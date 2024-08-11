import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TabMenu from '../../components/Apply/TabMenu';
import ViewToggle from '../../components/Apply/ViewToggle';
import CalendarView from '../../components/Apply/CalendarView';
import ListView from '../../components/Apply/ListView';
import AddJobButton from '../../components/shared/AddJobButton';
import AddApplyModal from '../../components/shared/AddApplyModal';
import WaitingList from '../../components/Apply/WaitingList';
import ApplyList from '../../components/Apply/ApplyList';
import { getRecruitDetails } from '../../api/Apply/RecruitDetails';

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

const SelectedDateContainer = styled.div`
  margin-top: 20px;
`;

const SelectedDateTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export default function ApplySchedule() {
  const [view, setView] = useState('calendar');
  const [date, setDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [selectedDateJobs, setSelectedDateJobs] = useState([]);
  const navigate = useNavigate();

  // 공고 목록을 마감일시 기준으로 오름차순 정렬하는 함수
  const sortJobsByEndTime = (jobs) => {
    return jobs.sort((a, b) => new Date(a.endTime) - new Date(b.endTime));
  };

  // 페이지가 로드될 때 모든 공고 목록을 가져오는 useEffect
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobPromises = [];
        for (let i = 1; i <= 100; i++) { // 최대 100개의 공고를 가져오도록 설정 (적절한 수로 조정)
          jobPromises.push(getRecruitDetails(i));
        }
        const recruitDetails = await Promise.all(jobPromises);
        const filteredRecruitDetails = recruitDetails.filter(detail => detail && detail.endTime); // null 값과 endTime이 없는 항목 제거

        const sortedJobs = sortJobsByEndTime(filteredRecruitDetails);
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
      if (recruitDetails) {
        const updatedJobs = [...jobs, { ...recruitDetails, id: recruitId }];
        const sortedJobs = sortJobsByEndTime(updatedJobs); // 목록을 마감일시 기준으로 정렬
        setJobs(sortedJobs); // 정렬된 목록을 설정
      }
    } catch (error) {
      console.error('Error adding job:', error);
    }
  };

  const handleJobClick = (job) => {
    if (job && job.id) {
      navigate(`/apply-detail/${job.id}`, { state: { job } });
    } else {
      
    }
  };

  const handleDateClick = (selectedDate) => {
    const selectedDateStr = selectedDate.toISOString().split('T')[0];
    const jobsOnSelectedDate = jobs.filter(job => job.endTime.split('T')[0] === selectedDateStr);
    setSelectedDateJobs(jobsOnSelectedDate);
  };

  const waitingJobs = jobs.filter(job => job.status === 'UNAPPLIED' || job.status === 'PLANNED');
  const appliedJobs = jobs.filter(job => job.status !== 'UNAPPLIED' && job.status !== 'PLANNED');

  return (
    <Container>
      <Title>지원일정</Title>
      <TabMenu activeTab="schedule" onTabClick={() => navigate('/apply-status')} />
      <TopSection>
        <StatusContainer>
          <WaitingList count={waitingJobs.length} />
          <ApplyList count={appliedJobs.length} />
        </StatusContainer>
        <ViewToggle view={view} onToggle={setView} />
      </TopSection>
      {view === 'calendar' && (
        <>
          <CalendarView date={date} setDate={setDate} onDateClick={handleDateClick} />
         
        </>
      )}
      {view === 'list' && <ListView data={jobs} onJobClick={handleJobClick} />}
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

