import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate import
import styled from 'styled-components';

import { CareerViewSelect } from '../../api/Mycareer/CareerviewSelect';
import { yearMockData, categoryMockData } from './mockData';

import Title from '../../components/Apply/Title';
import CareerView from '../../components/Mycareer/CareerView';
import CareerViewYear from '../../components/Mycareer/CareerViewYear';
import CareerViewCategory from '../../components/Mycareer/CareerViewCategory';
import AddJobButton from '../../components/shared/AddJobButton';
import AddCareerModal from '../../components/Modal/AddCareerModal/AddCareerModal';
import SearchBar from '../../components/Mycareer/shareSearchBar';
import CareerTimeline from '../../components/Mycareer/CareerTimeline';
import useAuthRedirect from '../../stores/useAuthRedirect'; 

const Container = styled.div`
	width: 100%;
	max-width: 820px;
	margin: 0 auto;
	background-color: white;
	border-radius: 15px;
	box-sizing: border-box;
`;

const SearchBox = styled.div`
	width: 100%;
	max-width: 820px;
	height: 36px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 20px;
	margin-top: 35px;
	box-sizing: border-box;

	@media (max-width: 600px) {
		flex-direction: column; /* 작은 화면에서는 세로로 정렬 */
		align-items: flex-start; /* 왼쪽 정렬 */
		height: auto; /* 높이 자동 조정 */
		margin-top: 20px; /* 위쪽 여백 조정 */
	}
`;

export default function Mycareer() {
	useAuthRedirect();
	const [view, setView] = useState('year');
	const [showModal, setShowModal] = useState(false);
	const [careers, setCareers] = useState({});
	const [_, setTriggerEffect] = useState(false);
	const navigate = useNavigate();

	const fetchData = async () => {
		const status = view === 'year' ? 'year' : 'category';
		const data = await CareerViewSelect(status);
		if (data) {
			setCareers(data.data);
		}
	};

	useEffect(() => {
		// 데이터를 항상 가져오도록 수정
		fetchData();
	}, [view]);

	const handleAddCareer = () => {
		fetchData();
		setTriggerEffect((prev) => !prev);
	};

	const handleSearchClick = () => {
		navigate('/Mycareer_search'); // 원하는 경로로 페이지 이동
	};

	return (
		<>
			<Container>
				<SearchBox>
					<Title>내커리어</Title>
					<SearchBar onClick={handleSearchClick} /> {/* 클릭 이벤트 추가 */}
				</SearchBox>
				<div>
					<CareerTimeline />
					<CareerView view={view} onToggle={setView} />
					<AddJobButton onClick={() => setShowModal(true)} />
					{showModal && <AddCareerModal onClose={() => setShowModal(false)} onSave={handleAddCareer} />}
				</div>
			</Container>
			{view === 'year' ? <CareerViewYear data={careers} /> : <CareerViewCategory data={careers} />}
		</>
	);
}
