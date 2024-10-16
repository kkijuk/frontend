import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Home from "./pages/Home";
import MyPage from "./pages/Mypage/Mypage";
import MyCareer from "./pages/Mycareer/Mycareer";
import MycareerSearch from './pages/Mycareer/Mycareer_search';
import ApplySchedule from "./pages/Apply/ApplySchedule";
import ApplyStatus from "./pages/Apply/ApplyStatus";
import Community from "./pages/Community";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyCareerDetail from './pages/Mycareer/MycareerDetail';
import SignupSuccess from "./pages/SignupSuccess";
import ResetSuccess from "./pages/Mypage/ResetSuccess";
import SubNav from './components/Intro/SubNav';
import ViewOptions from './pages/History/ViewOptions';
import History from "./pages/History/History";
import Master from "./pages/History/Master";
import Others from "./pages/History/Others";
import MasterRewrite from "./pages/History/MasterRewrite";
import OthersRewrite from "./pages/History/OthersRewrite";
import List from "./pages/History/List";
import Select from './pages/History/Select';
import AddApply from "./pages/History/AddApply";
import Portfolio from "./pages/History/Portfolio";
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
import { AuthProvider } from './components/AuthContext'; 
import LoginRequired from './pages/LoginRequired';

import CommingSoon from './pages/CommingSoon';

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
  
  // commingsoon 페이지에서만 Header와 Footer를 숨기기
  const isCommingSoon = location.pathname === "/commingsoon";

  return (
    <AppContainer>
      {!isCommingSoon && <Header />} 
      <MainContent>
        <Routes>
          
          <Route path="/mycareer/:careerId" element={<MyCareerDetail />} />          
          <Route path="/mycareer_search" element={<MycareerSearch />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
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
          <Route path="/login-required" element={<LoginRequired />} />
        </Routes>
      </MainContent>
      {!isCommingSoon && <Footer />} 
    </AppContainer>
  );
};

export default function AppWrapper() {
  return (
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  );
}
