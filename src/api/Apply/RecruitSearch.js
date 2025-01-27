import api from '../../Axios';

export const fetchRecruitList = async (keyword) => {
    try {
        const response = await api.get('/recruit', {
            params: { keyword }, // 쿼리 파라미터 전달
        });
        return response.data; // 응답 데이터 반환
    } catch (error) {
        console.error('Error fetching recruit list:', error);
        throw error;
    }
};
