const apiUrl = 'https://api.kkijuk.com/recruit';

export const getRecruitDetails = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'accept': '*/*'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (response.status === 404) {
        
        return null; // 공고가 없을 때 null 반환
      }
      throw new Error(errorData.message || 'Something went wrong');
    }

    const responseData = await response.json();
    console.log('Recruit details for ID', id, ':', responseData); // 로그 추가
    return { ...responseData, id }; // id 필드 추가
  } catch (error) {
    console.error("Error fetching recruit details:", error.message);
    throw error;
  }
};









