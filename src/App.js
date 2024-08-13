import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Home from "./pages/Home";
import MyPage from "./pages/Mypage/Mypage";
import MyCareer from "./pages/Mycareer";
import ApplySchedule from "./pages/Apply/ApplySchedule";
import ApplyStatus from "./pages/Apply/ApplyStatus";
import Community from "./pages/Community";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyCareerDetail from './pages/MycareerDetail';
import SignupSuccess from "./pages/SignupSuccess";
import ResetSuccess from "./pages/Mypage/ResetSuccess";
import SubNav from './components/History/SubNav';
import ViewOptions from './pages/History/ViewOptions';
import History from "./pages/History";
import Master from "./pages/History/Master";
import Others from "./pages/History/Others";
import MasterRewrite from "./pages/History/MasterRewrite";
import OthersRewrite from "./pages/History/OthersRewrite";
import ListHeader from "./pages/History/ListHeader";
import List from "./pages/History/List";
import SelectHeader from "./pages/History/SelectHeader";
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
  const hideFooterPaths = ["/login", "/signup", "/signupsuccess"];
  const hideFooter = hideFooterPaths.includes(location.pathname);

  return (
    <AppContainer>
      <Header />
      <MainContent>
        <Routes>
          {/*Mycareer*/}
          <Route path="/mycareer/:careerId" element={<MyCareerDetail />} />


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
          <Route path="/history/select" element={<SelectHeader />}>
            <Route path=":id" element={<Select />} />
          </Route>
          <Route path="/history/add_apply" element={<AddApply />} />
          <Route path="/apply-schedule" element={<ApplySchedule />} /> {/* 지원일정 */}
          <Route path="/apply-status" element={<ApplyStatus />} /> {/* 지원현황 */}
          <Route path="/apply-detail/:id" element={<ApplyDetail />} />
          <Route path="/filter" element={<FilterPage />} />
          <Route path="/community" element={<Community />} />
          <Route path="/mypage/authentication" element={<AuthenticationAccount />} />
          <Route path="/mypage/myinformation" element={<MyInformation />} />
          <Route path="/mypage/accountmanagement" element={<AccountMangement />} />
          <Route path="/mypage/field" element={<Field />} />
          <Route path="/mypage/fieldedit" element={<FieldEdit />} />

          <Route path="/mypage/passwordresetemail" element={<PasswordResetEmail />} />
          <Route path="/mypage/passwordreset" element={<PasswordReset />} />
          <Route path="/mypage/resetsuccess" element={<ResetSuccess />} />
        </Routes>
      </MainContent>
      {!hideFooter && <Footer />}
    </AppContainer>
  );
};

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
