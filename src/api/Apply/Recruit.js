import useAuthStore from '../stores/useAuthStore';
import { refreshAccessToken } from './refreshAccessToken'; // refreshAccessToken 경로를 적절히 설정

export const createRecruit = async (data) => {
    const { accessToken, logout } = useAuthStore.getState();

    try {
        let response = await fetch(`${process.env.REACT_APP_API_URL}/recruit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                Authorization: `Bearer ${accessToken}`, // 헤더에 토큰 포함
            },
            body: JSON.stringify(data),
        });

        // 토큰 만료 시 처리
        if (response.status === 401) {
            console.warn('Access token expired, refreshing token...');
            const refreshed = await refreshAccessToken();

            if (refreshed) {
                const { accessToken: newAccessToken } = useAuthStore.getState();

                // 재발급된 토큰으로 다시 요청
                response = await fetch(`${process.env.REACT_APP_API_URL}/recruit`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                        Authorization: `Bearer ${newAccessToken}`,
                    },
                    body: JSON.stringify(data),
                });
            } else {
                throw new Error('Unable to refresh token. Logging out.');
            }
        }

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Something went wrong');
        }

        const responseData = await response.json();

        // 응답 데이터 형식 확인
        if (!responseData || !responseData.id) {
            throw new Error('Invalid response format');
        }

        return responseData;
    } catch (error) {
        console.error('Error creating recruit:', error.message);
        logout(); // 네트워크 에러 또는 인증 실패 시 로그아웃 처리
        throw error;
    }
};
