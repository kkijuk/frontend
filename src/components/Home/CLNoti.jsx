//ver2_오른쪽 대시보드
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getIntroduce } from '../../api/Home/getIntroduce';
import DashboardNothing from './DashboardN';

const Container = styled.div`
	display: flex;
	gap: 12px;
	width: 350px;
	padding: 20px 25px;
	flex-direction: column;
	align-items: flex-start;
	gap: 10px;
	flex-shrink: 0;

	border-radius: 10px;
	background: var(--gray-06, #f5f5f5);

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		width: 100%;
		box-sizing: border-box;

		padding: 20px 16px;
	}
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

	padding: 20px 24px;
	box-sizing: border-box;

	justify-content: center; // 가로 가운데 정렬
	align-items: center; // 세로 가운데 정렬

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		width: 100%;
	}
`;

const List = styled.div`
	width: 100%;
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
	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		width: 100%;
	}
`;

const ListText = styled.div`
	color: ${(props) => (props.empty ? '#d9d9d9' : 'var(--black, #000)')};
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
	const navigate = useNavigate();

	useEffect(() => {
		const fetchIntroduceData = async () => {
			const data = await getIntroduce();
			console.log('📦 받아온 introduceList:', data); // ✅ 콘솔 로그 추가

			if (data && Array.isArray(data)) {
				setIntroduceList(data);
			}
		};
		fetchIntroduceData();
	}, []);

	const handleClick = (isEmpty, id) => {
		window.scrollTo(0, 0);
		if (isEmpty) {
			navigate('/history/master');
		} else {
			navigate(`/history/others/${id}`);
		}
	};

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
			const isEmpty = !item;

			if (isEmpty) {
				return (
					<List key={`empty-${index}`} onClick={() => handleClick(true)}>
						<ListText empty>자기소개서를 추가해 주세요</ListText>
					</List>
				);
			}

			const ddayNumber = item.deadline; // 숫자 그대로 사용
			const isDanger = ddayNumber <= 7;

			return (
				<List key={item.introduceId} onClick={() => handleClick(false, item.introduceId)}>
					<ListText>{item.recruitTitle}</ListText>
					<ListTag color={isDanger ? '#FA7C79' : undefined}>{item.deadline}</ListTag>
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
