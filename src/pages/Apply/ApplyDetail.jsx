import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import moment from 'moment';
import 'react-calendar/dist/Calendar.css';
import SvgIconBefore from '../../assets/before.svg';
import EditApplyModal from '../../components/Apply/EditApplyModal';
import ApplyDeleteModal from '../../components/Apply/ApplyDeleteModal';
import { deleteRecruit } from '../../api/Apply/DeleteRecruit';
import { getRecruitDetails } from '../../api/Apply/RecruitDetails';
import { updateRecruitStatus } from '../../api/Apply/RecruitStatus';
import { updateRecruit } from '../../api/Apply/RecruitUpdate';
import { deleteReview } from '../../api/Apply/DeleteReview';
import { Link } from 'react-router-dom';
import ReviewList from '../../components/Apply/ReviewList';
import ReviewDetailAdd from '../../components/Apply/ReviewDetailAdd';
import ReviewDeleteModal from '../../components/Apply/ReviewDeleteModal';
import { updateRecruitApplyDate } from '../../api/Apply/RecruitApplydate';
import { getRecruitListAfterDate } from '../../api/Apply/RecruitAfter';
import { trackEvent } from '../../utils/ga4';

const SvgIcon = styled.svg`
	width: 20px;
	height: 20px;
	fill: none;
	stroke: ${({ hasLink }) => (hasLink ? '#3AAF85' : '#707070')};
	stroke-width: 1.5;
	stroke-linecap: round;
	stroke-linejoin: round;
`;

const DeleteSvgIcon = ({ onClick }) => (
	<svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none"
        onClick={onClick} 
        style={{ cursor: 'pointer' }} 
    >
        <path d="M16.583 4.66667V2.83333C16.583 2.3471 16.3899 1.88079 16.046 1.53697C15.7022 1.19315 15.2359 1 14.7497 1H9.24967C8.76344 1 8.29713 1.19315 7.95331 1.53697C7.6095 1.88079 7.41634 2.3471 7.41634 2.83333V4.66667H2.83301V6.5H4.66634V20.25C4.66634 20.9793 4.95607 21.6788 5.4718 22.1945C5.98752 22.7103 6.687 23 7.41634 23H16.583C17.3124 23 18.0118 22.7103 18.5276 22.1945C19.0433 21.6788 19.333 20.9793 19.333 20.25V6.5H21.1663V4.66667H16.583ZM11.083 16.5833H9.24967V11.0833H11.083V16.5833ZM14.7497 16.5833H12.9163V11.0833H14.7497V16.5833ZM14.7497 4.66667H9.24967V2.83333H14.7497V4.66667Z" 
            fill="#707070"
        />
    </svg>
);

const EditSvgIcon = ({ onClick }) => (
	<svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none"
        onClick={onClick} 
        style={{ cursor: 'pointer' }} 
    >
        <path d="M14.7785 5.5127L12.953 7.33789L9.302 10.9886L2 18.2901V22.0001H5.71L13.0115 14.6981L16.6622 11.0471L18.4876 9.22182L14.7785 5.5127Z" 
            fill="#707070"
        />
        <path d="M21.2315 2.7681C20.7394 2.27628 20.0722 2 19.3765 2C18.6808 2 18.0135 2.27628 17.5215 2.7681L15.7715 4.5206L19.4805 8.2321L21.2305 6.4821C21.4747 6.23845 21.6684 5.94904 21.8007 5.63043C21.9329 5.31182 22.001 4.97027 22.0011 4.62531C22.0012 4.28035 21.9333 3.93876 21.8012 3.62008C21.6691 3.3014 21.4755 3.01189 21.2315 2.7681Z" 
            fill="#707070"
        />
    </svg>
);


const DateInputWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 5px;
	background-color: #f5f5f5;
	padding: 5px;
	border-radius: 12px;
	margin-bottom: -9px;
`;

const DateInputField = styled.div`
	padding: 1px 40px;
	height: 10px;
	border-radius: 12px;
	background-color: #f5f5f5;
	font-size: 13px;
	color: #707070;
	flex-grow: 1;
`;

const ConfirmButton = styled.button`
	padding: 1px 10px;
	border-radius: 12px;
	background-color: #d9d9d9;
	font-size: 13px;
	color: #707070;
	cursor: pointer;
	border: none;
	margin-left: 0px;
	margin-bottom: -9px;
`;

const DateInput = styled.div`
	color: #707070;
	font-size: 16px;
	margin-left: 20px;
	cursor: pointer;
	flex-direction: row;
	border-bottom: ${({ hasDate }) => (hasDate ? 'none' : '1px solid #707070')};
`;

const DateDisplay = styled.div`
	display: flex;
	align-items: center;
	color: #707070;
	font-size: 16px;
	margin-left: 20px;
	cursor: pointer;
`;

const EditDateButton = styled.div`
	color: #707070;
	font-size: 14px;
	margin-left: 10px;
	background: #f5f5f5;
	padding: 2px 6px;
	border-radius: 12px;
	cursor: pointer;
`;

const CalendarContainer = styled.div`
	position: absolute;
	top: 277px;
	left: 400px;
	z-index: 10;
`;

const Container = styled.div`
	width: 100%;
	max-width: 850px;
	margin: 0 auto;
	padding: 24px 40px;
	background-color: #fff;
	border-radius: 8px; 
`;

const BackLink = styled(Link)`
	display: inline-block;
	color: black;
	font-size: 16px;
	font-weight: 500;
	margin-bottom: 20px;
	text-decoration: none;
	margin-left: 20px;
`;

const Title = styled.h1`
	color: var(--black, #000);
	font-family: Pretendard;
	font-size: 28px;
	font-weight: 700;
	margin-bottom: 20px;
	margin-left: 18px;
`;

const Header = styled.div`
	display: flex;
	flex-direction: column;
	border-bottom: 6px solid #d9d9d9;
	padding-bottom: 16px;
	margin-bottom: 24px;
`;

const TitleContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: -15px;
`;

const ListTitle = styled.div`
	font-size: 24px;
	font-weight: 700;
	margin-top: 16px;
	margin-left: 70px;
`;

const EditDeleteContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 30px;
	margin-right: 40px;
`;

const SubHeader = styled.div`
	width: 720px;
	min-height: 60px;
	flex-shrink: 0;
	border-radius: 12px;
	background: var(--gray-06, #f5f5f5);
	padding: 15px 10px;
	position: relative;
	margin-top: 20px;
	margin-left: 70px;
	display: flex;
	flex-direction: column;

	
`;

const InfoLabelStart = styled.div`
	width: 250px;
	display: flex;
	align-items: center;
	gap: 20px;
	position: absolute;
	margin-left: 5px;
	font-family: Bold;
`;

const InfoLabelEnd = styled.div`
	width: 250px;
	display: flex;
	align-items: center;
	gap: 20px;
	position: absolute;
	margin-left: 300px;
	font-family: Bold;
`;

const TagLabel = styled.div`
	width: 100%; 
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
	margin-top: 40px;
	margin-left: 6px;
	font-family: Bold;
	align-items: center;
`;

const Tag = styled.div`
	display: inline-flex;
	height: 22px;
	padding: 0px 16px;
	justify-content: center;
	align-items: center;
	gap: 10px;
	flex-shrink: 0;
	border-radius: 20px;
	font-family: 'Regular';
	font-size: 12px;
	text-align: center;
	font-weight: 400;
	line-height: normal;
	background: white;  
	color: var(--main-01, #3aaf85);
	margin-left: 5px; 
	margin-bottom: 5px; /* 줄바꿈 시 태그 간격을 위해 추가 */
`;

const DateText = styled.div`
	color: ${({ isEndTime }) => (isEndTime ? 'red' : 'black')};
	font-family: light;
	font-size: 15px;
`;

const Line = styled.div`
	width: 100%;
	height: 2px;
	background: #d9d9d9;
	margin: 24px 0;
`;

const ButtonContainer = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 20px;
`;

const ApplyButton = styled.div`
	display: flex;
	align-items: center;
	border: 2px solid ${({ hasLink }) => (hasLink ? '#3AAF85' : '#707070')};
	border-radius: 12px;
	padding: 7px 18px;
	color: ${(props) => (props.hasLink ? '#3AAF85' : '#707070')};
	cursor: pointer;
	background: ${(props) => (props.hasLink ? 'white' : 'transparent')};
	margin-left: 30px;
	margin-bottom: -12px;
`;

const ApplyButtonText = styled.span`
	margin-right: 5px;
`;

const Button = styled.div`
	width: 720px;
	height: 50px;
	border-radius: 10px;
	font-family: regular;
	font-size: 18px;
	background: var(--main-01, #3aaf85);
	border: none;
	color: white;
	cursor: pointer;
	position: fixed;
	bottom: 30px;
	background: ${(props) => (props.disabled ? 'var(--gray-03, #D9D9D9)' : 'var(--main-01, #3AAF85)')};
	cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
	display: flex;
	align-items: center;
	justify-content: center;
`;

const EditIconStyled = styled(EditSvgIcon)`
	cursor: pointer;
	margin-right: 10px;
`;

const DeleteIconStyled = styled(DeleteSvgIcon)`
	cursor: pointer;
`;

const DropdownContainer = styled.div`
	display: flex;
	align-items: center;
	margin-left: 70px;
	margin-top: 10px;
	background-color: ${({ status }) => {
		switch (status) {
			case 'UNAPPLIED':
				return '#D9D9D9';
			case 'PLANNED':
				return '#B0B0B0';
			case 'APPLYING':
				return '#707070';
			case 'ACCEPTED':
				return '#78D333';
			case 'REJECTED':
				return '#FA7C79';
			default:
				return '#707070';
		}
	}};
	width: ${({ status }) => (status === 'PLANNED' ? '70px' : '65px')};
	height: 10px;
	border-radius: 10px;
	padding: 0px 5px;
	font-size: 12px;
	padding: 5px 10px;
	color: white;
	position: relative;
`;

const Dropdown = styled.select`
	padding: 0px 5px;
	font-family: 'Light';
	border: none;
	border-radius: 10px;
	background: transparent;
	font-size: 13px;
	color: white;
	-webkit-appearance: none; /* for Chrome */
	-moz-appearance: none; /* for Firefox */
	appearance: none;
	padding-left: ${({ value }) => (value === 'PLANNED' ? '-4px' : '10px')};
	margin-left: -3px;
	width: 100%;
	outline: none;
	option {
		color: black;
	}
`;

const DropdownIcon = styled.span`
	position: absolute;
	right: 10px;
	pointer-events: none;
	transform: translateY(0px);
`;

const DropdownAndDateContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 20px;
	margin-left: 0px;
	margin-top: 10px;
	flex-direction: row;
`;

const CalendarWrapper = styled.div`
	.react-calendar {
		width: 281px;
		height: 263px;
		flex-shrink: 0;
		border-radius: 10px;
		border: 1px solid var(--gray-03, #d9d9d9);
		background: var(--white, #fff);
		position: absolute;
		z-index: 10000;
		margin-left: 150px;
	}

	.react-calendar__navigation {
		justify-content: center;
		gap: 15px;
		height: 20px;
		margin-top: 15px;
	}

	.react-calendar__navigation__button {
		width: 20px;
		height: 20px;
	}

	.react-calendar__month-view__weekdays abbr {
		text-decoration: none;
	}

	.react-calendar__navigation button .prev-icon {
		transform: rotate(180deg);
	}

	.react-calendar__month-view__weekdays__weekday:nth-child(1) {
		color: var(--sub-rd, #fa7c79);
	}

	.react-calendar__month-view__weekdays__weekday:nth-child(7) {
		color: var(--sub-bu, #77aff2);
	}

	.react-calendar__tile {
		background: #fff;
		color: #000;
		margin-top: 3px;
		margin-bottom: 3px;
		height: 24px;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10000;
	}

	.react-calendar__tile--now {
		background: none;
	}

	.react-calendar__tile:enabled:hover,
	.react-calendar__tile:enabled:focus {
		width: 35px;
		height: 24px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 5px;
		background: var(--main-01, #3aaf85) !important;
		color: var(--white, #fff) !important;
	}

	.react-calendar__tile--active {
		width: 35px;
		height: 24px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 5px;
		background: var(--main-01, #3aaf85) !important;
		color: var(--white, #fff) !important;
	}

	.react-calendar__month-view__days__day--neighboringMonth {
		color: rgba(66, 66, 66, 0.3);
		font-size: 14px;
		font-weight: 400;
	}
`;

const Limiter = styled.div`
	width: 300px;
	height: 100px;
	background-color: RGBA(0, 0, 0, 0.7);
	color: white;
	font-family: Regular;
	font-size: 16px;
	border-radius: 10px;

	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	position: fixed;

	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);

	opacity: ${(props) => (props.show ? 1 : 0)};
	transition: opacity 1s;
	z-index: 1000;

	pointer-events: ${(props) => (props.show ? "auto" : "none")};
`;

const ChevronDownIcon = ({ className }) => (
	<svg className={className} xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
		<path d="M8 15L13 10L8 5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
	</svg>
);

const StyledCalendarContainer = styled.div`
	position: absolute;
	top: 277px;
	left: 400px;
	z-index: 10;
`;

const CountdownBox = styled.div`
  position: absolute; /* 위치를 고정 */
  top: 50%; /* 부모 컨테이너의 중앙에 배치 */
  right: 15px; /* 오른쪽 여백 */
  transform: translateY(-50%); /* 정확히 수직 가운데 정렬 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 15px; /* 내부 여백 */
  background: white;
  border-radius: 12px;
  color: #fa7c79;
  font-family: Pretendard, sans-serif;
  min-width: 120px; /* 최소 너비 설정 */
  height: auto;

  .label {
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 5px;
    white-space: nowrap;
  }

  .time {
    font-size: 20px;
    font-weight: 700;
    white-space: nowrap;
  }
`;

const StyledBackLink = styled(BackLink)`
    color: #707070; 
    display: flex;
    align-items: center;
    text-decoration: none; 
    
    img {
        filter: invert(44%) sepia(1%) saturate(11%) hue-rotate(314deg) brightness(94%) contrast(83%);
    }
`;

const ApplyDetail = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { id } = useParams();
	const [job, setJob] = useState(null);
	const [applyDate, setApplyDate] = useState(null);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [status, setStatus] = useState('');
	const [showCalendar, setShowCalendar] = useState(false);
	const [showReviewAdd, setShowReviewAdd] = useState(false);
	const [gotoShow, setGotoShow] = useState(false);
	const [timeLeft, setTimeLeft] = useState('');

	const fetchJobDetails = async () => {
		try {
			const jobDetails = await getRecruitDetails(id);
	
			// introduceId가 없으면 기본값 설정
			const updatedJobDetails = {
				...jobDetails,
				introduceId: jobDetails.introduceId ?? 0, // 기본값 설정
			};
	
			setJob(updatedJobDetails);
			setStatus(updatedJobDetails.status);
			setApplyDate(updatedJobDetails.applyDate ? new Date(updatedJobDetails.applyDate) : null);
		} catch (error) {
			console.error('Error fetching job details:', error);
		}
	};
	

	useEffect(() => {
		const updateJobState = async () => {
			if (location.state && location.state.job) {
				setJob({
					...location.state.job,
					startTime: location.state.job.startTime, // 접수 시작 시간을 최신 값으로 설정
					endTime: location.state.job.endTime, // 접수 마감 시간을 최신 값으로 설정
				});
				setStatus(location.state.job.status);
				setApplyDate(location.state.job.applyDate ? new Date(location.state.job.applyDate) : null);
			} else {
				const jobDetails = await fetchJobDetails();
				setJob({
					...jobDetails,
					startTime: jobDetails.startTime, // 접수 시작 시간을 최신 값으로 설정
					endTime: jobDetails.endTime, // 접수 마감 시간을 최신 값으로 설정
				});
				setStatus(jobDetails.status);
				setApplyDate(jobDetails.applyDate ? new Date(jobDetails.applyDate) : null);
			}
		};

		updateJobState();
	}, [id, location.state]);

	useEffect(() => {
		if (!job?.endTime) return;

		const updateCountdown = () => {
			const now = new Date();
			const end = new Date(job.endTime);
			const diff = end - now;

			if (diff <= 0) {
				setTimeLeft('마감되었습니다.');
				return;
			}

			const days = Math.floor(diff / (1000 * 60 * 60 * 24));
			const hours = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, '0');
			const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0');
			const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');

			setTimeLeft(`${days}일 ${hours}:${minutes}:${seconds}`);
		};

		const intervalId = setInterval(updateCountdown, 1000);
		updateCountdown(); // 초기 값 설정

		return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 정리
	}, [job?.endTime]);

	const handleEditClick = () => {
		setIsEditModalOpen(true);
	};

	const handleCloseEditModal = () => {
		setIsEditModalOpen(false);
	};

	const handleDeleteClick = () => {
		setIsDeleteModalOpen(true);
	};

	const handleCloseDeleteModal = () => {
		setIsDeleteModalOpen(false);
	};

	const handleSave = async (updatedJob) => {
		try {
			// 공고를 업데이트
			await updateRecruit(updatedJob.id, updatedJob);

			// 화면에 표시되는 데이터를 수동으로 업데이트
			setJob((prevJob) => ({
				...prevJob,
				...updatedJob,
				startTime: updatedJob.startTime, // 업데이트된 시작 시간을 반영
				endTime: updatedJob.endTime, // 업데이트된 마감 시간을 반영
			}));

			setIsEditModalOpen(false); // 모달 닫기
		} catch (error) {
			console.error('Error updating job:', error);
		}
	};

	const handleDeleteConfirm = async () => {
		try {
			if (job && job.id) {
				await deleteRecruit(job.id);
				setIsDeleteModalOpen(false);
				navigate('/apply-schedule');
			} else {
				console.error('Job ID is missing');
			}
		} catch (error) {
			console.error('Failed to delete job:', error);
		}
	};

	const handleStatusChange = async (event) => {
		const newStatus = event.target.value;
		setStatus(newStatus);

		try {
			await updateRecruitStatus(id, newStatus);
		} catch (error) {
			console.error('Failed to update status:', error);
		}
	};

	const handleAddReviewClick = () => { 
		// GA 트래킹 추가 (후기 추가 버튼 클릭)
		trackEvent('add_click', {
			category: 'apply',
			detail: 'add_recruit_review',
			action_type: 'add',
			label: '전형 후기 추가',
		});
	
		setShowReviewAdd(true);
	};
	

	const handleCancelReviewAdd = () => {
		setShowReviewAdd(false);
	};

	const handleReviewSave = () => {
		setShowReviewAdd(false);
		fetchJobDetails(); // 수정 후 전체 공고 정보를 다시 가져와 화면을 업데이트
	};

	const handleReviewDelete = async (reviewId) => {
		try {
			await deleteReview(id, reviewId); // 리뷰 삭제를 처리
			await fetchJobDetails(); // 이후에 데이터를 다시 가져옵니다.
		} catch (error) {
			console.error('Failed to delete review:', error);
		}
	};

	const clickGotoApply = () => {
		if (job?.link) {
			// URL이 http:// 또는 https://로 시작하지 않으면 https:// 추가
			let url = job.link;
			if (!/^https?:\/\//i.test(url)) {
				url = `https://${url}`;
			}
			
			window.open(url);
		} else {
			setGotoShow(true);
			setTimeout(() => {
				setGotoShow(false);
			}, 3000);
		}
	};
	

	const handleDateClick = () => {
		setShowCalendar(!showCalendar);
	};

	const handleDateChange = async (date) => {
		// 로컬 날짜를 'YYYY-MM-DD' 형식으로 변환
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
		const day = String(date.getDate()).padStart(2, '0');
		const formattedDate = `${year}-${month}-${day}`;

		setApplyDate(date);
		setShowCalendar(false); // 날짜 선택 후 캘린더 숨기기

		// 선택한 날짜를 서버에 PATCH 요청으로 보내기
		try {
			await updateRecruitApplyDate(id, formattedDate);
		} catch (error) {
			console.error('Failed to update apply date:', error);
		}
	};

	const formatDateTimeToLocal = (dateString) => {
		// 서버에서 받은 UTC 시간을 Date 객체로 변환
		const kstDate = new Date(dateString);

		// UTC 시간에 9시간을 더해서 한국 시간(KST)으로 변환
		const localDate = new Date(kstDate.getTime()); // 9시간 더하기

		// 로컬 시간대의 연도, 월, 일, 시간, 분을 추출
		const year = localDate.getFullYear();
		const month = String(localDate.getMonth() + 1).padStart(2, '0');
		const day = String(localDate.getDate()).padStart(2, '0');
		const hours = String(localDate.getHours()).padStart(2, '0');
		const minutes = String(localDate.getMinutes()).padStart(2, '0');

		// 'YYYY-MM-DD HH:MM' 형식으로 변환하여 반환
		return `${year}-${month}-${day} ${hours}:${minutes}`;
	};

	const handleBackClick = () => {
		if (location.state && location.state.from === 'status') {
			navigate('/apply-status');
		} else {
			navigate('/apply-schedule');
		}
	};

	if (!job) {
		return <div>Loading...</div>;
	}

	const statusTextMap = {
		UNAPPLIED: '미지원',
		PLANNED: '지원 예정',
		APPLYING: '진행 중',
		ACCEPTED: '합격',
		REJECTED: '불합격',
	};

	return (
		<Container>
			<Title>지원현황</Title> 
			<StyledBackLink to="/apply-status">
              <img src={SvgIconBefore} alt="Close" width={20} height={13} />
              지원공고 관리
            </StyledBackLink>
			<Header>
				<TitleContainer>
					<div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
						<ListTitle>{job?.title}</ListTitle>
						<ApplyButton hasLink={Boolean(job?.link)} onClick={clickGotoApply}>
							<ApplyButtonText>지원하러 가기</ApplyButtonText>
							<SvgIcon hasLink={Boolean(job?.link)}>
								<path d="M10.834 9.16732L17.6673 2.33398" />
								<path d="M18.334 5.66602V1.66602H14.334" />
								<path d="M9.16602 1.66602H7.49935C3.33268 1.66602 1.66602 3.33268 1.66602 7.49935V12.4993C1.66602 16.666 3.33268 18.3327 7.49935 18.3327H12.4993C16.666 18.3327 18.3327 16.666 18.3327 12.4993V10.8327" />
							</SvgIcon>
						</ApplyButton>
					</div>
					<EditDeleteContainer>
						<EditSvgIcon onClick={handleEditClick} />
						<DeleteSvgIcon onClick={handleDeleteClick} />
					</EditDeleteContainer>
				</TitleContainer>
				<DropdownAndDateContainer>
					<DropdownContainer status={status}>
						<Dropdown value={status} onChange={handleStatusChange}>
							<option value="UNAPPLIED">미지원</option>
							<option value="PLANNED">지원 예정</option>
							<option value="APPLYING">진행 중</option>
							<option value="ACCEPTED">합격</option>
							<option value="REJECTED">불합격</option>
						</Dropdown>
						<DropdownIcon>▼</DropdownIcon>
					</DropdownContainer>
					{showCalendar ? (
						<>
							<DateInputWrapper>
								<DateInputField>지원 일자를 입력하세요</DateInputField>
							</DateInputWrapper>
						</>
					) : applyDate ? (
						<DateDisplay onClick={handleDateClick}>
							지원일자: {applyDate.toLocaleDateString()}
							<EditDateButton>수정</EditDateButton>
						</DateDisplay>
					) : (
						<DateInput onClick={handleDateClick}>지원한 날짜를 입력하세요.</DateInput>
					)}
				</DropdownAndDateContainer>
				{showCalendar && (
					<CalendarWrapper>
						<Calendar
							onChange={handleDateChange}
							value={applyDate}
							selectRange={false}
							formatDay={(locale, date) => moment(date).format('D')}
							calendarType="gregory"
							next2Label={null}
							prev2Label={null}
							nextLabel={<ChevronDownIcon className="next-icon" />}
							prevLabel={<ChevronDownIcon className="prev-icon" />}
							navigationLabel={({ date }) => moment(date).format('YYYY M월')}
							tileClassName={({ date, view }) => {
								if (moment(date).isSame(new Date(), 'day')) {
									return 'react-calendar__tile--now';
								}
								return '';
							}}
							showFixedNumberOfWeeks={true}
						/>
					</CalendarWrapper>
				)}
				<SubHeader>
		<InfoLabelStart>
			접수 시작 <DateText>{formatDateTimeToLocal(job?.startTime)}</DateText>
		</InfoLabelStart>
		<InfoLabelEnd>
			접수 마감 <DateText isEndTime>{formatDateTimeToLocal(job?.endTime)}</DateText>
		</InfoLabelEnd>
		{status === 'UNAPPLIED' && (
      <CountdownBox>
        <div className="label">마감까지</div>
        <div className="time">{timeLeft}</div>
      </CountdownBox>
    )}
	 <TagLabel>
            태그
            {job?.tags && job.tags.length > 0 &&
                job.tags.map((tag, idx) => (
                    <Tag key={idx} onClick={() => navigate(`/filter?tag=${encodeURIComponent(tag)}`)}>
                        {tag}
                    </Tag>
                ))}
        </TagLabel>
</SubHeader>
			</Header>

			{job && job.reviews && job.reviews.length > 0 && (
	job.reviews.map((review, index) => (
		<ReviewList
			key={index}
			recruitId={job.id}
			reviewId={review.reviewId}
			title={review.title}
			date={review.date}
			content={review.content}
			onDelete={() => handleReviewDelete(review.reviewId)}
			fetchData={fetchJobDetails}
			introduceState={job.introduceState} //  introduceState 전달
			introduceId={job.introduceId} //  introduceId 전달
		/>
	))
)}

{showReviewAdd && (
	<ReviewDetailAdd
		recruitId={job?.id}
		onSave={handleReviewSave}
		onCancel={handleCancelReviewAdd}
		fetchData={fetchJobDetails} 
	/>
)}


			<ButtonContainer>
			<Button 
        onClick={!showReviewAdd && !isEditModalOpen ? handleAddReviewClick : null} 
        disabled={showReviewAdd || isEditModalOpen} 
    >
        전형 후기 추가
    </Button>
			</ButtonContainer>

			{isEditModalOpen && <EditApplyModal job={job} onClose={handleCloseEditModal} onSave={handleSave} />}
			{isDeleteModalOpen && <ApplyDeleteModal onClose={handleCloseDeleteModal} onConfirm={handleDeleteConfirm} />}

			<Limiter show={gotoShow}>
				등록된 링크가 없습니다. <br />
				공고 수정에서 링크를 등록해주세요!
			</Limiter>
		</Container>
	);
};

export default ApplyDetail;