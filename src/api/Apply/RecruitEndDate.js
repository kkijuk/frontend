import api from '../../Axios';

export const getRecruitListEndDate = async (date) => {
    if (!date) {
        console.error('No date provided for API request');
        throw new Error('Date parameter is required');
    }

    try {
        const response = await api.get(`/recruit/list/end?date=${encodeURIComponent(date)}`);
        return response.data.recruits; // API 응답 데이터 중 "recruits" 반환
    } catch (error) {
        console.error('Error fetching recruit list for end date:', error.message);
        throw error;
    }
};
