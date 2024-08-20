import axios from "axios";

export const CareerEdit = async (careerId, data) => {
    try {
        const response = await axios.patch(
          `https://api.kkijuk.com/career/${careerId}`,
          data,
          
          {
            headers: {

              'Content-Type': 'application/json; charset=utf-8'
            },
             // 이 옵션을 설정하여 쿠키와 인증 정보를 함께 보냄

          }
        );
        console.log("CareerDetailEdit.js 원래 데이터 출력 : ", response.data);
        return response.data;
      } catch (error) {
        console.log("Error", error.message);
        if(error.response){
          console.log("서버 오류 응답 데이터:", error.response.data);
          console.log("서버 오류 상태 코드:", error.response.status);
          console.log("서버 오류 헤더:", error.response.headers);

        }
      }
      
};


export const CareerDelete = async (careerId) => {
  try {
      const response = await axios.delete(
        `https://api.kkijuk.com/career/${careerId}`,
        
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          }
        }
      );
      console.log("CareerEdit.js 원래 데이터 출력 : ", response.data);
      return response.data;
    } catch (error) {
      console.log("Error", error.message);
      if(error.response){
        console.log("서버 오류 응답 데이터:", error.response.data);
        console.log("서버 오류 상태 코드:", error.response.status);
        console.log("서버 오류 헤더:", error.response.headers);

      }
    }
    
};




