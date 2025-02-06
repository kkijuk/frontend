import { create } from 'zustand';

const useAuthStore = create((set) => ({
    token: null,
    refreshToken: null,
    isLoggedIn: false,

    //  초기 상태 복원 (유효한 토큰인지 확인)
    restoreState: () => {
        const token = localStorage.getItem('token');
        const refreshToken = localStorage.getItem('refreshToken');

        //  토큰이 존재하는 경우만 설정 (만료된 토큰 방지)
        if (token) {
            set({ token, refreshToken, isLoggedIn: true });
        } else {
            set({ token: null, refreshToken: null, isLoggedIn: false });
        }
    },

    //  로그인 시 토큰 저장
    login: (token, refreshToken) => {
        if (token) localStorage.setItem('token', token);
        if (refreshToken) localStorage.setItem('refreshToken', refreshToken);

        set({
            token,
            refreshToken,
            isLoggedIn: true,
        });
    },

    //  로그아웃 시 토큰 제거
    logout: () => {
        console.log('🔹 useAuthStore: 로그아웃 상태로 전환');
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');

        set({
            token: null,
            refreshToken: null,
            isLoggedIn: false,
        });
    },

    //  액세스 토큰 갱신
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

//  앱 초기화 시 상태 복원 (이제는 유효한 토큰만 복원)
useAuthStore.getState().restoreState();

//  localStorage 변경 감지 → 불필요한 재설정 방지
if (typeof window !== 'undefined') {
    window.addEventListener('storage', (event) => {
        if (event.key === 'token' || event.key === 'refreshToken') {
            useAuthStore.getState().restoreState();
        }
    });
}
