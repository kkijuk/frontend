export const createRecruit = async (data) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/recruit`, { 
      credentials: "include", // 쿠키와 인증 정보를 함께 보냄
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Something went wrong');
    }

    const responseData = await response.json();

    // 응답 데이터가 기대하는 형식인지 확인
    if (!responseData || !responseData.id) {
      throw new Error('Invalid response format');
    }

    return responseData;
  } catch (error) {
    console.error("Error creating recruit:", error.message);
    throw error;
  }
};
