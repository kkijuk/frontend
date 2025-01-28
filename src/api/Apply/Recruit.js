import api from '../../Axios';

export const createRecruit = async (data) => {
    try {
        const response = await api.post('/recruit', data, {
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        });

        // 응답 데이터 형식 확인
        if (!response.data || !response.data.id) {
            throw new Error('Invalid response format');
        }

        return response.data; // 성공적으로 생성된 데이터 반환
    } catch (error) {
        console.error('Error creating recruit:', error.message);
        throw error; // 에러는 호출한 곳에서 처리
    }
};
