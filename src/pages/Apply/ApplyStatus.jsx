import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TabMenu from '../../components/Apply/TabMenu';
import StatusListView from '../../components/Apply/StatusListView';
import { getRecruitDetails } from '../../api/Apply/RecruitDetails';
import { getRecruitListAfterDate } from '../../api/Apply/RecruitAfter';
import ApplyStatusButton from '../../components/Apply/ApplyStatusButton';

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

export default function ApplyStatus() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [activeStatus, setActiveStatus] = useState('all');
  const navigate = useNavigate();

  const statusCounts = {
    all: jobs.length,
    notApply: jobs.filter(job => job.status === 'UNAPPLIED').length,
    apply: jobs.filter(job => job.status === 'PLANNED').length,
    applying: jobs.filter(job => job.status === 'APPLYING').length,
    accepted: jobs.filter(job => job.status === 'ACCEPTED').length,
    rejected: jobs.filter(job => job.status === 'REJECTED').length,
  };

  // 페이지가 로드될 때 오늘 이후 마감인 모든 공고 목록을 가져오는 useEffect
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const now = new Date();
        const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        console.log('Fetching jobs from date:', today);
        
        const recruitData = await getRecruitListAfterDate(today);

        if (recruitData && recruitData.outputs && recruitData.outputs.length > 0) {
          const sortedJobs = recruitData.outputs.flatMap(group => 
            group.recruits.map(recruit => ({
              ...recruit,
              endTime: `${group.endDate} 00:00:00`
            }))
          ).sort((a, b) => new Date(a.endTime) - new Date(b.endTime));

          setJobs(sortedJobs);
          setFilteredJobs(sortedJobs);
          console.log('Sorted jobs:', sortedJobs);
        } else {
          console.warn('No recruits found after the specified date.');
        }
      } catch (error) {
        console.error('Error fetching recruits:', error);
      }
    };

    fetchJobs();
  }, []); // 컴포넌트가 마운트될 때 한 번만 실행

  const handleStatusClick = (status) => {
    setActiveStatus(status);
    if (status === 'all') {
      setFilteredJobs(jobs);
    } else if (status === 'notApply') {
      setFilteredJobs(jobs.filter(job => job.status === 'UNAPPLIED'));
    } else if (status === 'apply') {
      setFilteredJobs(jobs.filter(job => job.status === 'PLANNED'));
    } else if (status === 'applying') {
      setFilteredJobs(jobs.filter(job => job.status === 'APPLYING'));
    } else if (status === 'accepted') {
      setFilteredJobs(jobs.filter(job => job.status === 'ACCEPTED'));
    } else if (status === 'rejected') {
      setFilteredJobs(jobs.filter(job => job.status === 'REJECTED'));
    }
  };

  const handleJobClick = async (job) => {
    const jobId = job.recruitId || job.id;  
    if (jobId) {
      try {
        const jobDetails = await getRecruitDetails(jobId);
        navigate(`/apply-detail/${jobId}`, { state: { job: jobDetails } });
      } catch (error) {
        console.error('Failed to fetch job details:', error);
      }
    } else {
      console.error('Job ID is missing or undefined');
    }
  };
  
  

  return (
    <Container>
      <Title>지원현황</Title>
      <TabMenu activeTab="status" onTabClick={() => navigate('/apply-schedule')} />
      <ApplyStatusButton activeStatus={activeStatus} onStatusClick={handleStatusClick} statusCounts={statusCounts} />
      <StatusListView data={filteredJobs} onJobClick={handleJobClick} />
    </Container>
  );
}
