import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Layout from '../../components/Layout';
import { useParams } from 'react-router-dom';

import Careerbox from '../../components/MyCareerDetail/CareerBox';
import CareerList from '../../components/MyCareerDetail/CareerList';

import { CareerViewSelect } from '../../api/Mycareer/CareerviewSelect';
import { ViewCareerDetail } from '../../api/Mycareer/ViewCareerDetail';

const CareerBoxContainer = styled.div`
	width: 100%; /* 가로 스크롤을 위해 전체 너비 */
	height: 105px;
	margin-top: 40px;
	display: flex; /* 플렉스 박스를 사용 */
	flex-wrap: nowrap; /* 줄 바꿈을 방지 */
	gap: 10px; /* 박스 간격 */
	overflow-x: auto; /* 가로 스크롤 활성화 */
	overflow-y: hidden; /* 세로 스크롤 방지 */
	white-space: nowrap; /* 텍스트 줄 바꿈 방지 */
`;

const CareerContentContainer = styled.div`
	width: 720px;
	height: ${(props) => (props.isEditing ? '175px' : '88px')}; /* 편집 상태에 따라 높이 변경 */
	margin-top: 30px;
	margin-bottom: 32px;

	border: 1px solid black;
	box-sizing: border-box;

	position: relative; /* 위치를 기준으로 자식 컴포넌트가 확장 */
`;

const TitleContainer = styled.div`
	height: 30px;
	width: 100%;
	/*양쪽 끝에 가게 */
`;

const Title = styled.div`
	color: #000;

	font-family: Pretendard;
	font-size: 24px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
`;

const Date = styled.div`
	height: 15px;
	color: #707070;

	margin-top: 7px;
	margin-bottom: 18px;

	font-family: Pretendard;
	font-size: 12px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
`;

const Content = styled.div`
	width: 720px;
	height: auto;
	color: var(--gray-02, #707070);
	font-family: Pretendard;
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	text-decoration-line: underline;
	text-decoration-style: solid;
	text-decoration-skip-ink: none;
	text-decoration-thickness: auto;
	text-underline-offset: auto;
	text-underline-position: from-font;
`;

const Line = styled.div`
	width: 800px;
	height: 6px;

	background: var(--gray-03, #d9d9d9);
	margin-bottom: 24px;
`;

const CareerListBox = styled.div`
	width: 800px;
	height: 595px;
	overflow-y: auto;
	overflow-x: hidden;
`;

const CareerPlus = styled.button`
	width: 720px;
	height: 50px;
	border-radius: 10px;
	background: var(--main-01, #3aaf85);
	border: none;
	color: white;
	cursor: pointer;
	position: fixed;
	z-index: 1;

	bottom: 30px;
	background: ${(props) => (props.disabled ? 'var(--gray-03, #D9D9D9)' : 'var(--main-01, #3AAF85)')};
	cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
`;

const EditActivityContent = styled.div`
	width: 720px;
	height: 106px;
	border: 1px solid black;
	box-sizing: border-box;

	display: flex; /* 가로 배치 */
	justify-content: space-between; /* 양쪽 끝에 배치 */
	align-items: center; /* 세로 가운데 정렬 */
`;

const Textbox = styled.textarea`
	width: 625px;
	height: 106px;
	flex-shrink: 0;
	padding: 10px; /* 텍스트 영역 내부 여백 */
	border: none;
	box-sizing: border-box;
	outline: none; /* 파란색 테두리 제거 */

	border-radius: 10px;
	background: #f5f5f5;
`;

const EditBox = styled.button`
	width: 80px;
	height: 106px;
	flex-shrink: 0;

	border-radius: 10px;
	background: var(--main-01, #3aaf85);
`;

const PageContainer = styled.div`
	display: flex;
	flex-direction: column; /* 위에서 아래로 배치 */
	align-items: center; /* 필요하면 가운데 정렬 */
	width: 100%; /* 전체 너비 */
`;

export default function MycareerDetail() {
	const location = useLocation();
	const { careerId, category } = location.state || {};
	const [details, setDetails] = useState(null);
	const [careerList, setCareerList] = useState([]);
	const [selectedCareer, setSelectedCareer] = useState({ id: careerId || null, type: category || null });
	const [isEditing, setIsEditing] = useState(false); // 편집 상태 추가

	const categoryToTypeMap = {
		대외활동: 'activity',
		동아리: 'circle',
		프로젝트: 'project',
		교육: 'edu',
		대회: 'competition',
		경력: 'employment',
	};

	const fetchCareerDetails = async (id, type) => {
		try {
			const response = await ViewCareerDetail(id, type);
			setDetails(response.data);
		} catch (error) {
			console.error('Error fetching career details:', error);
		}
	};

	useEffect(() => {
		if (careerId && category) {
			const type = categoryToTypeMap[category] || category;
			fetchCareerDetails(careerId, type);
		}
	}, [careerId, category]);

	useEffect(() => {
		const fetchAllCareers = async () => {
			try {
				const response = await CareerViewSelect('all');
				if (Array.isArray(response.data)) {
					setCareerList(response.data);
				}
			} catch (error) {
				console.error('Error fetching all careers:', error);
			}
		};

		fetchAllCareers();
	}, []);

	const handleCareerBoxClick = (id, type) => {
		const mappedType = categoryToTypeMap[type] || type;
		setSelectedCareer({ id, type: mappedType });
		fetchCareerDetails(id, mappedType);
	};

	const handleEditClick = () => {
		setIsEditing(true); // 편집 모드로 변경
	};

	const handleSaveClick = () => {
		setIsEditing(false); // 편집 모드 종료
		// 저장 로직 추가 가능
	};

	return (
		<Layout title="내 커리어">
			<PageContainer>
				<CareerBoxContainer>
					{careerList.map((career) => (
						<Careerbox
							key={career.id}
							id={career.id}
							startdate={career.startdate}
							enddate={career.endDate}
							careerName={career.name}
							category={career.category}
							selected={career.id === selectedCareer.id && categoryToTypeMap[career.category] === selectedCareer.type}
							onClick={() => handleCareerBoxClick(career.id, career.category)}
						/>
					))}
				</CareerBoxContainer>

				<CareerContentContainer isEditing={isEditing}>
					<TitleContainer>
						<Title>{details?.alias || '제목 없음'}</Title>
					</TitleContainer>
					<Date>
						{details?.startdate} ~ {details?.endDate}
					</Date>
					{isEditing ? (
						<EditActivityContent>
							<Textbox defaultValue={details?.summary || ''} />
							<EditBox onClick={handleSaveClick}>저장</EditBox>
						</EditActivityContent>
					) : (
						<Content onClick={handleEditClick}>{details?.summary || '활동내역을 작성해주세요.'}</Content>
					)}
				</CareerContentContainer>

				<Line></Line>

				<CareerListBox>
					<CareerList></CareerList>
				</CareerListBox>
			</PageContainer>
		</Layout>
	);
}
