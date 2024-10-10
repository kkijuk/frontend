import api from "../../Axios";

// [학력 항목 생성]
// 새로운 학력 정보를 생성합니다.
const createEducation = async (recordId, data) => {
    try {
        // console.log("전송할 데이터: ", data); (data 잘 들어왔는 지.. 확인용)
        const response = await api.post(`/history/resume/education?recordId=${recordId}`, data);
        console.log("Success - createEducation: ",response.data.data);

        return response.data.data;
        
    } catch (error) {
        console.error('Error-createEducation:', error);
        if (error.response) {
            // 서버 응답이 있는 경우
            console.error('Server responded with status code:', error.response.status);
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

// [학력 항목 수정]
const updateEducation = async (educationId, data) => {
    try {
        // console.log("전송할 데이터: ", data);
        const response = await api.patch(`/history/resume/education?educationId=${educationId}`, data);
        console.log("Success - updateEducation:",response.data);

        return response.data.data;
        
    } catch (error) {
        console.error('Error creating education:', error);
        if (error.response) {
            // 서버 응답이 있는 경우
            console.error('Server responded with status code:', error.response.status);
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

//[학력 항목 삭제]
const deleteEducation = async (educationId) => {
    try {
        const response = await api.delete(`/history/resume/education?educationId=${educationId}`);
        console.log("Success-deleteEducation", response.data);
    } catch (error) {
        console.error('Error deleting education:', error);
        if (error.response) {
            // 서버 응답이 있는 경우
            console.error('Server responded with status code:', error.response.status);
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


export default {createEducation, updateEducation, deleteEducation}
