import api from '../../Axios'; 

export const getRecruitRemind = async () => {
    try {
        const response = await api.get('/dashboard/remind/recruit'); 
        console.log('Recruit reminders:', response.data);

        return response.data.recruits; // recruits 데이터를 반환
    } catch (error) {
        if (error.response) {
            console.error('Error message from server:', error.response.data.message); // 서버 에러 메시지
        }
        console.error('Error fetching recruit reminders:', error.message);
        return []; // 에러 발생 시 빈 배열 반환
    }
};
