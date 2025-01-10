import useAuthStore from '../stores/useAuthStore';

export const refreshAccessToken = async () => {
    const { refreshToken, updateAccessToken, logout } = useAuthStore.getState();

    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/member/refreshToken`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken: refreshToken }),
        });

        if (response.ok) {
            const data = await response.json();
            const { accessToken, refreshToken: newRefreshToken } = data;

            // 상태 업데이트
            updateAccessToken(accessToken, newRefreshToken);

            return true; // 성공적으로 토큰을 재발급받음
        } else {
            console.error('Failed to refresh token:', response.status);
            logout(); // 토큰 갱신 실패 시 로그아웃 처리
            return false;
        }
    } catch (error) {
        console.error('Error refreshing token:', error);
        logout(); // 네트워크 에러 발생 시 로그아웃 처리
        return false;
    }
};
