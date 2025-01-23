import api from '../../Axios'; 

export const getRecruitDetails = async (id) => {
  if (!id) {
    console.error('No ID provided for API request');
    throw new Error('ID parameter is required');
  }

  try {
    // Axios로 GET 요청
    const response = await api.get(`/recruit/${id}`);

    console.log('Recruit details for ID', id, ':', response.data);

    return { ...response.data, id }; // id 필드 추가하여 반환
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.warn(`Recruit에서 ID ${id}를 찾을 수 없습니다.`);
      return null; // ID를 찾지 못한 경우 null 반환
    }

    console.error('Error fetching recruit details:', error.message);
    throw error; // 다른 에러는 그대로 throw
  }
};
