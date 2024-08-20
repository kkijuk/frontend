const apiUrl = 'https://api.kkijuk.com/recruit';

export const getRecruitDetails = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        credentials: "include", // 쿠키와 인증 정보를 함께 보냄

        'accept': '*/*'
      }
    });

    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`Recruit에서 ID ${id}를 찾을 수 없습니다.`);
        return null; // ID를 찾지 못한 경우 null 반환
      }
      const errorData = await response.json();
      throw new Error(errorData.message || 'Something went wrong');
    }

    const responseData = await response.json();
    console.log('Recruit details for ID', id, ':', responseData); // 로그 추가
    return { ...responseData, id }; // id 필드 추가
  } catch (error) {
    console.error("Error fetching recruit details:", error.message);
    return null; // 에러 발생 시 null 반환
  }
};