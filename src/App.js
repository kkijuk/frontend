import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css'
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import MyPage from "./pages/Mypage/Mypage";
import MyCareer from "./pages/Mycareer";
import Apply from "./pages/Apply";
import Community from "./pages/Community";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyCareerDetail from './pages/MycareerDetail';
import styled from 'styled-components';
import SignupSuccess from "./pages/SignupSuccess";
import SubNav from './components/History/SubNav';
import ViewOptions from './pages/History/ViewOptions';
import History from "./pages/History";
import Master from "./pages/History/Master";
import Others from "./pages/History/Others"
import MasterRewrite from "./pages/History/MasterRewrite"
import OthersRewrite from "./pages/History/OthersRewrite"
import ListHeader from "./pages/History/ListHeader"
import List from "./pages/History/List"
import SelectHeader from "./pages/History/SelectHeader"
import Select from './pages/History/Select';
import AddApply from "./pages/History/AddApply"
import Portfolio from "./pages/History/Portfolio"
import ApplyDetail from './pages/ApplyDetail';
import AuthenticationAccount from './pages/Mypage/AuthenticationAccount';
import MyInformation from './pages/Mypage/Myinformation';

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

function App() {
  return (
    <Router>
      <AppContainer>
      <div className="App">
        <Header />
        <MainContent>
        <Routes>
          <Route path="/" element={<Home />} /> {/* 메인 */}

          <Route path="/login" element={<Login />} /> {/* 커뮤니티 */}
          <Route path="/signup" element={<Signup />} /> {/* 커뮤니티 */}
          <Route path="/mypage" element={<MyPage />} /> {/* 마이 페이지 */}
          <Route path="/mycareerdetail" element={<MyCareerDetail />} /> {/* 내커리어 상세*/}
          <Route path="/mycareer" element={<MyCareer />} /> {/* 내커리어 */}

          {/* 이력관리 라우팅 */}
          <Route element={<SubNav/>}>
            <Route element={<ViewOptions/>}>
              <Route path="/history/master" element={<Master/>}/>
              <Route path="/history/others/:id" element={<Others/>}/>
              <Route path="/history/list/:state" element={<List/>}/>
            </Route>
            
            <Route path="/history" element={<History/>}/>
            <Route path="/history/portfolio" element={<Portfolio/>}/>
          </Route>
          <Route path="/history/master/rewrite" element={<MasterRewrite/>}/>
          <Route path="/history/others/:id/rewrite" element={<OthersRewrite/>}/>
          <Route path="/history/select" element={<SelectHeader />}>
            <Route path=":id" element={<Select />} />
          </Route>
          <Route path="/history/add_apply" element={<AddApply />} />
          
          <Route path="/apply" element={<Apply />} /> {/* 지원관리 */}
          <Route path="/apply-detail/:id" element={<ApplyDetail />} />
          <Route path="/community" element={<Community />} /> {/* 커뮤니티 */}


          {/* 마이페이지 라우팅 */}
          <Route path="/mypage/authentication" element={<AuthenticationAccount />} /> {/* 마이 페이지 누르면 나오는 비번 확인 페이지*/}
          <Route path="/mypage/myinformation" element={<MyInformation />} /> {/* 마이 페이지 누르면 나오는 비번 확인 페이지*/}



        </Routes>
        </MainContent>
        <Footer />
      </div>    
      </AppContainer>
    </Router>
  );
}

export default App;
