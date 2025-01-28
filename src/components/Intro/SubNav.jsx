import React from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Convert from './Convert';
import Title from '../Apply/Title';
import Layout from '../Layout';

const SubNav = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const isResumeActive = location.pathname === '/history';
	const isPortfolioActive = location.pathname.startsWith('/history/portfolio');
	const shouldHideConvert = location.pathname.startsWith('/history/list');

	return (
		<Layout title="서류준비">
			<BaseDiv>
				<Nav>
					<NavItems onClick={() => navigate('/history')} active={isResumeActive}>
						이력서
					</NavItems>
					<NavItems onClick={() => navigate('/history/master')} active={!isResumeActive && !isPortfolioActive}>
						자기소개서
					</NavItems>
					<NavItems onClick={() => navigate('/history/portfolio')} active={isPortfolioActive}>
						포트폴리오
					</NavItems>
					<Linear />
					<Section>
						<Outlet />
					</Section>
					
				</Nav>		
			</BaseDiv>
		</Layout>
	);
};

export default SubNav;

const BaseDiv = styled.div`
	width: 100%;
	// display:flex;
	// margin-left:400px;
	// max-width: 820px;
	// background-color:#D9D9D9
	margin-top: 40px;
	position: relative;
`;
const Nav = styled.ul`
	list-style-type: none;
	padding-left: 0;
`;

const NavItems = styled.li`
	font-family: Bold;
	font-size: 24px;
	font-weight: 700;
	line-height: 28.64px;
	display: inline-block;
	margin-right: 50px;
	cursor: pointer;

	color: ${({ active }) => (active ? '#000000' : '#E0E0E0')};
`;

const Linear = styled.div`
	height: 4px;
	background-color: #f1f1f1;
	margin-top: 12px;
	margin-bottom: 28px;
`;

const Section = styled.div`
	height: 100%;
`
