import api from '../../Axios';

export const updateRecruitStatus = async (recruitId, status) => {
    try {
        const response = await api.patch(`/recruit/${recruitId}/status`, { status });
        return response.data; // 응답 데이터 반환
    } catch (error) {
        console.error('Error updating status:', error);
        throw error;
    }
};
