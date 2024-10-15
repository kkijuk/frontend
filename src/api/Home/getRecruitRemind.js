export const getRecruitRemind = async () => {
  const apiUrl = `${process.env.REACT_APP_API_URL}/dashboard/remind/recruit`; 

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': '*/*',
      },
      credentials: "include", // 쿠키와 인증 정보를 함께 보냄
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Something went wrong');
    }

    const responseData = await response.json();
    console.log('Recruit reminders:', responseData);

    return responseData.recruits;
  } catch (error) {
    console.error('Error fetching recruit reminders:', error.message);
    return [];
  }
};
