import api from '../../Axios';

export const getValidRecruitList = async (date) => {
    try {
        console.log('Fetching valid recruit list after date:', date); // 디버깅용 로그 추가

        const response = await api.get(`/recruit/list/valid?time=${encodeURIComponent(date)}`);
        console.log('Valid recruit list fetched:', response.data); // 디버깅용 로그 추가

        // 데이터 구조 확인 및 반환
        return response.data;
    } catch (error) {
        console.error('Error fetching valid recruit list:', error);
        throw error;
    }
};
