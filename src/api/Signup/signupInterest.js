export const saveInterests = async (interestingList) => {
    try {
      console.log('Sending data to server:', { field: interestingList });
      const response = await fetch('https://api.kkijuk.com/member/field', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include", // 쿠키와 인증 정보를 함께 보냄

        body: JSON.stringify({ field: interestingList }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save interests');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error saving interests:', error);
      console.log('Interest list being sent:', interestingList);
      throw error;
    }
  };
  