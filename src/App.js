import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import styled from 'styled-components';

import queryClient from './api/queryClient/queryClient';
import api, { setupApiInterceptors } from './Axios';
import SocialRedirect from './components/Redirect';
import Home from './pages/Home';
import MyPage from './pages/Mypage/Mypage';
import MyCareer from './pages/Mycareer/Mycareer';
import MycareerSearch from './pages/Mycareer/Mycareer_search';
import ApplySchedule from './pages/Apply/ApplySchedule';
import ApplyStatus from './pages/Apply/ApplyStatus';
import Community from './pages/Community';
import useGA4 from './hooks/useGA4';
import SocialLogin from './pages/SocialLogin';
import NewSignup from './pages/NewSignup';
import MycareerDetail from './pages/Mycareer/MycareerDetail';
import Browser from './pages/Error/Browser';

import SignupSuccess from './pages/SignupSuccess';
import ResetSuccess from './pages/Mypage/ResetSuccess';
import SubNav from './components/Intro/SubNav';
import ViewOptions from './pages/History/ViewOptions';

import History from './pages/History/History';
import ResumePdf from './pages/History/ResumePDF';
import Master from './pages/History/Master';
import Others from './pages/History/Others';
import MasterRewrite from './pages/History/MasterRewrite';
import OthersRewrite from './pages/History/OthersRewrite';
import List from './pages/History/List';
import Select from './pages/History/Select';
import AddApply from './pages/History/AddApply';
import Portfolio from './pages/History/Portfolio';
import ApplyDetail from './pages/Apply/ApplyDetail';
import Confirm from './pages/Mypage/Confirm';
import MyInformation from './pages/Mypage/Myinformation';
import Field from './pages/Mypage/Field';
import FieldEdit from './pages/Mypage/FieldEdit';
import PasswordResetEmail from './pages/Mypage/PasswordResetEmail';
import PasswordResetEmailConfirm from './pages/Mypage/PasswordResetEmailConfirm';
import PasswordReset from './pages/Mypage/PasswordReset';
import SignupInterest from './pages/SignupInterest';
import PrivacyAgreed from './pages/PrivacyAgreed';
import Header from './components/Header';
import Footer from './components/Footer';
import FilterPage from './components/Apply/FilterPage';

import Error from './pages/Error/BasicError';
import NumError from './pages/Error/NumError';
import BrowserError from './pages/Error/BrowserError';

const AppContainer = styled.div`
	display: flex;
	flex-direction: column;
	min-height: 100vh;
`;

const MainContent = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
`;

const App = () => {
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		if (location.pathname === '/history/portfolio') {
			alert('이 페이지는 준비중입니다.');
			navigate(-1); // 이전 페이지로 이동
		}
	}, [location, navigate]);

	// 헤더를 숨길 경로 설정
	const hideHeaderRoutes = ['/commingsoon', '/', '/signup', '/signupinterest', '/signupsuccess', '/agree'];
	const hideHeader = hideHeaderRoutes.includes(location.pathname);
	const hideHeaderFooterRoutes = ['/browser-error'];
	const hideHeaderFooter = hideHeaderFooterRoutes.includes(location.pathname);
	
	// GA4 초기화
	useGA4();

	useEffect(() => {
		setupApiInterceptors(navigate);
	}, [navigate]);

	useEffect(() => {
		const userAgent = navigator.userAgent.toLowerCase();
		
		if (userAgent.includes("edg")) {  // Edge 브라우저 감지
			navigate("/browser-error");  // Edge면 /browser-error로 이동
		}
	}, [navigate]);
	

	return (
		<AppContainer>
			{!hideHeader && !hideHeaderFooter && <Header />}{/* 헤더는 조건부 렌더링 */}
			<MainContent>
				<Routes>
					<Route path="/mycareer/:careerId/:category" element={<MycareerDetail />} />
					<Route path="/mycareer_search" element={<MycareerSearch />} />
					<Route path="/home" element={<Home />} />
					<Route path="/" element={<SocialLogin />} />
					<Route path="/signup" element={<NewSignup />} />
					<Route path="/browser-error" element={<Browser />} />
					<Route path="/signupsuccess" element={<SignupSuccess />} />
					<Route path="/mypage" element={<MyPage />} />
					<Route path="/mycareer" element={<MyCareer />} />
					<Route path="/signupinterest" element={<SignupInterest />} />

					<Route path="/agree" element={<PrivacyAgreed />} />
					<Route path="/login/oauth2/code/kakao" element={<SocialRedirect provider="kakao" />} />
					<Route path="/login/oauth2/code/naver" element={<SocialRedirect provider="naver" />} />
					<Route element={<SubNav />}>
						<Route path="/history" element={<History />} />
						<Route element={<ViewOptions />}>
							<Route path="/history/master" element={<Master />} />
							<Route path="/history/others/:id" element={<Others />} />
							<Route path="/history/list/:state" element={<List />} />
						</Route>
						<Route path="/history/portfolio" element={<Portfolio />} />
					</Route>
					<Route path="/history/master/rewrite" element={<MasterRewrite />} />
					<Route path="/history/others/:id/rewrite" element={<OthersRewrite />} />
					<Route path="/history/select" element={<Select />} />
					<Route path="/history/add_apply" element={<AddApply />} />
					<Route path="/history/resumeExport" element={<ResumePdf />} />
					<Route path="/apply-schedule" element={<ApplySchedule />} />
					<Route path="/apply-status" element={<ApplyStatus />} />
					<Route path="/apply-detail/:id" element={<ApplyDetail />} />
					<Route path="/filter" element={<FilterPage />} />
					<Route path="/community" element={<Community />} />

					<Route path="/mypage/authentication" element={<Confirm />} />
					<Route path="/mypage/myinformation" element={<MyInformation />} />
					<Route path="/mypage/field" element={<Field />} />
					<Route path="/mypage/fieldedit" element={<FieldEdit />} />
					<Route path="/mypage/passwordresetemail" element={<PasswordResetEmail />} />
					<Route path="/mypage/passwordresetemailconfirm" element={<PasswordResetEmailConfirm />} />
					<Route path="/mypage/passwordreset" element={<PasswordReset />} />
					<Route path="/mypage/resetsuccess" element={<ResetSuccess />} />

					<Route path="/error" element={<Error />} />
					<Route path="/numerror" element={<NumError />} />
					<Route path="/browsererror" element={<BrowserError />} />
				</Routes>
			</MainContent>
			{!hideHeaderFooter && <Footer />}
		</AppContainer>
	);
};

export default function AppWrapper() {
	return (
		<QueryClientProvider client={queryClient}>
			<Router>
				<App />
			</Router>
		</QueryClientProvider>
	);
}
