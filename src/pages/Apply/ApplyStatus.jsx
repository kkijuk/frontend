import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TabMenu from '../../components/Apply/TabMenu';
import StatusListView from '../../components/Apply/StatusListView';
import { getRecruitDetails } from '../../api/Apply/RecruitDetails';
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

  // 페이지가 로드될 때 모든 공고 목록을 가져오는 useEffect
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobPromises = [];
        for (let i = 1; i <= 30; i++) { // 최대 30개의 공고를 가져오도록 설정 (적절한 수로 조정)
          jobPromises.push(getRecruitDetails(i));
        }
        const recruitDetails = await Promise.all(jobPromises);
        const filteredRecruitDetails = recruitDetails.filter(detail => detail && detail.endTime); // null 값과 endTime이 없는 항목 제거

        setJobs(filteredRecruitDetails);
        setFilteredJobs(filteredRecruitDetails);
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

  const handleJobClick = (job) => {
    if (job && job.id) {
      console.log('Clicked job ID:', job.id); // 클릭한 공고의 ID 로그 추가
      console.log('Clicked job:', job); // 클릭한 공고 로그 추가
      navigate(`/apply-detail/${job.id}`, { state: { job } });
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
