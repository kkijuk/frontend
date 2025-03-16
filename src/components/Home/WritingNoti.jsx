import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getIntroduce } from '../../api/Home/getIntroduce';
import { useNavigate } from 'react-router-dom';
import { trackEvent } from '../../utils/ga4';

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
	font-family: Medium;
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
	font-family: Medium;
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	text-align: left;
`;

export default function WritingNoti() {
	const navigate = useNavigate();
	const [introduceList, setIntroduceList] = useState([]);

	useEffect(() => {
		const fetchIntroduce = async () => {
			try {
				const data = await getIntroduce();
				if (data && data.length > 0) {
					// 마감 기한이 지난 항목 필터링
					const validIntroduceList = data.filter((introduce) => {
						if (!introduce.deadline) return true; // 마감일이 없으면 유지
						const num = parseInt(introduce.deadline.replace(/[^0-9]/g, ''), 10);
						return num >= 0; // D-0 이하 제거
					});

					// 최대 2개만 유지하고, 부족하면 빈 박스 추가
					const filledIntroduceList = [...validIntroduceList.slice(0, 2)];
					while (filledIntroduceList.length < 2) {
						filledIntroduceList.push({});
					}
					setIntroduceList(filledIntroduceList);
				} else {
					setIntroduceList([{}, {}]);
				}
			} catch (error) {
				console.error('Error fetching data:', error);
				setIntroduceList([{}, {}]);
			}
		};

		fetchIntroduce();
	}, []);

	const handleClick = (isEmpty, id) => {
		window.scrollTo(0, 0);

		if (isEmpty) {
			navigate('/history/master');
		} else {
			navigate(`/history/others/${id}`);
		}
	};

	return (
		<Container>
			<Label>자기소개서 작성 완료를 기다려요</Label>
			{introduceList.map((introduce, index) => {
				const isEmpty = !introduce.recruitTitle; // 데이터 없는 경우 처리
				const num = introduce.deadline ? parseInt(introduce.deadline.replace(/[^0-9]/g, ''), 10) : null;
				const id = introduce.introduceId;
				const fontColor = num <= 7 ? '#FA7C79' : '#707070'; // 현재: 7일 이하면 글자색 빨간색
				const fontB = num <= 7 ? 'SemiBold' : 'Medium';
				const dDayText = num === 0 ? 'D-DAY' : `D-${num}`;

				return (
					<Box
						key={index}
						onClick={() => {
							if (isEmpty) {
								trackEvent('add_click', {
									category: 'home',
									detail: 'add_career',
									action_type: 'add',
									label: '활동 추가하기',
								});
							}
							handleClick(isEmpty, id);
						}}>
						{isEmpty ? (
							<PlaceholderText>자기소개서를 작성해 주세요</PlaceholderText>
						) : (
							<>
								{introduce.recruitTitle}
								<DDayBox>
									<DDayText fontColor={fontColor} font={fontB}>
										{dDayText}
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
