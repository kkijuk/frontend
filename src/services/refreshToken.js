import useAuthStore from '../stores/useAuthStore';

export const refreshAccessToken = async () => {
    const { refreshToken, updateAccessToken, logout } = useAuthStore.getState();

    if (!refreshToken) {
        logout();
        return false;
    }

    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/member/refreshToken`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken }),
        });

        if (response.ok) {
            const data = await response.json();
            const { accessToken, refreshToken: newRefreshToken } = data;

            // 새 토큰 저장
            updateAccessToken(accessToken, newRefreshToken);

            return true;
        } else {
            console.error('Failed to refresh token:', response.status);
            logout();
            return false;
        }
    } catch (error) {
        console.error('Error refreshing token:', error);
        logout();
        return false;
    }
};
