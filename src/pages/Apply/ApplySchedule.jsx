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
import { getRecruitListAfterDate } from '../../api/Apply/RecruitAfter';
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
  font-family: bold;
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

export default function ApplySchedule() {
  const [view, setView] = useState('list'); 
  const [date, setDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  // 새로운 공고를 저장하고 리스트를 정렬하는 함수
  const handleSaveRecruit = async (newRecruitId) => {
    try {
        const newRecruit = await getRecruitDetails(newRecruitId);
        console.log("Fetched new recruit with tags:", newRecruit.tags); // 태그 정보가 여기에 있는지 확인
        if (newRecruit) {
            const updatedJobs = [...jobs, newRecruit];
            const sortedJobs = updatedJobs.sort((a, b) => new Date(a.endTime) - new Date(b.endTime));
            setJobs(sortedJobs);

            console.log("New recruit added and jobs updated:", sortedJobs);
        } else {
            console.error('Failed to retrieve the newly created recruit');
        }
    } catch (error) {
        console.error('Error fetching new recruit:', error);
    }
};


  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const now = new Date();
        const testDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        console.log('Fetching jobs from date:', testDate); 
        const recruitData = await getRecruitListAfterDate(testDate); 
  
        if (recruitData && recruitData.outputs && recruitData.outputs.length > 0) {
          const sortedJobs = recruitData.outputs.sort((a, b) => new Date(a.endDate) - new Date(b.endDate));
          const transformedJobs = sortedJobs.flatMap(group => 
            group.recruits.map(recruit => ({
              ...recruit,
              endTime: `${group.endDate} 00:00:00`
            }))
          );
          setJobs(transformedJobs);
          console.log('Transformed jobs:', transformedJobs); 
        } else {
          console.warn('No recruits found after the specified date.');
        }
      } catch (error) {
        console.error('Error fetching recruits:', error);
      }
    };
  
    fetchJobs();
  }, []);
  
  const handleJobClick = async (job) => {
  if (job && job.recruitId) {
    try {
      const jobDetails = await getRecruitDetails(job.recruitId);
      if (jobDetails) {
        navigate(`/apply-detail/${job.recruitId}`, { state: { job: jobDetails, from: 'list' } });  
      } else {
        console.error('Job details not found');
      }
    } catch (error) {
      console.error('Error fetching job details:', error);
    }
  } else {
    console.error('Job ID is missing');
  }
};

  const waitingJobs = jobs.filter(job => job.status === 'UNAPPLIED' || job.status === 'PLANNED');
  const appliedJobs = jobs.filter(job => job.status !== 'UNAPPLIED' && job.status !== 'PLANNED');

  return (
    <Container>
      <Title>지원관리</Title>
      <TabMenu activeTab="schedule" onTabClick={() => navigate('/apply-status')} />
      <TopSection>
        <StatusContainer>
          <WaitingList count={waitingJobs.length} />
          <ApplyList count={appliedJobs.length} />
        </StatusContainer>
        <ViewToggle view={view} onToggle={setView} />
      </TopSection>
     
      {view === 'calendar' && (
        <CalendarView date={date} setDate={setDate} />
      )}
      {view === 'list' && <ListView data={jobs} onJobClick={handleJobClick} />}
      <AddJobButton onClick={() => setShowModal(true)} />
      {showModal && (
        <AddApplyModal
          onClose={() => setShowModal(false)}
          onSave={handleSaveRecruit}
        />
      )}
    </Container>
  );
}