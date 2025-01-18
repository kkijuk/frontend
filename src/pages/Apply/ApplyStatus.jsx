import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Layout from '../../components/Layout'; 
import TabMenu from '../../components/Apply/TabMenu';
import AddJobButton from '../../components/shared/AddJobButton';
import AddApplyModal from '../../components/Modal/AddApplyModal';
import StatusListView from '../../components/Apply/StatusListView';
import { getRecruitDetails } from '../../api/Apply/RecruitDetails';
import { getValidRecruitList } from '../../api/Apply/RecruitValid';
import ApplyStatusButton from '../../components/Apply/ApplyStatusButton';

export default function ApplyStatus() {
	const [jobs, setJobs] = useState([]);
	const [filteredJobs, setFilteredJobs] = useState([]);
	const [activeStatus, setActiveStatus] = useState('all');
	const [showModal, setShowModal] = useState(false);
	const navigate = useNavigate();

	const statusCounts = {
		all: jobs.length,
		unapplied: jobs.filter((job) => job.status === 'UNAPPLIED').length,
		planned: jobs.filter((job) => job.status === 'PLANNED').length,
		applying: jobs.filter((job) => job.status === 'APPLYING').length,
		accepted: jobs.filter((job) => job.status === 'ACCEPTED').length,
		rejected: jobs.filter((job) => job.status === 'REJECTED').length,
	};

	const handleSaveRecruit = async (newRecruitId) => {
		try {
			const newRecruit = await getRecruitDetails(newRecruitId);
			if (newRecruit) {
				const updatedJobs = [...jobs, newRecruit].sort((a, b) => new Date(a.endTime) - new Date(b.endTime));
				setJobs(updatedJobs);
	
				// 현재 활성 상태에 따라 filteredJobs 업데이트
				if (activeStatus === 'all') {
					setFilteredJobs(updatedJobs);
				} else {
					setFilteredJobs(updatedJobs.filter((job) => job.status === activeStatus.toUpperCase()));
				}
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
			  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
			  const recruitData = await getValidRecruitList(today);
		  
			  if (recruitData) {
				const combinedJobs = [];
				['unapplied', 'planned', 'applying', 'accepted', 'rejected'].forEach((status) => {
				  if (recruitData[status]?.recruits) {
					combinedJobs.push(
					  ...recruitData[status].recruits.map((recruit) => ({
						...recruit,
						status: status.toUpperCase(),
					  }))
					);
				  }
				});
				combinedJobs.sort((a, b) => a.id - b.id);
				console.log('Jobs data:', combinedJobs);
				setJobs(combinedJobs);
				setFilteredJobs(combinedJobs);
			  }
			} catch (error) {
			  console.error('Error fetching recruits:', error);
			}
		  };
		  
		fetchJobs();
	}, []);

	const handleStatusClick = (status) => {
		setActiveStatus(status);
		const formattedStatus = status.trim().toUpperCase(); 

		if (formattedStatus === 'ALL') {
		  setFilteredJobs(jobs);
		} else {
		  const filtered = jobs.filter((job) => job.status.trim().toUpperCase() === formattedStatus);
		  setFilteredJobs(filtered);
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
			<AddJobButton onClick={() => setShowModal(true)} />
			{showModal && <AddApplyModal onClose={() => setShowModal(false)} onSave={handleSaveRecruit} />}
		</Layout>
	);
}
