import axios from "axios";

export const AddDetail = async (careerId, data) => {
    try {
        console.log("저장할 데이터:",data);
        console.log("careerId:",careerId);

        const response = await axios.post(
          `https://api.kkijuk.com/career/${careerId}`,
          data,
          {
            headers: {
              'Content-Type': 'application/json; charset=utf-8'
            }
          }
        );
        console.log("통신 완료 : ", response.data);
      } catch (error) {
        console.log("Error", error.message);
        if(error.response){
          console.log("서버 오류 응답 데이터:", error.response.data);
          console.log("서버 오류 상태 코드:", error.response.status);
          console.log("서버 오류 헤더:", error.response.headers);

        }
      }
      
};


