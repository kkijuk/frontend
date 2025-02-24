import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
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
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const initialStatus = queryParams.get('status') || 'all'; 
	const [filteredJobs, setFilteredJobs] = useState([]);
	const [activeStatus, setActiveStatus] = useState(initialStatus);
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

	const filterJobsByStatus = (status) => {
		if (status === 'all') {
			setFilteredJobs(jobs);
		} else {
			const filtered = jobs.filter(
				(job) => job.status.trim().toUpperCase() === status.toUpperCase()
			);
			setFilteredJobs(filtered);
		}
	};

	const handleSaveRecruit = async (newRecruitId) => {
		try {
			const newRecruit = await getRecruitDetails(newRecruitId);
			if (newRecruit) {
				const updatedRecruit = {
					...newRecruit,
					introduceId: newRecruit.introduceId ?? 0,
				};

				const updatedJobs = [...jobs, updatedRecruit].sort(
					(a, b) => new Date(a.endTime) - new Date(b.endTime)
				);
				setJobs(updatedJobs);
				filterJobsByStatus(activeStatus); // ✅ 필터링 재적용
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
				const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
					now.getDate()
				).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(
					now.getMinutes()
				).padStart(2, '0')}`;
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
					setJobs(combinedJobs);
				}
			} catch (error) {
				console.error('Error fetching recruits:', error);
			}
		};

		fetchJobs();
	}, []);

	useEffect(() => {
		filterJobsByStatus(activeStatus);
	}, [jobs, activeStatus]);

	const handleStatusClick = (status) => {
		setActiveStatus(status);
		filterJobsByStatus(status);
	};

	// ✅ 개별 공고 클릭 핸들러
	const handleJobClick = async (job) => {
		const jobId = job.recruitId || job.id;
		if (jobId) {
			try {
				const jobDetails = await getRecruitDetails(jobId);
				if (jobDetails) {
					const updatedJobDetails = {
						...jobDetails,
						introduceId: jobDetails.introduceId ?? 0,
					};
					navigate(`/apply-detail/${jobId}`, {
						state: { job: updatedJobDetails },
					});
				} else {
					console.error('Job details not found');
				}
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
