import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';
import Footer from './components/Footer';
import { AuthProvider } from './components/AuthContext'; 
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
  return (
    <AppContainer>
      {/* Header와 Footer를 CommingSoon 페이지에서 숨김 */}
      <MainContent>
        <Routes>
          {/* 모든 경로를 CommingSoon 페이지로 리디렉션 */}
          <Route path="*" element={<CommingSoon />} />
          <Route path="/" element={<Navigate to="/commingsoon" replace />} />
          <Route path="/mycareer" element={<Navigate to="/commingsoon" replace />} />
        </Routes>
      </MainContent>
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
