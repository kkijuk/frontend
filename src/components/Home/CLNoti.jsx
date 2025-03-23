//ver2_오른쪽 대시보드
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getIntroduce } from '../../api/Home/getIntroduce';
import DashboardNothing from './DashboardN';

const Container = styled.div`
	display: flex;
	gap: 12px;
	width: 350px;
	height: 114px;
	padding: 20px 25px;
	flex-direction: column;
	align-items: flex-start;
	gap: 10px;
	flex-shrink: 0;

	border-radius: 10px;
	background: var(--gray-06, #f5f5f5);
`;

const Title = styled.div`
	align-self: stretch;
	color: var(--black, #000);
	font-family: Pretendard;
	font-size: 16px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
`;

const Box = styled.div`
	width: 350px;
	height: 88px;
	display: flex;
	flex-direction: column;
	gap: 8px;

	justify-content: center; // 가로 가운데 정렬
	align-items: center; // 세로 가운데 정렬
`;

const List = styled.div`
	width: 310px;
	height: 40px;
	flex-shrink: 0;
	border-radius: 4px;
	border: 1px solid var(--gray-03, #d9d9d9);
	background: var(--white, #fff);
	padding: 0 20px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const ListText = styled.div`
	color: var(--black, #000);
	font-family: Pretendard;
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
`;

const ListTag = styled.div`
	flex-shrink: 0;
	border-radius: 12px;
	background: var(--gray-06, #f5f5f5);
	padding: 4px 16px;

	color: ${(props) => props.color || 'var(--gray-02, #707070)'};
	text-align: center;
	font-family: Pretendard;
	font-size: 14px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
`;

export default function CLNoti() {
	const [introduceList, setIntroduceList] = useState([]);

	useEffect(() => {
		const fetchIntroduceData = async () => {
			const data = await getIntroduce();
			if (data && Array.isArray(data)) {
				setIntroduceList(data);
			}
		};
		fetchIntroduceData();
	}, []);

	const renderLists = () => {
		if (introduceList.length === 0) {
			return (
				<DashboardNothing
					text="작성 중인 자기소개서가 없어요"
					buttonText="자기소개서 작성하기"
					path="/history/master"
				/>
			);
		}

		const listsToRender = [...introduceList.slice(0, 2)];

		if (listsToRender.length === 1) {
			listsToRender.push(null);
		}

		return listsToRender.map((item, index) => {
			if (!item) {
				return (
					<List key="empty">
						<ListText>공고를 추가해 주세요</ListText>
					</List>
				);
			}

			const ddayNumber = item.dday; // 숫자 그대로 사용
			const isDanger = ddayNumber <= 7;

			return (
				<List key={index}>
					<ListText>{item.title}</ListText>
					<ListTag color={isDanger ? '#FA7C79' : undefined}>{item.dday}</ListTag>
				</List>
			);
		});
	};

	return (
		<Container>
			<Title>자기소개서 작성 완료를 기다려요</Title>
			<Box>{renderLists()}</Box>
		</Container>
	);
}
