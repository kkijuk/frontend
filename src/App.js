import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import MyPage from "./pages/Mypage";
import MyCareer from "./pages/Mycareer";
import History from "./pages/History";
import Apply from "./pages/Apply";
import Community from "./pages/Community";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyCareerDetail from './pages/MycareerDetail';
import styled from 'styled-components';
import SignupSuccess from "./pages/SignupSuccess";


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
