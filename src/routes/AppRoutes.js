import React, { useEffect, Suspense } from 'react';
import { useLocation, useNavigate, useRoutes } from 'react-router-dom';
import styled from 'styled-components';

import Header from '@components/Header';
import Footer from '@components/Footer';
import PageFooter from '@components/PageFooter';
import useGA4 from '@hooks/useGA4';

import { setupApiInterceptors } from '@/Axios';
import { getAllRoutes } from './index';
import { shouldShowPageFooter, shouldHideHeader, shouldHideHeaderFooter } from './routeUtils';

// Loading fallback component
const LoadingFallback = () => (
	<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>로딩 중...</div>
);

const MainContent = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	${(props) => props.$hasHeader && 'padding-top: 70px;'}
`;

const AppRoutes = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const currentLocation = location ? location.pathname : '';

	// GA4 초기화
	useGA4();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location?.pathname]); // 경로가 변경될 때마다 실행

	useEffect(() => {
		if (location && location.pathname === '/history/portfolio') {
			alert('이 페이지는 준비중입니다.');
			navigate(-1); // 이전 페이지로 이동
		}
	}, [location, navigate]);

	useEffect(() => {
		setupApiInterceptors(navigate);
	}, [navigate]);

	useEffect(() => {
		const userAgent = navigator.userAgent.toLowerCase();

		if (userAgent.includes('edg')) {
			// Edge 브라우저 감지
			navigate('/browser-error'); // Edge면 /browser-error로 이동
		}
	}, [navigate]);

	const hideHeader = location ? shouldHideHeader(location.pathname) : false;
	const hideHeaderFooter = location ? shouldHideHeaderFooter(location.pathname) : false;
	const showPageFooter = location ? shouldShowPageFooter(location.pathname) : false;

	// 모든 라우트 가져오기
	const routes = useRoutes(getAllRoutes());

	return (
		<>
			{!hideHeader && !hideHeaderFooter && <Header />}
			<MainContent $hasHeader={!hideHeader && !hideHeaderFooter}>
				<Suspense fallback={<LoadingFallback />}>{routes}</Suspense>
			</MainContent>
			{showPageFooter ? <PageFooter /> : !hideHeaderFooter && <Footer />}
		</>
	);
};

export default AppRoutes;
