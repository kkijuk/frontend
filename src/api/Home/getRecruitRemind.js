const apiUrl = 'https://api.kkijuk.com/dashboard/remind/recruit';

export const getRecruitRemind = async () => {
  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': '*/*',
      },
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
