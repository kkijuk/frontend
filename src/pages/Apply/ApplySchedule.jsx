import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Layout from '../../components/Layout'; 
import TabMenu from '../../components/Apply/TabMenu';
import ViewToggle from '../../components/Apply/ViewToggle';
import CalendarView from '../../components/Apply/CalendarView';
import ListView from '../../components/Apply/ListView';
import AddJobButton from '../../components/shared/AddJobButton';
import AddApplyModal from '../../components/Modal/AddApplyModal';
import WaitingList from '../../components/Apply/WaitingList';
import ApplyList from '../../components/Apply/ApplyList';
import { getRecruitListAfterDate } from '../../api/Apply/RecruitAfter';
import { getRecruitDetails } from '../../api/Apply/RecruitDetails';
import useAuthRedirect from '../../stores/useAuthRedirect'; 
import { getValidRecruitList } from '../../api/Apply/RecruitValid';
import { theme } from '../../constants/theme';

const PageWrapper = styled.div`
  width: 100%;
  overflow-x: hidden;
`;

const Title = styled.h1`
	color: var(--black, #000);
	font-family: 'Bold';
	font-size: 30px;
	font-weight: 700;
	margin-top: 11px;
	width: 820px;
	margin-left: 18px;

	}
`;

const TopSection = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 20px;

	
	@media (max-width: ${({ theme }) => theme.breakpoints.md}) {
		flex-direction: column;
		align-items: center;  
		justify-content: center;
	}
`;

const StatusContainer = styled.div`
	display: flex;
	align-items: center;

	@media (max-width: ${({ theme }) => theme.breakpoints.md}) {
		width: auto;
		padding: 0 16px;      
		box-sizing: border-box;
		justify-content: center;
		gap: 10px;
		margin-bottom: 8px;
		overflow-x: hidden;   
	}
`;


export default function ApplySchedule() {
	useAuthRedirect();
	const [view, setView] = useState('calendar');
	const [date, setDate] = useState(new Date());
	const [showModal, setShowModal] = useState(false);
	const [jobs, setJobs] = useState([]);
	const navigate = useNavigate();
	const [appliedCount, setAppliedCount] = useState(0); //  지원 완료 공고 수 상태 추가
	const [appliedJobs, setAppliedJobs] = useState([]); // 지원 완료된 공고 리스트 상태 추가


	// 새로운 공고를 저장하고 리스트를 정렬하는 함수
	const handleSaveRecruit = async (newRecruitId) => {
		try {
			const newRecruit = await getRecruitDetails(newRecruitId);
			if (newRecruit) {
				// introduceId가 없으면 기본값을 0으로 설정
				const updatedRecruit = { ...newRecruit, introduceId: newRecruit.introduceId ?? 0 };
	
				const updatedJobs = [...jobs, updatedRecruit];
				const sortedJobs = updatedJobs.sort((a, b) => new Date(a.endTime) - new Date(b.endTime));
				setJobs(sortedJobs);
			} else {
				console.error('Failed to retrieve the newly created recruit');
			}
		} catch (error) {
			console.error('Error fetching new recruit:', error);
		}
	};

	// 지원 완료 공고 개수를 계산하는 함수
const countAppliedJobs = (recruitData) => {
	if (!recruitData) return 0;

	const { accepted, applying, rejected } = recruitData;

	// 상태별 공고 수 합산
	const acceptedCount = accepted ? accepted.count : 0;
	const applyingCount = applying ? applying.count : 0;
	const rejectedCount = rejected ? rejected.count : 0;

	return acceptedCount + applyingCount + rejectedCount;
};

	
useEffect(() => {
	const fetchAppliedJobs = async () => {
		try {
			const now = new Date();
			const currentDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
				now.getDate()
			).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

			const recruitData = await getValidRecruitList(currentDate);

			if (recruitData) {
				const totalAppliedCount = countAppliedJobs(recruitData); //  총 공고 수 계산

				// 각 상태별 공고 데이터 합산해서 배열로 변환
				const combinedAppliedJobs = [
					...(recruitData.accepted?.recruits || []),
					...(recruitData.applying?.recruits || []),
					...(recruitData.rejected?.recruits || []),
				];

				setAppliedJobs(combinedAppliedJobs); //  공고 리스트 업데이트
				setAppliedCount(totalAppliedCount); //  카운트 상태 업데이트
			} else {
				console.warn('No valid recruits found.');
			}
		} catch (error) {
			console.error('Error fetching valid recruits:', error);
		}
	};

	fetchAppliedJobs();
}, []);


	useEffect(() => {
		const fetchJobs = async () => {
			try {
				const now = new Date();
				const testDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
				const recruitData = await getRecruitListAfterDate(testDate);

				if (recruitData && recruitData.outputs && recruitData.outputs.length > 0) {
					const sortedJobs = recruitData.outputs.sort((a, b) => new Date(a.endDate) - new Date(b.endDate));
					const transformedJobs = sortedJobs.flatMap((group) =>
						group.recruits.map((recruit) => ({
							...recruit,
							endTime: `${group.endDate} 00:00:00`,
						})),
					);
					setJobs(transformedJobs);
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
		try {
			let jobDetails = null;
	
			if (job && job.recruitId) {
				jobDetails = await getRecruitDetails(job.recruitId);
			} else if (job && job.id) {
				jobDetails = await getRecruitDetails(job.id);
			}
	
			if (jobDetails) {
				const jobId = job.recruitId || job.id;
				const updatedJobDetails = { ...jobDetails, introduceId: jobDetails.introduceId ?? 0 }; //  introduceId 추가
	
				navigate(`/apply-detail/${jobId}`, { state: { job: updatedJobDetails, from: 'list' } });
			} else {
				console.error('Job details not found');
			}
		} catch (error) {
			console.error('Error fetching job details:', error);
		}
	};
	

	const waitingJobs = jobs.filter((job) => job.status === 'UNAPPLIED' || job.status === 'PLANNED');

	return (
		<PageWrapper>
		<Layout title="지원관리">
			<TabMenu activeTab="schedule" onTabClick={() => navigate('/apply-status')} />
			<TopSection>
				<StatusContainer>
					<WaitingList count={waitingJobs.length} />
					<ApplyList count={appliedCount} />
				</StatusContainer>
				<ViewToggle view={view} onToggle={setView} />
			</TopSection>

			{view === 'calendar' && <CalendarView date={date} setDate={setDate} />}
			{view === 'list' && <ListView data={jobs} onJobClick={handleJobClick} />}
			<AddJobButton onClick={() => setShowModal(true)} />
			{showModal && <AddApplyModal onClose={() => setShowModal(false)} onSave={handleSaveRecruit} />}
		</Layout>
		</PageWrapper>
	);
}
