import axios from "axios";

export const CareerDetailEdit = async (careerId, detailId, data) => {
    try {
        const response = await axios.put(
          `https://api.kkijuk.com/career/${careerId}/${detailId}`,
          data,
          
          {
            headers: {

              'Content-Type': 'application/json; charset=utf-8'
            },
            withCredentials: true, // 이 옵션을 설정하여 쿠키와 인증 정보를 함께 보냄

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


export const CareerDetailDelete = async (careerId, detailId) => {
  try {
      const response = await axios.delete(
        `https://api.kkijuk.com/career/${careerId}/${detailId}`,
        
        {
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          }
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




