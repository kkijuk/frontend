import api from '../../Axios';

export const getRecruitListAfterDate = async (date) => {
    try {
        console.log('Fetching recruit list after date:', date); // 디버깅용 로그 추가

        const response = await api.get(`/recruit/list/after?time=${encodeURIComponent(date)}`);
        console.log('Recruit list fetched:', response.data); // 디버깅용 로그 추가

        // recruitData의 recruits 배열이 비어있는 경우 처리
        if (!response.data.recruits || response.data.recruits.length === 0) {
            console.warn('No recruits found after the specified date.');
        }

        return response.data;
    } catch (error) {
        console.error('Error fetching recruit list:', error);
        throw error;
    }
};
