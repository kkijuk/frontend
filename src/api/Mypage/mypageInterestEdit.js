import axios from 'axios';

const APIURL = 'https://api.kkijuk.com/member/myPage/field';

export const mypageInterestEdit = async (interestsData) => {
  try {
    const response = await axios.post(
      APIURL,
      JSON.stringify(interestsData),
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      }
    );
    console.log("관심 분야 저장 완료:", response.data);
    return response.data;
  } catch (error) {
    console.error("관심 분야 저장 실패:", error.message);
    if (error.response) {
      console.error("서버 오류 응답 데이터:", error.response.data);
      console.error("서버 오류 상태 코드:", error.response.status);
      console.error("서버 오류 헤더:", error.response.headers);
    }
    throw error;
  }
};
