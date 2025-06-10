import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../stores/useAuthStore';

const SocialRedirect = ({ provider }: { provider: 'kakao' | 'naver' }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [hasRequested, setHasRequested] = useState(false); 
  const login = useAuthStore((state) => state.login);

  const code = new URL(window.location.href).searchParams.get('code');
  const state = new URL(window.location.href).searchParams.get('state');
  const redirectUri = process.env.REACT_APP_KAKAO_REDIRECT_URI;

  const decodeToken = (token: string) => {
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
    if (!code || hasRequested) {
      setLoading(false);
      return;
    }

    setHasRequested(true); // 재요청 방지

    const apiUrl =
      provider === 'kakao'
        ? `${process.env.REACT_APP_API_URL}/auth/kakao/login?code=${code}&redirect_uri=${encodeURIComponent(redirectUri)}`
        : provider === 'naver'
        ? `${process.env.REACT_APP_API_URL}/auth/naver/login?code=${code}&state=${state}`
        : null;

    if (!apiUrl) {
      alert('지원하지 않는 로그인 방식입니다.');
      setLoading(false);
      return;
    }

    fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => {
            throw new Error(err.message || `HTTP ${res.status}`);
          });
        }
        return res.json();
      })
      .then((data) => {
        const { accessToken, refreshToken } = data;
        if (!accessToken || !refreshToken) {
          throw new Error('토큰이 누락되었습니다.');
        }

        const decoded = decodeToken(accessToken);
        const isProfileComplete = decoded?.isProfileComplete || false;

        login(accessToken, refreshToken, isProfileComplete);

         window.history.replaceState({}, document.title, window.location.pathname);

        navigate(isProfileComplete ? '/home' : '/signup');
      })
      .catch((err) => {
        alert(`${provider} 로그인 실패: ${err.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [code, state, provider, login, navigate, hasRequested]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div className="spinner">로그인 처리 중...</div>
      </div>
    );
  }

  return null;
};

export default SocialRedirect;
