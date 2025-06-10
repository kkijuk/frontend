import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SubNav from '../../components/Mypage/SubNav';
import InterestBox from '../../components/shared/InterestBox';
import { mypageInterestEdit } from '../../api/Mypage/mypageInterestEdit';
import { mypageInterest } from '../../api/Mypage/mypageInterest';

import { Box, Top, Title, ContentArea, InterestArea, SaveButton } from './FieldEdit.styles.js';

const FieldEdit = ({ onSave }) => {
	const [interestingList, setSelectedInterest] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const fetchedInterests = await mypageInterest();
				if (Array.isArray(fetchedInterests)) {
					setSelectedInterest(fetchedInterests); // 배열인 경우 상태 업데이트
				} else {
					setSelectedInterest([]); // 배열이 아닌 경우 빈 배열로 설정
				}
			} catch (error) {
				// 에러 처리
				console.error('Failed to load interests:', error);
				setSelectedInterest([]); // 에러 발생 시 빈 배열로 설정
			}
		};

		fetchData();
	}, []);

	const handleInterestSelect = (interest) => {
		setSelectedInterest((prevSelectedInterests) =>
			prevSelectedInterests.includes(interest)
				? prevSelectedInterests.filter((i) => i !== interest)
				: [...prevSelectedInterests, interest],
		);
	};

	const handleSave = async () => {
		try {
			await mypageInterestEdit({ field: interestingList });
			navigate('/Mypage/Field');
		} catch (error) {
			console.error('저장 중 오류 발생:', error);
		}
	};

	return (
		<Box>
			<SubNav></SubNav>
			<Top>
				<Title>내 관심분야</Title>
			</Top>
			<ContentArea>
				<InterestArea>
					{[
						'광고/마케팅',
						'디자인',
						'기획/아이디어',
						'영상/콘텐츠',
						'IT/SW',
						'무역/유통',
						'창업/스타트업',
						'금융/경제',
						'봉사활동',
						'뷰티/패션',
						'스포츠/레저',
						'해외탐방',
						'바이오/생명',
						'법률/법무',
						'교육',
						'데이터분석',
					].map((interest) => (
						<InterestBox
							key={interest}
							content={interest}
							selected={interestingList.includes(interest)}
							onClick={() => handleInterestSelect(interest)}
						/>
					))}
				</InterestArea>
				<SaveButton onClick={handleSave}>저장</SaveButton>
			</ContentArea>
		</Box>
	);
};

export default FieldEdit;
