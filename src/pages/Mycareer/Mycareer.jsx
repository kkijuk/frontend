// import React from 'react';
// import styled from 'styled-components';
// import Layout from '../../components/Layout';

// const Box = styled.div`
// 	width: 820px;
// 	height: 200px;
// 	max-width: 820px;

// 	display: flex;
// 	flex-direction: column;
// 	align-items: center; /* 컨텐츠를 가운데 정렬 */

// 	background-color: white;

// 	@media (max-width: 1280px) {
// 		width: 100%; /* 작은 화면에서 Section이 전체 너비를 차지 */
// 	}
// `;

// export default function Mycareer() {
// 	return (
// 		<div>
// 			<Layout title="내 커리어">
// 				<Box>Hi I'm children.... :</Box>
// 			</Layout>
// 		</div>
// 	);
// }

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Title from '../../components/Apply/Title';
import CareerView from '../../components/Mycareer/CareerView';
import CareerViewYear from '../../components/Mycareer/CareerViewYear';
import CareerViewCategory from '../../components/Mycareer/CareerViewCategory';
import AddJobButton from '../../components/shared/AddJobButton';
import AddCareerModal from '../../components/Modal/AddCareerModal';
import Timeline from '../../components/Mycareer/Timeline';
import SearchBar from '../../components/Mycareer/shareSearchBar';
import { CareerViewSelect } from '../../api/Mycareer/CareerviewSelect';
import { useAuth } from '../../components/AuthContext';
import { useNavigate } from 'react-router-dom'; // useNavigate import

const Container = styled.div`
	width: 820px;
	margin: 0 auto;
	background-color: white;
	border-radius: 15px;
	box-sizing: border-box;
`;

const SearchBox = styled.div`
	width: 820px;
	height: 36px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 20px;
	margin-top: 35px;
	box-sizing: border-box;
`;

export default function Mycareer() {
	const [view, setView] = useState('year');
	const [showModal, setShowModal] = useState(false);
	const [careers, setCareers] = useState({
		2022: [
			{
				id: 1,
				category: '대외활동', //해당 활동의 카테고리(대외활동)
				name: '대외활동',
				alias: '연합동아리',
				unknown: false,
				summary: null,
				startdate: '2022-04-14',
				organizer: '컴공선배',
				role: '동아리 회장',
				teamSize: 30,
				contribution: 20,
				isTeam: false,
				detailList: null, //활동 기록 리스트 null
				endDate: '2022-07-20',
			},
		],
		2023: [
			{
				id: 1,
				category: '대회', //해당 활동의 카테고리(대회)
				name: '웹 개발 해커톤',
				alias: 'IT 연합 동아리 해커톤',
				unknown: false,
				summary: null,
				startdate: '2023-04-14',
				organizer: '컴공선배',
				teamSize: 4,
				contribution: 30,
				isTeam: true,
				detailList: null, //활동 기록 리스트 null
				endDate: '2023-07-20',
			},
		],
		2024: [
			{
				id: 2,
				category: '대회', //해당 활동의 카테고리(대회)
				name: '웹 개발 해커톤',
				alias: 'IT 연합 동아리 해커톤',
				unknown: false,
				summary: null,
				startdate: '2023-04-14',
				organizer: '컴공선배',
				teamSize: 4,
				contribution: 30,
				isTeam: true,
				detailList: null, //활동 기록 리스트 null
				endDate: '2024-10-20', //끝난 날짜 기준 정렬
			},
			{
				id: 1,
				category: '프로젝트', //해당 활동의 카테고리(프로젝트)
				name: '웹 프로젝트',
				alias: '끼적',
				unknown: false,
				summary: null,
				startdate: '2024-04-14',
				teamSize: 4,
				isTeam: false,
				contribution: 80,
				location: 'OTHER',
				detailList: null, //활동 기록 리스트 null
				endDate: '2024-07-20',
			},
			{
				id: 1,
				category: '경력', //해당 활동의 카테고리(경력)
				name: '학원 채점 아르바이트',
				alias: '근무처',
				unknown: false,
				summary: null,
				startdate: '2023-04-14',
				type: 'FULL_TIME',
				position: '보조강사',
				field: '마케팅',
				detailList: null, //활동 기록 리스트 null
				endDate: '2024-07-20',
			},
		],
	});
	const [triggerEffect, setTriggerEffect] = useState(false);
	const { isLoggedIn } = useAuth(); // 로그인 상태 확인
	const navigate = useNavigate();

	const fetchData = async () => {
		const status = view === 'year' ? 'year' : 'category';
		const data = await CareerViewSelect(status);
		if (data) {
			setCareers(data);
		}
	};

	useEffect(() => {
		// 로그인된 상태일 때만 데이터 가져오기
		if (isLoggedIn) {
			fetchData();
		}
	}, [view, isLoggedIn]);

	const handleAddCareer = () => {
		if (isLoggedIn) {
			fetchData();
			setTriggerEffect((prev) => !prev);
		}
	};

	const handleSearchClick = () => {
		navigate('/Mycareer_search'); // 원하는 경로로 페이지 이동
	};

	return (
		<Container>
			<SearchBox>
				<Title>내커리어</Title>
				<SearchBar onClick={handleSearchClick} /> {/* 클릭 이벤트 추가 */}
			</SearchBox>
			{isLoggedIn && (
				<>
					{/* <Timeline triggerEffect={triggerEffect} /> */}
					<CareerView view={view} onToggle={setView} />
					{view === 'year' && <CareerViewYear data={careers} />}
					{/* {view === 'category' && <CareerViewCategory data={careers} />} */}
					<AddJobButton onClick={() => setShowModal(true)} />
					{showModal && <AddCareerModal onClose={() => setShowModal(false)} onSave={handleAddCareer} />}
				</>
			)}
		</Container>
	);
}
