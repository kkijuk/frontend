import useAuthStore from '../stores/useAuthStore';
import { refreshAccessToken } from './refreshAccessToken'; // refreshAccessToken 경로는 적절히 설정

export const getRecruitCalendar = async (year, month) => {
    const { accessToken, logout } = useAuthStore.getState();

    try {
        let response = await fetch(
            `${process.env.REACT_APP_API_URL}/recruit/calendar?year=${year}&month=${month}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`, // 헤더에 액세스 토큰 추가
                },
            }
        );

        // 토큰이 만료되었을 경우 처리
        if (response.status === 401) {
            console.warn('Access token expired, refreshing token...');
            const refreshed = await refreshAccessToken();

            if (refreshed) {
                const { accessToken: newAccessToken } = useAuthStore.getState();

                // 재발급된 토큰으로 다시 요청
                response = await fetch(
                    `${process.env.REACT_APP_API_URL}/recruit/calendar?year=${year}&month=${month}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${newAccessToken}`,
                        },
                    }
                );
            } else {
                throw new Error('Unable to refresh token. Logging out.');
            }
        }

        if (!response.ok) {
            throw new Error('Failed to fetch recruit calendar data');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching recruit calendar data:', error);
        logout(); // 네트워크 에러 또는 인증 실패 시 로그아웃 처리
        throw error;
    }
};
