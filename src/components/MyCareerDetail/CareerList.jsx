import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import AbilityTag from './AbilityTag';
import DetailAddEdit from './DetailAddEdit';
import { ViewCareerDetail } from '../../api/Mycareer/ViewCareerDetail';

const Box = styled.div`
	display: flex;
	width: 720px;
	flex-direction: column;
	align-items: flex-start;
	gap: 14px;
	padding: 24px 40px;
	position: relative;
`;

const Title = styled.div`
	color: var(--black, #000);
	font-family: bold;
	font-size: 18px;
	font-style: normal;
	line-height: normal;
`;

const Contents = styled.div`
	color: var(--black, #000);
	font-size: 16px;
	font-style: normal;
	line-height: normal;

	p {
		font-family: regular;
		margin: 0;
	}
`;

const Date = styled.div`
	color: var(--gray-02, #707070);
	text-align: right;
	font-family: regular;
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	align-self: flex-start;
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
`;

const SvgIcon = styled.svg`
	width: 20px;
	height: 20px;
	position: absolute;
	bottom: 24px;
	right: 40px;
	cursor: pointer;
`;

export default function CareerList({ title, date, contents, detailTag, careerId, detailId, categoryEnName, onUpdate }) {
	const [isDetailAddVisible, setIsDetailAddVisible] = useState(false);
	const [detailData, setDetailData] = useState(null);
	const [currentCareerId, setCurrentCareerId] = useState(careerId);

	const handleEditClick = async () => {
		try {
			if (!careerId || !categoryEnName) {
				console.error('Missing careerId or categoryEnName:', { careerId, categoryEnName });
				return;
			}

			// ViewCareerDetail 호출
			const data = await ViewCareerDetail(careerId, categoryEnName);
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

	if (isDetailAddVisible && detailData) {
		return (
			<DetailAddEdit
				initialTitle={detailData.title}
				initialDate={detailData.startDate}
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
				<AbilityTag tags={detailTag.map((tag) => tag.tagName)} />
				<SvgIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" onClick={handleEditClick}>
					<path
						d="M0 15.8339V20H4.16609L16.4533 7.71282L12.2872 3.54673L0 15.8339ZM19.675 4.49104C20.1083 4.05777 20.1083 3.35787 19.675 2.92459L17.0754 0.324955C16.6421 -0.108318 15.9422 -0.108318 15.509 0.324955L13.4759 2.35801L17.642 6.52409L19.675 4.49104Z"
						fill="#B0B0B0"
					/>
				</SvgIcon>
			</Box>
			<Line />
		</div>
	);
}
