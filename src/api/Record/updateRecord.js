import api from "../../Axios";

const updateRecord = async (id, data) => {
    try {
        const response = await api.patch(`/history/resume/?recordId=${id}`, data);
        console.log(response.data);

        return response.data;
    } catch (error) {
        console.error('Error updating record:', error);
        if (error.response) {
            // 서버 응답이 있는 경우
            console.error('Server responded with:', error.response.data);
        } else if (error.request) {
            // 요청이 전송되었으나 응답을 받지 못한 경우
            console.error('No response received:', error.request);
        } else {
            // 요청 설정 중에 발생한 에러
            console.error('Error setting up request:', error.message);
        }
    }
};

export default updateRecord;
