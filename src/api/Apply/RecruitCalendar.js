import api from '../../Axios';

export const getRecruitCalendar = async (year, month) => {
    try {
        const response = await api.get(`/recruit/calendar?year=${year}&month=${month}`);
        return response.data; // API 응답 데이터 반환
    } catch (error) {
        console.error('Error fetching recruit calendar data:', error);
        throw error;
    }
};
