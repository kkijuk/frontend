import api from '../../Axios';
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Toggle from '../../components/Intro/Toggle';
import AddButton from '../../components/Intro/AddButton';

// Todo
// - 옵션 로직 수정

const ViewOptions = () => {
	const navigate = useNavigate();
	const location = useLocation();

	//(Data) 토글 체크, 현재 선택한 공고, 리스트 조회 상태, 자기소개서 목록
	const [isChecked, setIsChecked] = useState(location.path !== '/history/list');
	const [currentApply, setCurrentApply] = useState('master');
	const [state, setState] = useState(3);
	const [recruits, setRecruits] = useState([]);

	//(API) 자기소개서 목록 불러오기
	useEffect(() => {
		api
			.get('/history/intro/list')
			.then((response) => {
				console.log(response.data);
				const Data = response.data.data;
				setRecruits(Data);
				console.log(Data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	//토글 클릭
	const handleToggleClick = () => {
		isChecked ? navigate('/history/list/3') : navigate('/history/master');
		setIsChecked(!isChecked);
		window.scrollTo(0, 0); // 스크롤을 최상단으로 이동
	};

	useEffect(() => {
		if (location.pathname === '/history/master') {
			setCurrentApply('master');
		} else if (location.pathname.startsWith('/history/others/')) {
			const match = location.pathname.match(/\/history\/others\/(\d+)/);
			if (match) {
				setCurrentApply(match[1]);
				console.log(match[1]);
			}
		}
	}, [location.pathname]);

	// 하위 페이지 라우팅
	const handleApplyClick = (id) => {
		setCurrentApply(id);
		id === 'master' ? navigate('/history/master') : navigate(`/history/others/${id}`);
		window.scrollTo(0, 0); // 스크롤을 최상단으로 이동
	};

	const handleStateClick = (state) => {
		navigate(`/history/list/${state}`);
		setState(state);
		window.scrollTo(0, 0); // 스크롤을 최상단으로 이동
	};

	return (
		<>
			<SButtonContainer>
				{isChecked && (
					<SButton
						type="button"
						onClick={() => handleApplyClick('master')}
						style={{ backgroundColor: currentApply === 'master' ? '#E1FAED' : '#F5F5F5' }}
					>
						Master
					</SButton>
				)}
				{isChecked &&
					recruits.map((resume) => (
						<SButton
							type="button"
							key={resume.id}
							onClick={() => handleApplyClick(resume.id)}
							style={{ backgroundColor: currentApply === String(resume.id) ? '#E1FAED' : '#F5F5F5' }}
						>
							{resume.recruitTitle}
						</SButton>
					))}
				{!isChecked && (
					<>
						<SButton
							type="button"
							onClick={() => handleStateClick(3)}
							style={{ backgroundColor: state === 3 ? '#E1FAED' : '#F5F5F5' }}
						>
							전체
						</SButton>
						<SButton
							type="button"
							onClick={() => handleStateClick(0)}
							style={{ backgroundColor: state === 0 ? '#E1FAED' : '#F5F5F5' }}
						>
							작성중
						</SButton>
						<SButton
							type="button"
							onClick={() => handleStateClick(1)}
							style={{ backgroundColor: state === 1 ? '#E1FAED' : '#F5F5F5' }}
						>
							작성완료
						</SButton>
						<SButton
							type="button"
							onClick={() => handleStateClick(2)}
							style={{ backgroundColor: state === 2 ? '#E1FAED' : '#F5F5F5' }}
						>
							보관
						</SButton>
					</>
				)}
			</SButtonContainer>
			<div style={{ position: 'absolute', right: 0, top: 134, display: 'inline-block' }}>
				<Toggle checked={isChecked} onChange={handleToggleClick} />
			</div>
			<AddButton />
			<Outlet key={location.pathname} />
		</>
	);
};
export default ViewOptions;

const SButtonContainer = styled.div`
	width: 650px;
	display: flex;
	overflow-x: auto;
	white-space: nowrap;
	padding-bottom: 10px;

	/* Hide scrollbar for all browsers */
	scrollbar-width: none; /* Firefox */
	-ms-overflow-style: none; /* Internet Explorer 10+ */

	&::-webkit-scrollbar {
		display: none; /* Safari and Chrome */
	}
`;

const SButton = styled.button`
	height: 35px;
	margin-right: 12px;
	font-family: 'Regular';
	border: none;
	border-radius: 10px;
	padding: 6px 16px;
	background-color: #f5f5f5;
	color: #707070;
	cursor: pointer;
	white-space: nowrap;

	&:first-child {
		background-color: #e1faed;
		color: #000000;
	}
`;
