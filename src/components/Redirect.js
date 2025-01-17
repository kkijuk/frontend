import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const KakaoRedirect = () => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get('code');

  useEffect(() => {
    console.log("인가 코드:", code);
    
    if (code) {
      fetch(`${process.env.REACT_APP_API_URL}/auth/kakao/login?code=${code}`, {
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
          console.log('로그인 성공:', data);
          if (data && data.jwt) {
            localStorage.setItem('token', data.jwt);
            navigate('/home');
          } else {
            console.error('JWT 토큰이 없습니다.');
          }
        })
        .catch((error) => {
          console.error('로그인 실패:', error.message);
          alert(`로그인 처리 중 문제가 발생했습니다: ${error.message}`);
        });
      
    }
  }, [code, navigate]);

  return <h1>로그인 중입니다...</h1>;
};

export default KakaoRedirect;
