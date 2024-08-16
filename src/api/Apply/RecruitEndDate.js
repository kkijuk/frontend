export const getRecruitListEndDate = async (date) => {
    const apiUrl = `https://api.kkijuk.com/recruit/list/end?date=${encodeURIComponent(date)}`;
  
    try {
      console.log('Fetching recruit list for end date:', date);
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'accept': '*/*'
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch recruit list for end date');
      }
  
      const data = await response.json();
      console.log('Recruit list fetched:', data);
  
      return data.recruits;
    } catch (error) {
      console.error("Error fetching recruit list for end date:", error);
      throw error;
    }
};

  