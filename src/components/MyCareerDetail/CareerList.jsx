import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import AbilityTag from './AbilityTag';
import DetailAddEdit from './DetailAddEdit';
import { ViewCareerDetail } from '../../api/Mycareer/ViewCareerDetail';
import { theme } from '../../constants/theme';

const Box = styled.div`
	display: flex;
	max-width: 720px;
	flex-direction: column;
	align-items: flex-start;
	gap: 16px;
	padding: 24px 40px;
	position: relative;

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		width: 100%;
		padding: 12px 15px;
		box-sizing: border-box;
	}
`;

const Title = styled.div`
	color: var(--black, #000);
	font-family: Pretendard;
	font-size: 16px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
`;

const Contents = styled.div`
	color: var(--black, #000);
	font-family: Pretendard;
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;

	p {
		font-family: regular;
		margin: 0;
	}
`;

const Date = styled.div`
	color: var(--gray-02, #707070);
	text-align: right;
	font-family: Pretendard;
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
`;

const TitleDateContainer = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-between;
`;

const Line = styled.div`
	width: 800px;
	height: 2px;
	background: var(--gray-03, #d9d9d9);
	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		max-width: 100%;
	}
`;

const SvgIcon = styled.svg`
	width: 20px;
	height: 20px;
	position: absolute;
	bottom: 24px;
	right: 40px;
	cursor: pointer;
`;

const AbilityTagWrapper = styled.div`
	width: 100%;
	padding-right: 40px; /* SvgIcon이 위치한 곳 만큼 패딩 줌 */
	box-sizing: border-box;

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		padding-right: 30px; /* 모바일에선 적절히 줄임 */
	}
`;

export default function CareerList({ title, date, contents, detailTag, careerId, detailId, categoryEnName, onUpdate }) {
	const [isDetailAddVisible, setIsDetailAddVisible] = useState(false);
	const [detailData, setDetailData] = useState(null);
	const [currentCareerId, setCurrentCareerId] = useState(careerId);
	const navigate = useNavigate();

	const handleEditClick = async () => {
		try {
			if (!careerId || !categoryEnName) {
				console.error('Missing careerId or categoryEnName:', { careerId, categoryEnName });
				return;
			}

			// 실제 들어오는 categoryEnName 확인
			console.log('categoryEnName from props:', categoryEnName);

			//categoryMapping을 직접 사용하여 변환
			const categoryMapping = {
				ACTIVITY: 'activity',
				PROJECT: 'project',
				EDU: 'edu',
				EMP: 'employment',
				CIRCLE: 'circle',
				COM: 'competition',
				ETC: 'ETC',
			};

			const mappedCategory = categoryMapping[categoryEnName] || 'unknown'; // 변환 실패 시 "unknown"

			// 백엔드에 보내지는 실제 category 값 확인
			console.log('mappedCategory for API call:', mappedCategory);

			// ViewCareerDetail 호출 (소문자로 변환된 값 전달)
			const data = await ViewCareerDetail(careerId, mappedCategory);
			console.log('API Response:', data);

			const detailList = data?.data?.detailList;
			if (!detailList) {
				console.error('detailList is undefined or null in API response');
				return;
			}

			const selectedDetail = detailList.find((detail) => detail.detailId === detailId);
			if (!selectedDetail) {
				console.error('Detail not found for detailId:', detailId);
				return;
			}

			setDetailData(selectedDetail);
			setIsDetailAddVisible(true);
		} catch (error) {
			console.error('Error fetching career details:', error);
		}
	};

	const handleCloseDetailEdit = () => {
		setIsDetailAddVisible(false);
		onUpdate();
	};

	useEffect(() => {
		if (currentCareerId !== careerId) {
			setIsDetailAddVisible(false);
			setCurrentCareerId(careerId);
		}
	}, [careerId]);

	const handleTagClick = (tagName) => {
		console.log(`Tag clicked: ${tagName}`); // 클릭 이벤트 확인
		navigate(`/Mycareer_search?query=${encodeURIComponent(tagName)}`);
	};

	if (isDetailAddVisible && detailData) {
		return (
			<DetailAddEdit
				initialTitle={detailData.title}
				initialStartDate={detailData.startDate}
				initialEndDate={detailData.endDate} // ✅ endDate 추가
				initialContents={detailData.content}
				initialTags={detailData.detailTag}
				careerId={careerId}
				detailId={detailId}
				onClose={handleCloseDetailEdit}
			/>
		);
	}

	return (
		<div>
			<Box>
				<TitleDateContainer>
					<Title>{title}</Title>
					<Date>{date}</Date>
				</TitleDateContainer>
				<Contents>
					{contents.split('\n').map((line, index) => (
						<p key={index}>{line}</p>
					))}
				</Contents>
				<AbilityTagWrapper>
					<AbilityTag tags={detailTag.map((tag) => tag.tagName)} onTagClick={handleTagClick} />
				</AbilityTagWrapper>
				<SvgIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" onClick={handleEditClick}>
					<path
						d="M0 15.8339V20H4.16609L16.4533 7.71282L12.2872 3.54673L0 15.8339ZM19.675 4.49104C20.1083 4.05777 20.1083 3.35787 19.675 2.92459L17.0754 0.324955C16.6421 -0.108318 15.9422 -0.108318 15.509 0.324955L13.4759 2.35801L17.642 6.52409L19.675 4.49104Z"
						fill="#707070"
					/>
				</SvgIcon>
			</Box>
			<Line />
		</div>
	);
}
