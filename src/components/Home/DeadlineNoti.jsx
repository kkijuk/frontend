import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getRecruitRemind } from '../../api/Home/getRecruitRemind';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
	flex-shrink: 0;
	width: 400px;
	height: 154px;
	border-radius: 10px;
	border: none;
	background: var(--gray-06, #f5f5f5);
	display: flex;
	flex-direction: column;
	align-items: left;
	justify-content: flex-start;
	padding: 20px 25px 20px 25px;
	box-sizing: border-box;
`;

const Label = styled.div`
	color: var(--black, #000);
	font-family: SemiBold;
	font-size: 16px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
	margin-bottom: 3px;
`;

const Box = styled.div`
	width: 350px;
	height: 40px;
	flex-shrink: 0;
	border-radius: 4px;
	border: 1px solid var(--gray-03, #d9d9d9);
	background: var(--white, #fff);
	padding: 7px 20px 7px 20px;
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	margin-top: 6px;
	align-items: center;

	color: var(--black, #000);
	font-family: medium;
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	cursor: pointer;
`;

const DDayBox = styled.div`
	width: 60px;
	height: 25px;
	border-radius: 12px;
	background: var(--gray-06, #f5f5f5);
	margin-left: auto;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const DDayText = styled.div`
	flex-shrink: 0;
	color: ${(props) => props.fontColor || '#707070'};
	font-family: ${(props) => props.font || 'Medium'};
	font-size: 14px;
	font-style: normal;
	font-weight: 500;
`;

const PlaceholderText = styled.div`
	color: var(--gray-03, #d9d9d9); // 회색 글씨
	font-family: medium;
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	text-align: left;
`;

export default function DeadlineNoti() {
	const navigate = useNavigate();
	const [recruits, setRecruits] = useState([]);

	useEffect(() => {
		
		async function fetchData() {
			try {
				const response = await getRecruitRemind();
				if (!response) {
					throw new Error('Failed to fetch data');
				}
				const filledRecruits = [...response.slice(0, 2)]; // 최대 2개의 데이터만 사용
				// 데이터가 2개 미만일 경우 빈 박스를 추가
				while (filledRecruits.length < 2) {
					filledRecruits.push({});
				}
				setRecruits(filledRecruits);
			} catch (error) {
				console.error('에러- Failed to fetch data:', error);
				setRecruits([{}, {}]); // 에러 발생 시 빈 박스 유지
			}
		}

		fetchData();
	}, []);

	const handleClick = (isEmpty, id) => {
		window.scrollTo(0, 0); // 페이지를 최상단으로 스크롤

		if (isEmpty) {
			navigate('/apply-schedule');
		} else {
			navigate(`/apply-detail/${id}`);
		}
	};

	return (
		<Container>
			<Label>공고 마감이 얼마 남지 않았어요</Label>
			{recruits.map((recruit) => {
				const isEmpty = !recruit.title;
				const fontColor = recruit.dday <= 7 ? '#FA7C79' : '#707070'; // 현재: 7일 이하면 글자색 빨간색
				const fontB = recruit.dday <= 7 ? 'SemiBold' : 'Medium';

				return (
					<Box key={recruit.id} onClick={() => handleClick(isEmpty, recruit.id)}>
						{isEmpty ? (
							<PlaceholderText>공고를 추가해 주세요</PlaceholderText>
						) : (
							<>
								{recruit.title}
								<DDayBox>
									<DDayText fontColor={fontColor} font={fontB}>
										D-
									</DDayText>
									<DDayText fontColor={fontColor} font={fontB}>
										{recruit.dday}
									</DDayText>
								</DDayBox>
							</>
						)}
					</Box>
				);
			})}
		</Container>
	);
}
