import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css'
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import MyPage from "./pages/Mypage";
import MyCareer from "./pages/Mycareer";
import Apply from "./pages/Apply";
import Community from "./pages/Community";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyCareerDetail from './pages/MycareerDetail';
import styled from 'styled-components';
import SignupSuccess from "./pages/SignupSuccess";
import History from "./pages/History";
import Master from "./pages/History/Master";
import Others from "./pages/History/Others"
import MasterRewrite from "./pages/History/MasterRewrite"
import OthersRewrite from "./pages/History/OthersRewrite"
import List from "./pages/History/List"
import Select from "./pages/History/Select"
import AddApply from "./pages/History/AddApply"
import Portfolio from "./pages/History/Portfolio"


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
          <Route path="/history" element={<History />} /> {/* 이력관리 */}
          <Route path="/history/master" element={<Master/>}/>
          <Route path="/history/:id" element={<Others/>}/>
          <Route path="/history/master/rewrite" element={<MasterRewrite/>}/>
          <Route path="/history/:id/rewrite" element={<OthersRewrite/>}/>
          <Route path="/history/list" element={<List/>}/>
          <Route path="/history/select" element={<Select/>}/>
          <Route path="/history/add_apply" element={<AddApply/>}/>
          <Route path="/history/portfolio" element={<Portfolio/>}/>
          <Route path="/apply" element={<Apply />} /> {/* 지원관리 */}
          <Route path="/community" element={<Community />} /> {/* 커뮤니티 */}
        </Routes>
        </MainContent>
        <Footer />
      </div>
      </AppContainer>
    </Router>
  );
}

export default App;
