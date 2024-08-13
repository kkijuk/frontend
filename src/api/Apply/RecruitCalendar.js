export const getRecruitCalendar = async (year, month) => {
    try {
      const response = await fetch(`https://api.kkijuk.com/recruit/calendar?year=${year}&month=${month}`);
      if (!response.ok) {
        throw new Error('Failed to fetch recruit calendar data');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching recruit calendar data:', error);
      throw error;
    }
  };
  
