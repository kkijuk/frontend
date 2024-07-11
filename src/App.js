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

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} /> {/* 메인 */}

          <Route path="/login" element={<Login />} /> {/* 커뮤니티 */}
          <Route path="/signup" element={<Signup />} /> {/* 커뮤니티 */}
          <Route path="/mypage" element={<MyPage />} /> {/* 마이 페이지 */}

          <Route path="/mycareer" element={<MyCareer />} /> {/* 내커리어 */}
          <Route path="/resume" element={<History />} /> {/* 이력관리 */}
          <Route path="/apply" element={<Apply />} /> {/* 지원관리 */}
          <Route path="/community" element={<Community />} /> {/* 커뮤니티 */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
