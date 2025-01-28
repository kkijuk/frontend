import api from '../../Axios';

export const updateRecruitApplyDate = async (recruitId, applyDate) => {
    try {
        const response = await api.patch(`/recruit/${recruitId}/apply-date`, { applyDate });
        return response.data; // 응답 데이터 반환
    } catch (error) {
        console.error('Error updating apply date:', error);
        throw error;
    }
};
