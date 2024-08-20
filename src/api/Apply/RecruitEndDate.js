export const getRecruitListEndDate = async (date) => {
  if (!date) {
      console.error("No date provided for API request");
      throw new Error("Date parameter is required");
  }

  const apiUrl = `https://api.kkijuk.com/recruit/list/end?date=${encodeURIComponent(date)}`;
  console.log('Fetching recruit list for end date:', apiUrl);

  try {
      const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json; charset=utf-8',
              'accept': '*/*'
          }
      });

      if (!response.ok) {
          console.error('API response error:', response.status, response.statusText);
          throw new Error('Failed to fetch recruit list for end date');
      }

      const data = await response.json();
      console.log('Recruit list fetched:', data);

      return data.recruits;
  } catch (error) {
      console.error("Error fetching recruit list for end date:", error.message);
      throw error;
  }
};

  