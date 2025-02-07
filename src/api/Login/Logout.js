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
        const response = await api.post('/member/logout', null, {
            headers: {
                Authorization: `Bearer ${token}`,
                accept: '*/*',
            },
        });

        console.log('API 응답 데이터:', response.data); // ✅ 응답 로그 추가

        if (response.status === 200) {
            console.log('로그아웃 성공');
            
            // ✅ useAuthStore에서 상태 초기화 (로컬 스토리지에서 토큰 삭제)
            logout();
            console.log('스토어 로그아웃 실행 완료');

            return true;
        } else {
            throw new Error('Unexpected response format');
        }
    } catch (error) {
        console.error('로그아웃 오류:', error.message);
        throw new Error(error.message);
    }
};