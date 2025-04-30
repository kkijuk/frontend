import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../stores/useAuthStore'; 

const SocialRedirect = ({ provider }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const login = useAuthStore((state) => state.login); // zustand의 login 메서드 가져오기
  const code = new URL(window.location.href).searchParams.get('code');
  const state = new URL(window.location.href).searchParams.get('state');
  const redirectUri = process.env.REACT_APP_KAKAO_REDIRECT_URI;

  // 토큰 디코딩 함수
  const decodeToken = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      
      return null;
    }
  };

  useEffect(() => {
    if (!code) return;

    const apiUrl =
      provider === 'kakao'
        ? `${process.env.REACT_APP_API_URL}/auth/kakao/login?code=${code}&redirect_uri=${encodeURIComponent(redirectUri)}`
        : provider === 'naver'
        ? `${process.env.REACT_APP_API_URL}/auth/naver/login?code=${code}&state=${state}`
        : null;

    if (apiUrl) {
      fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((err) => {
              throw new Error(err.message || `HTTP error! status: ${response.status}`);
            });
          }
          return response.json();
        })
        .then((data) => {
          if (data && data.accessToken && data.refreshToken) {
            const { accessToken, refreshToken } = data;
            const decodedToken = decodeToken(accessToken);
            const isProfileComplete = decodedToken?.isProfileComplete || false;

            login(accessToken, refreshToken, isProfileComplete);

            if (isProfileComplete) {
              navigate('/home');
            } else {
              navigate('/signup');
            }
          }
        })
        .catch((error) => {
          alert(`${provider} 로그인 처리 중 문제가 발생했습니다: ${error.message}`);
        });
    }
  }, [code, state, provider, login, navigate]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  return null; // 로그인 중 화면 출력 제거
};

export default SocialRedirect;
