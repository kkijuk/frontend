import api from '../../Axios'; 

export const createRecruit = async (data) => {
  if (!data) {
    console.error('Recruit data is required for creation');
    throw new Error('Recruit data is required');
  }

  try {
    console.log('Creating recruit with data:', data); // 디버깅용 로그 추가

    // Axios POST 요청
    const response = await api.post('/recruit', data);

    console.log('Recruit created successfully:', response.data); // 디버깅용 로그 추가

    // 응답 데이터 확인
    if (!response.data || !response.data.id) {
      throw new Error('Invalid response format');
    }

    return response.data; // 생성된 Recruit 데이터 반환
  } catch (error) {
    console.error('Error creating recruit:', error.message);
    throw error;
  }
};
