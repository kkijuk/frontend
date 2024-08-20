import api from "../../Axios";

const createEducation = async (recordId, data) => {
    try {
        console.log(data);
        const response = await api.post(`/history/resume/education?recordId=${recordId}`, data);
        console.log(response.data);

        return response.data.data;
        
    } catch (error) {
        console.error('Error creating education:', error);
        if (error.response) {
            // 서버 응답이 있는 경우
            console.error('Server responded with:', error.response.data);
        } else if (error.request) {
            // 요청이 보내졌지만 응답을 받지 못한 경우
            console.error('No response received:', error.request);
        } else {
            // 요청 설정 중에 오류가 발생한 경우
            console.error('Error setting up request:', error.message);
        }
    }
};

export default createEducation;
