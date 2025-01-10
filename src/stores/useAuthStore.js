import { create } from 'zustand';

const useAuthStore = create((set) => ({
    token: localStorage.getItem('token') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
    isLoggedIn: !!localStorage.getItem('token'),

    // 로그인 시 토큰 저장
    login: (token, refreshToken) => {
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
        set({
            token: token,
            refreshToken: refreshToken,
            isLoggedIn: true,
        });
    },

    // 로그아웃 시 토큰 제거
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        set({
            token: null,
            refreshToken: null,
            isLoggedIn: false,
        });
    },

    // 액세스 토큰 갱신
    updateAccessToken: (newAccessToken, newRefreshToken) => {
        if (newAccessToken) {
            localStorage.setItem('token', newAccessToken);
            set({ token: newAccessToken });
        }

        if (newRefreshToken) {
            localStorage.setItem('refreshToken', newRefreshToken);
            set({ refreshToken: newRefreshToken });
        }
    },
}));

export default useAuthStore;
