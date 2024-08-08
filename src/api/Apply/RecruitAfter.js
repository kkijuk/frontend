const apiUrl = 'https://api.kkijuk.com/recruit';

export const getRecruitAfter = async (time) => {
  try {
    // 시간 변환: "YYYY-MM-DDTHH:mm:ss" 형식으로 변환
    const formattedTime = new Date(time).toISOString().split('.')[0];
    const response = await fetch(`${apiUrl}/list/after?time=${formattedTime}`, {
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
    console.log('Recruits after time:', responseData); // 로그 추가
    return responseData.outputs.reduce((acc, output) => acc.concat(output.recruits), []);
  } catch (error) {
    console.error("Error fetching recruits after time:", error.message);
    throw error;
  }
};
// 테스트중인 api
