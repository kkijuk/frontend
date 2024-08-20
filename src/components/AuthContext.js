import React, { createContext, useContext, useState, useEffect } from 'react';

// AuthContext 생성
const AuthContext = createContext();

// AuthProvider 컴포넌트
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 이펙트에서 로그인 상태 확인 (예: 로컬스토리지에서 확인)
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(loggedInStatus === 'true');
  }, []);

  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    // 추가적으로 서버에 로그아웃 요청
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// AuthContext 사용 훅
export const useAuth = () => {
  return useContext(AuthContext);
};


// 전역관리를 위한 컴포넌트 추가 App.js를 감싸줘야 합니다....