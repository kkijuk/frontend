import React from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Convert from './Convert';

const SubNav = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const myInformation = location.pathname === '/mypage/myinformation';
	const Interest = location.pathname.startsWith('/mypage/interest');
	const myAccountMangement = location.pathname.startsWith('/mypage/accountmanagement');

	return (
		<BackgroundDiv>
			<BaseDiv>
				<div style={{ width: '820px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
					<h1 style={{ marginBottom: '60px', display: 'inline-block' }}>마이페이지</h1>
				</div>

				<Box></Box>
				<Linear />
			</BaseDiv>
		</BackgroundDiv>
	);
};

export default SubNav;

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
	// display:flex;
	// margin-left:400px;
	max-width: 820px;
	// background-color:#D9D9D9
	position: relative;
`;

const Box = styled.div`
	width: 820px;
	height: 20px;
`;

const Linear = styled.div`
	height: 4px;
	background-color: #f1f1f1;
	margin-top: 12px;
	margin-bottom: 28px;
`;
