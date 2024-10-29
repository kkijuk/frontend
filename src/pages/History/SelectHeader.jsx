import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SelectHeader = () => {
	const dummyData = [
		{
			id: '99',
			title: '공고1',
		},
		{
			id: '100',
			title: 'UMC 7기',
		},
		{
			id: '111',
			title: '새로운 공고',
		},
		{
			id: '105',
			title: '공고3',
		},
		{
			id: '120',
			title: '공고9',
		},
		{
			id: '120',
			title: '공고9',
		},
		{
			id: '120',
			title: '공고9',
		},
	];

	const navigate = useNavigate();
	const [currentApply, setCurrentApply] = useState(dummyData[0].id);

	const handleClickItem = (id) => {
		setCurrentApply(id);
		navigate(`/history/select/${id}`);
	};

	return (
		<BackgroundDiv>
			<BaseDiv>
				<div style={{ height: '140px' }}></div>
				<h1>자기소개서를 작성할 공고를 선택해주세요.</h1>
				<div style={{ height: '50px' }}></div>
				<ListDiv>
					<ItemsDiv>
						{dummyData.map((resume) => (
							<Item
								onClick={() => {
									handleClickItem(resume.id);
								}}
								style={{
									backgroundColor: currentApply === resume.id ? '#E1FAED' : '#F5F5F5',
									color: currentApply === resume.id ? 'black' : '#707070',
									border: currentApply === resume.id ? '2px solid var(--main-01, #3AAF85)' : 'none',
								}}
							>
								{resume.title}
							</Item>
						))}
					</ItemsDiv>
					<AddButton>공고 추가</AddButton>
				</ListDiv>
				<Outlet />
			</BaseDiv>
		</BackgroundDiv>
	);
};
export default SelectHeader;

const BackgroundDiv = styled.div`
	width: 100%;
	height: 100%;
	margin-top: 40px;
	display: flex;
	// align-items:center;
	justify-content: center;
`;

const BaseDiv = styled.div`
	width: 820px;
	display: flex;
	flex-direction: column;
	align-items: center;
	// margin-left:400px;
	max-width: 820px;
	// background-color:#D9D9D9
	position: relative;
`;

const ListDiv = styled.div`
	width: 720px;
	height: 84px;
	flex-shrink: 0;
	border-radius: 12px;
	border: 1px solid var(--gray-02, #707070);
	display: flex;
	align-items: center;
	gap: 10px;
	padding: 0px 10px;
`;

const ItemsDiv = styled.div`
	display: flex;
	overflow-x: auto;
	gap: 10px;
	flex: 1;
	white-space: nowrap; /* 항목들이 한 줄에 배치되도록 설정 */

	&::-webkit-scrollbar {
		height: 0px;
	}
`;

const Item = styled.div`
	display: flex;
	max-width: 100px;
	height: 60px;
	padding: 0px 36px;
	justify-content: center;
	align-items: center;
	gap: 10px;
	border-radius: 10px;
	text-align: center;
	font-family: Regular;
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	cursor: pointer;
`;

const AddButton = styled.div`
	width: 120px;
	height: 60px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 10px;
	background: var(--gray-04, #707070);
	color: white;
	cursor: pointer;

	color: #fff;
	text-align: center;
	font-family: Regular;
	font-size: 16px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
`;
