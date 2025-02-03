//관심분야 페이지
import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SubNav from '../../components/Mypage/SubNav';
import InterestBox from '../../components/shared/InterestBox';
import { mypageInterest } from '../../api/Mypage/mypageInterest';

const Box = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding-bottom: 100px;
`;

const Top = styled.div`
	width: 464px;
	margin-top: 17px;
	margin-bottim: 32px;
	display: flex;
	justify-content: left;
	align-items: center;
`;

const ContentArea = styled.div`
	margin: 0 auto;
	background-color: white;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;

	flex-direction: column;
	overflow-y: auto;
`;

const InterestArea = styled.div`
	display: grid;
	width: 100%;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: repeat(8, auto);
	box-sizing: border-box;
	gap: 10px;
	justify-content: center;
`;

const Title = styled.h2`
	color: var(--black, #000);
	font-family: Pretendard;
	font-size: 20px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
`;

const EditButton = styled.button`
	width: 65px;
	height: 25px;
	flex-shrink: 0;
	border-radius: 10px;
	border: none;
	background: var(--gray-06, #f5f5f5);
	margin-left: 10px;
	cursor: pointer;

	color: var(--gray-02, #707070);
	text-align: center;
	font-family: Pretendard;
	font-size: 14px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;

	&:hover {
		background-color: #f1f1f1;
	}
`;

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
