import api from '../../Axios';

export const getUserInfo = async (token) => {
    try {
        const response = await api.get('/dashboard/user-info', {
            headers: {
                Authorization: `Bearer ${token}`, // 요청 헤더에 토큰 추가
            },
        });
        //console.log('사용자 정보:', response.data);
        return response.data;
    } catch (error) {
        //console.error('Error fetching user info:', error.message);
        return null;
    }
};
