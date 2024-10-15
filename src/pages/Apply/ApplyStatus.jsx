import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Layout from '../../components/Layout'; // Layout 컴포넌트를 불러옵니다.
import TabMenu from '../../components/Apply/TabMenu';
import StatusListView from '../../components/Apply/StatusListView';
import { getRecruitDetails } from '../../api/Apply/RecruitDetails';
import { getRecruitListAfterDate } from '../../api/Apply/RecruitAfter';
import ApplyStatusButton from '../../components/Apply/ApplyStatusButton';

const Title = styled.h1`
  color: var(--black, #000);
  font-family: 'Bold';
  font-size: 30px;
  font-weight: 700;
  margin-top: 11px;
  width: 820px;
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

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const now = new Date();
        const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
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
        }
      } catch (error) {
        console.error('Error fetching recruits:', error);
      }
    };

    fetchJobs();
  }, []);

  const handleStatusClick = (status) => {
    setActiveStatus(status);
    if (status === 'all') {
      setFilteredJobs(jobs);
    } else {
      setFilteredJobs(jobs.filter(job => job.status === status.toUpperCase()));
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
    }
  };

  return (
    <Layout title="지원관리">
      <TabMenu activeTab="status" onTabClick={() => navigate('/apply-schedule')} />
      <ApplyStatusButton activeStatus={activeStatus} onStatusClick={handleStatusClick} statusCounts={statusCounts} />
      <StatusListView data={filteredJobs} onJobClick={handleJobClick} />
    </Layout>
  );
}
