export const getCalendarData = async (year, month) => {
    try {
      const response = await fetch(`https://api.kkijuk.com/recruit/calendar?year=${year}&month=${month}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch calendar data');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching calendar data:', error);
      return null;
    }
  };
  
