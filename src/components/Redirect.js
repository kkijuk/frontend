import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../stores/useAuthStore'; // zustand 상태 관리 import

const SocialRedirect = ({ provider }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const login = useAuthStore((state) => state.login); // zustand의 login 메서드 가져오기
  const code = new URL(window.location.href).searchParams.get('code');
  const state = new URL(window.location.href).searchParams.get('state');

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
      console.error('토큰 디코딩 중 오류 발생:', error);
      return null;
    }
  };

  useEffect(() => {
    if (!code) {
      console.error('인가 코드가 없습니다.');
      return;
    }

    const apiUrl =
      provider === 'kakao'
        ? `${process.env.REACT_APP_API_URL}/auth/kakao/login?code=${code}`
        : provider === 'naver'
        ? `${process.env.REACT_APP_API_URL}/auth/naver/login?code=${code}&state=${state}`
        : null;

    if (apiUrl) {
      fetch(apiUrl, {
        method: 'GET',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
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
          console.log(`${provider} 로그인 성공:`, data);

          if (data && data.Token) {
            const { accessToken, refreshToken } = data.Token;

            // 토큰 디코딩
            const decodedToken = decodeToken(accessToken);
            console.log('디코딩된 토큰:', decodedToken);

            // zustand를 이용해 토큰 저장
            login(accessToken, refreshToken);

            // 프로필 완료 여부 확인 (디코딩된 토큰에서 직접 확인)
            if (decodedToken?.isProfileComplete) {
              navigate('/home'); // 홈 화면으로 리다이렉트
            } else {
              navigate('/signup'); // 추가 정보 입력 페이지로 리다이렉트
            }
          } else {
            console.error('토큰이 없습니다.');
          }
        })
        .catch((error) => {
          console.error(`${provider} 로그인 실패:`, error.message);
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
