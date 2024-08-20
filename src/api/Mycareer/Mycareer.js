import axios from "axios";
const apiUrl = 'https://api.kkijuk.com/career';

export const addCareer = async (addCareerData) => {
    try {
        console.log(addCareerData);
        const response = await axios.post(
          "https://api.kkijuk.com/career",
          JSON.stringify(addCareerData),
          {
            withCredentials: true,

            headers: {

              'Content-Type': 'application/json; charset=utf-8'
            },

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


