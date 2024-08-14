export const getIntroduce = async () => {
  try {
      const response = await fetch('https://api.kkijuk.com/dashboard/introduce');
      if (response.ok) {
          const data = await response.json();
          console.log("목록",data);
          return data;
      } else {
          console.error('Failed to fetch data:', response.status);
          return null;
      }
  } catch (error) {
      console.error('Error fetching data:', error);
      return null;
  }
};
