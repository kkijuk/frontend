import api from "../../Axios";

//지원 예정이지만, 아직 자기소개서는 생성하지 않은 공고들의 리스트를 보여줍니다.

const readIntroList = async ()=>{
    try{
        const response = await api.get(`/history/intro/list`);
        console.log("Success-readIntroList: ", response.data);
        return response.data;
    }catch(error){
        console.error("Error-readIntroList: ", error);
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