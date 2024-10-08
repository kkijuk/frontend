import api from "../../Axios";

const createAward = async(recordId, data)=>{
    try{
        const response = await api.post(`/history/resume/award?recordId=${recordId}`, data);
        console.log('Success-createAward:', response.data);
        return response.data
    }catch(error){
        console.error("Error-createAward: ", error);
        if(error.response){
            //서버 응답이 있는 경우
            console.error('Server responded with status code: ',error.response.status);
            console.error('Server responded with:', error.response.data);
        } else if(error.request){
            //요청이 보내졌지만 응답을 받지 못한 경우
            console.error('No response received: ',error.request);
        } else{
            //요청 설정 중에 오류가 발생한 경우
            console.error('Error setting up request: ', error.message);
        }
    }
}

const updateAward = async(awardId, data) => {
    try {
        const response = await api.patch(`/history/resume/award?awardId=${awardId}`, data); 
        console.log('Success-updateAward:', response.data);
        return response.data;
    } catch (error) {
        console.error("Error-updateAward: ", error);
        if (error.response) {
            // 서버 응답이 있는 경우
            console.error('Server responded with status code: ', error.response.status);
            console.error('Server responded with:', error.response.data);
        } else if (error.request) {
            // 요청이 보내졌지만 응답을 받지 못한 경우
            console.error('No response received: ', error.request);
        } else {
            // 요청 설정 중에 오류가 발생한 경우
            console.error('Error setting up request: ', error.message);
        }
    }
}

const deleteAward = async(awardId) => {
    try {
        const response = await api.delete(`/history/resume/award?awardId=${awardId}`);
        console.log('Success-deleteAward:', response.data);
        return response.data;
    } catch (error) {
        console.error("Error-deleteAward: ", error);
        if (error.response) {
            // 서버 응답이 있는 경우
            console.error('Server responded with status code: ', error.response.status);
            console.error('Server responded with:', error.response.data);
        } else if (error.request) {
            // 요청이 보내졌지만 응답을 받지 못한 경우
            console.error('No response received: ', error.request);
        } else {
            // 요청 설정 중에 오류가 발생한 경우
            console.error('Error setting up request: ', error.message);
        }
    }
}

export {createAward, updateAward, deleteAward}