import api from "../../Axios";

const readRecord = async () => {
    try {
        const response = await api.get('/history/resume/', {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        console.log('Response Data:', response.data);  

        return response.data.data;
    } catch (error) {
        console.error('Error fetching record:', error); 

        console.error('Full Error Object:', error);

        if (error.response) {
            // 서버 응답이 있는 경우
            console.error('Server responded with status code:', error.response.status);
            console.error('Response Headers:', error.response.headers);
            console.error('Response Data:', error.response.data);
        } else if (error.request) {
            // 요청이 보내졌지만 응답을 받지 못한 경우
            console.error('No response received. Request details:', error.request);
        } else {
            // 요청 설정 중에 오류가 발생한 경우
            console.error('Error setting up request:', error.message);
        }

        // 요청 URL 및 기타 디버깅 정보를 추가로 출력
        console.error('Request Config:', error.config);
    }
};

export default readRecord;
