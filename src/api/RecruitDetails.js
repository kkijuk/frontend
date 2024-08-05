// src/api/RecruitDetails.js

const apiUrl = 'http://43.203.222.231/recruit';

export const getRecruitDetails = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
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
    return responseData;
  } catch (error) {
    console.error("Error fetching recruit details:", error.message);
    throw error;
  }
};

