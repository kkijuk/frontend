import api from '../../Axios';
import useAuthStore from '../../stores/useAuthStore';

export const logout = async () => {
    try {
        const { token, logout } = useAuthStore.getState();

        if (!token) {
            console.warn('이미 로그아웃된 상태입니다.');
            return;
        }

        //  로그아웃 API 요청 시 토큰 포함
        const response = await api.post('/logout', null, {
            headers: {
                Authorization: `Bearer ${token}`,
                accept: '*/*',
            },
        });

        if (response.status === 200 && response.data === 'logout success') {
            console.log('로그아웃 성공');
            
            //  useAuthStore에서 상태 초기화
            logout();

            return true;
        } else {
            throw new Error('Unexpected response format');
        }
    } catch (error) {
        console.error('로그아웃 오류:', error.message);
        throw new Error(error.message);
    }
};
