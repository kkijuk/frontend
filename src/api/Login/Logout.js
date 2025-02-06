import axios from 'axios';

export const logout = async () => {
    try {
        const response = await api.post('/logout', null, {
            headers: {
                accept: '*/*',
            },
        });

        if (response.status === 200) {
            const resultText = response.data;

            if (resultText === 'logout success') {
                console.log('로그아웃 성공:', resultText);
                return true;
            } else {
                throw new Error('Unexpected response format');
            }
        } else {
            throw new Error('로그아웃 중 오류가 발생했습니다.');
        }
    } catch (error) {
        console.error('로그아웃 오류:', error.message);
        throw new Error(error.message);
    }
};
