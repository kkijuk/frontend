import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '../stores/useAuthStore';

const useAuthRedirect = () => {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuthStore();

    useEffect(() => {
        const path = window.location.pathname; // ✅ location.pathname 직접 가져오기

        if (!isLoggedIn) {
            navigate('/');
        } else if (path === '/') {
            navigate('/home');
        }
    }, [isLoggedIn, navigate]);
};

export default useAuthRedirect;
