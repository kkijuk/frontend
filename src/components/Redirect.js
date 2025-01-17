import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../stores/useAuthStore'; // zustand 상태 관리 import

const SocialRedirect = ({ provider }) => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login); // zustand의 login 메서드 가져오기
  const code = new URL(window.location.href).searchParams.get('code');
  const state = new URL(window.location.href).searchParams.get('state');

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

            // zustand를 이용해 토큰 저장
            login(accessToken, refreshToken);

            // 홈 화면으로 리다이렉트
            navigate('/home');
          } else {
            console.error('토큰이 없.');
          }
        })
        .catch((error) => {
          console.error(`${provider} 로그인 실패:`, error.message);
          alert(`${provider} 로그인 처리 중 문제가 발생했습니다: ${error.message}`);
        });
    }
  }, [code, state, provider, login, navigate]);

  return <h1>로그인 중입니다...</h1>;
};

export default SocialRedirect;
