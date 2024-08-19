const apiUrl = 'https://api.kkijuk.com/recruit';

export const deleteRecruit = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: 'DELETE',
      credentials: "include", // 쿠키와 인증 정보를 함께 보냄

      headers: {

        'Content-Type': 'application/json; charset=utf-8'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Something went wrong');
    }

    return response.json();
  } catch (error) {
    console.error("Error deleting recruit:", error.message);
    throw error;
  }
};
