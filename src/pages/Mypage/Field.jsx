//관심분야 페이지
import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SubNav from '../../components/Mypage/SubNav';
import InterestBox from '../../components/shared/InterestBox';
import { mypageInterest } from '../../api/Mypage/mypageInterest';

import { Box, Top, Title, EditButton, ContentArea, InterestArea } from './Field.styles.js';

const Field = ({}) => {
	const [interestingList, setInterestingList] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const interests = await mypageInterest();
				if (Array.isArray(interests)) {
					setInterestingList(interests); // 배열인 경우 상태 업데이트
				} else {
					setInterestingList([]); // 배열이 아닌 경우 빈 배열로 설정
				}
			} catch (error) {
				// 에러 처리
				console.error('Failed to load interests:', error);
				setInterestingList([]); // 에러 발생 시 빈 배열로 설정
			}
		};

		fetchData();
	}, []);

	const handleEdit = () => {
		navigate('/Mypage/FieldEdit');
	};

	return (
		<Box>
			<SubNav></SubNav>
			<Top>
				<Title>내 관심분야</Title>
				<EditButton onClick={handleEdit}>수정</EditButton>
			</Top>
			<ContentArea>
				<InterestArea>
					{interestingList.map((interest) => (
						<InterestBox key={interest} content={interest} selected={true} />
					))}
				</InterestArea>
			</ContentArea>
		</Box>
	);
};

export default Field;
