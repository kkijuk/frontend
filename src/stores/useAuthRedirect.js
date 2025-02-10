import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../stores/useAuthStore';

const useAuthRedirect = () => {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuthStore();
    const [isInitialized, setIsInitialized] = useState(false); //  초기화 여부 확인

    useEffect(() => {
        // ✅ Zustand 스토어에서 로그인 상태를 가져오는 로직이 완료될 때까지 기다림
        if (!isInitialized) {
            useAuthStore.getState().restoreState();
            setIsInitialized(true);
            return;
        }

        const path = window.location.pathname;
        const isManualLogout = sessionStorage.getItem('manualLogout');

        if (isLoggedIn === false) {
            if (!isManualLogout) {
                alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
            }
            sessionStorage.removeItem('manualLogout');
            navigate('/');
        } else if (isLoggedIn === true && path === '/') {
            navigate('/home');
        }
    }, [isLoggedIn, navigate, isInitialized]);
};

export default useAuthRedirect;
