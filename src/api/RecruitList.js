// src/api/RecruitList.js

const apiUrl = 'http://43.203.222.231/recruit';

export const getRecruitsByEndDate = async (date) => {
  try {
    const response = await fetch(`${apiUrl}/list/end?date=${date}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Something went wrong');
    }

    const responseData = await response.json();
    console.log("API Response Data:", responseData); // 응답 데이터 로그 출력
    return responseData.recruits;
  } catch (error) {
    console.error("Error fetching recruits by end date:", error.message);
    throw error;
  }
};


