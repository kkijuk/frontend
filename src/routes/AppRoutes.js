import React, { useEffect, Suspense } from 'react';
import { useLocation, useNavigate, useRoutes } from 'react-router-dom';
import styled from 'styled-components';

import Header from '@components/Header';
import Footer from '@components/Footer';
import PageFooter from '@components/PageFooter';
import useGA4 from '@hooks/useGA4';
import LoadingSpinner from '@components/shared/LoadingSpinner';

import { setupApiInterceptors } from '@/Axios';
import { getAllRoutes } from './index';
import { shouldShowPageFooter, shouldHideHeader, shouldHideHeaderFooter } from './routeUtils';

//페이지 점검 관련 코드 추가
const isMaintenanceMode = process.env.REACT_APP_MAINTENANCE_MODE === 'true';
const maintenancePath = '/serviceMaintenence';

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

	// 점검시 리다이렉트
	useEffect(() => {
		if (isMaintenanceMode && location.pathname !== maintenancePath) {
			navigate(maintenancePath, { replace: true });
		}
	}, [location.pathname]);

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
				<Suspense fallback={<LoadingSpinner message="조금만 기다려주세요..!" />}>{routes}</Suspense>
			</MainContent>
			{showPageFooter ? <PageFooter /> : !hideHeaderFooter && <Footer />}
		</>
	);
};

export default AppRoutes;
