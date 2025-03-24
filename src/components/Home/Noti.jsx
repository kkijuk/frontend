//ver2_왼쪽 대시보드
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getRecruitRemind } from '../../api/Home/getRecruitRemind';
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
	align-items: center; // 세로 가운데 정렬//추가
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
	cursor: pointer;
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
	padding: 4px 16px; /* 위아래 4px, 양옆 16px */

	color: ${(props) => props.color || 'var(--gray-02, #707070)'};
	text-align: center;
	font-family: Pretendard;
	font-size: 14px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
`;

export default function Noti() {
	const [recruitList, setRecruitList] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchRecruitData = async () => {
			const data = await getRecruitRemind();
			setRecruitList(data);
		};
		fetchRecruitData();
	}, []);

	const handleClick = (isEmpty, id) => {
		window.scrollTo(0, 0); // 페이지를 최상단으로 스크롤

		if (isEmpty) {
			navigate('/apply-schedule');
		} else {
			navigate(`/apply-detail/${id}`);
		}
	};

	const renderLists = () => {
		if (recruitList.length === 0) {
			return (
				<DashboardNothing text="마감을 기다리는 공고가 없어요" buttonText="공고 추가하기" path="/apply-schedule" />
			);
		}

		const listsToRender = [...recruitList.slice(0, 2)];

		// 1개만 있을 경우, 나머지 한 개 채워주기
		if (listsToRender.length === 1) {
			listsToRender.push(null); // 빈 자리
		}

		return listsToRender.map((item, index) => {
			const isEmpty = !item;

			if (isEmpty) {
				return (
					<List key={`empty-${index}`} onClick={() => handleClick(true)}>
						<ListText>공고를 추가해 주세요</ListText>
					</List>
				);
			}

			const ddayNumber = item.dday; // 숫자 그대로 사용
			const isDanger = ddayNumber <= 7;

			return (
				<List key={item.id} onClick={() => handleClick(false, item.id)}>
					<ListText>{item.title}</ListText>
					<ListTag color={isDanger ? '#FA7C79' : undefined}>D-{item.dday}</ListTag>
				</List>
			);
		});
	};

	return (
		<Container>
			<Title>공고 마감이 얼마 남지 않았어요</Title>
			<Box>{renderLists()}</Box>
		</Container>
	);
}
