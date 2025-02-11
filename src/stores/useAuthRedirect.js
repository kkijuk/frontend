import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../stores/useAuthStore';

const useAuthRedirect = () => {
    const navigate = useNavigate();
    const { isLoggedIn, restoreState } = useAuthStore();

    useEffect(() => {
        restoreState(); // ✅ 초기 로그인 상태 복원
        const path = window.location.pathname;
        const isManualLogout = sessionStorage.getItem('manualLogout');

        if (!isLoggedIn) {
            if (!isManualLogout) {
                alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
            }
            sessionStorage.removeItem('manualLogout');
            navigate('/');
        } else if (path === '/') {
            navigate('/home');
        }
    }, [isLoggedIn, navigate, restoreState]); // ✅ `restoreState`를 의존성 배열에 추가
};

export default useAuthRedirect;
