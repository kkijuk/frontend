import api from "../../Axios";

const createMaster =async()=>{
    try{
        const newData = {
            "oneLiner": "마스터 자기소개서",
            "motiveTitle": "지원동기",
            "motive": "내용을 작성해주세요!",
            "prosAndConsTitle": "장단점",
            "prosAndCons": "내용을 작성해주세요!",
            "jobSuitabilityTitle": "직무적합성",
            "jobSuitability": "내용을 작성해주세요!"
          }
        const response = await api.post('/history/intro/master', newData);
        console.log("Master 자소서 생성: ", response.data);
    }catch(error){
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
}

export default createMaster;