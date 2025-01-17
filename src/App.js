import React from 'react'; 
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import styled from 'styled-components';

import queryClient from './api/queryClient/queryClient';
import KakaoRedirect from './components/Redirect'; // default export는 중괄호 없이 가져옵니다.
import NaverRedirect from './components/Redirect';
import Home from './pages/Home';
import MyPage from './pages/Mypage/Mypage';
import MyCareer from './pages/Mycareer/Mycareer';
import MycareerSearch from './pages/Mycareer/Mycareer_search';
import ApplySchedule from './pages/Apply/ApplySchedule';
import ApplyStatus from './pages/Apply/ApplyStatus';
import Community from './pages/Community';

import SocialLogin from './pages/SocialLogin';
import NewSignup from './pages/NewSignup';
import MycareerDetail from './pages/Mycareer/MycareerDetail';

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
import AuthenticationAccount from './pages/Mypage/AuthenticationAccount';
import AccountMangement from './pages/Mypage/AccountManagement';
import MyInformation from './pages/Mypage/Myinformation';
import Field from './pages/Mypage/Field';
import FieldEdit from './pages/Mypage/FieldEdit';
import PasswordResetEmail from './pages/Mypage/PasswordResetEmail';
import PasswordResetEmailConfirm from './pages/Mypage/PasswordResetEmailConfirm';
import PasswordReset from './pages/Mypage/PasswordReset';
import SignupInterest from './pages/SignupInterest';

import Header from './components/Header';
import Footer from './components/Footer';
import FilterPage from './components/Apply/FilterPage';

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

	const hideHeaderFooterRoutes = ['/commingsoon', '/', '/signup', '/signupinterest','/signupsuccess' ];
	const hideHeaderFooter = hideHeaderFooterRoutes.includes(location.pathname);

	return (
		<AppContainer>
			{!hideHeaderFooter && <Header />}
			<MainContent>
				<Routes>
					<Route path="/mycareer/:careerId/:category" element={<MycareerDetail />} />
					<Route path="/mycareer_search" element={<MycareerSearch />} />
					<Route path="/home" element={<Home />} />
					<Route path="/" element={<SocialLogin />} />
					<Route path="/login/oauth2/code/kakao" element={<KakaoRedirect />} />
					<Route path="/login/oauth2/code/naver" element={<NaverRedirect />} />
					<Route path="/signup" element={<NewSignup />} />
					<Route path="/signupsuccess" element={<SignupSuccess />} />
					<Route path="/mypage" element={<MyPage />} />
					<Route path="/mycareer" element={<MyCareer />} />
					<Route path="/signupinterest" element={<SignupInterest />} />
					<Route element={<SubNav />}>
						<Route element={<ViewOptions />}>
							<Route path="/history/master" element={<Master />} />
							<Route path="/history/others/:id" element={<Others />} />
							<Route path="/history/list/:state" element={<List />} />
						</Route>
						<Route path="/history" element={<History />} />
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
					<Route path="/mypage/authentication" element={<AuthenticationAccount />} />
					<Route path="/mypage/myinformation" element={<MyInformation />} />
					<Route path="/mypage/accountmanagement" element={<AccountMangement />} />
					<Route path="/mypage/field" element={<Field />} />
					<Route path="/mypage/fieldedit" element={<FieldEdit />} />
					<Route path="/mypage/passwordresetemail" element={<PasswordResetEmail />} />
					<Route path="/mypage/passwordresetemailconfirm" element={<PasswordResetEmailConfirm />} />
					<Route path="/mypage/passwordreset" element={<PasswordReset />} />
					<Route path="/mypage/resetsuccess" element={<ResetSuccess />} />
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
