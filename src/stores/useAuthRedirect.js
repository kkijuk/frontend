import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../stores/useAuthStore';

const useAuthRedirect = () => {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuthStore();
    
    useEffect(() => {
        const path = window.location.pathname; //  현재 경로 가져오기
        const isManualLogout = sessionStorage.getItem('manualLogout'); // ✅ 직접 로그아웃했는지 확인

        if (!isLoggedIn) {
            if (!isManualLogout) {
                alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
            }
            sessionStorage.removeItem('manualLogout'); //  메시지 한 번만 뜨게 초기화
            navigate('/');
        } else if (path === '/') {
            navigate('/home');
        }
    }, [isLoggedIn, navigate]);
};

export default useAuthRedirect;
