import React from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { Color } from '@/constants/color';

const SubNav = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const myInformation = location.pathname === '/mypage/myinformation';
	const Field = location.pathname.startsWith('/mypage/field') || location.pathname.startsWith('/Mypage/FieldEdit');

	return (
		<BackgroundDiv>
			<BaseDiv>
				<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
					<h1 style={{ marginBottom: '36px', display: 'inline-block', fontWeight: 400 }}>마이페이지</h1>
				</div>

				<Nav>
					<NavItems onClick={() => navigate('/mypage/myinformation')} active={myInformation}>
						내정보
					</NavItems>
					<NavItems onClick={() => navigate('/mypage/field')} active={Field}>
						관심분야 설정
					</NavItems>

					<Linear />
					<Outlet />
				</Nav>
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
	width: 100%;
	max-width: 820px;
	padding: 0 40px;
	box-sizing: border-box;

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		padding: 0 20px;
	}
`;

const Nav = styled.ul`
	list-style-type: none;
	padding-left: 0;
`;

const NavItems = styled.li`
	font-family: Bold;
	font-size: 24px;
	/* font-weight: 700; */
	line-height: 28.64px;
	display: inline-block;
	margin-right: 50px;
	cursor: pointer;

	color: ${({ active }) => (active ? Color.black : Color.gray04)};
`;

const Linear = styled.div`
	height: 4px;
	background-color: ${Color.gray05};
	margin-top: 12px;
	margin-bottom: 28px;
`;
