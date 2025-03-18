import { create } from 'zustand';

const useAuthStore = create((set) => ({
    token: null,
    refreshToken: null,
    isLoggedIn: false,

    // 초기 상태 복원
    restoreState: () => {
        const token = localStorage.getItem('token') || "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIzOTA2OTA1MTk3IiwiaWF0IjoxNzQyMjgxMzI0LCJleHAiOjE3NDIyODQ5MjQsImlzUHJvZmlsZUNvbXBsZXRlIjp0cnVlfQ.p4y9KBLtN1F7PPFEr1SVVGVx0zCdyhSDyMf6vAWA3ZE";
        const refreshToken = localStorage.getItem('refreshToken') || "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzOTA2OTA1MTk3IiwianRpIjoiZmJmNTQ2YTMtYTQ4Zi00ZmQ0LTgyOTktYThiN2YyMGRiYTU2IiwiaWF0IjoxNzQyMjgxMzI0LCJleHAiOjE3NDIzNjc3MjR9.kFImdMCjoCLES1yN5rfM6BLOI7zGusAWw6ad21TIKFI";
        set({
            token: token || null,
            refreshToken: refreshToken || null,
            isLoggedIn: !!token,
        });
    },

    // 로그인 시 토큰 저장
    login: (token, refreshToken) => {
        if (token) localStorage.setItem('token', token);
        if (refreshToken) localStorage.setItem('refreshToken', refreshToken);

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

// **앱 초기화 시 상태 복원**
useAuthStore.getState().restoreState();

// **localStorage 변경 감지 추가**
if (typeof window !== 'undefined') {
    window.addEventListener('storage', () => {
        useAuthStore.getState().restoreState();
    });
}
