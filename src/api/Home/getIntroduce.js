export const getIntroduce = async () => {
  try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/dashboard/introduce`, {
        credentials: "include", // 쿠키와 인증 정보를 함께 보냄
      });
      
      if (response.ok) {
          const data = await response.json();
          console.log("목록", data);
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
