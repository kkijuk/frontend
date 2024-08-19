export const ReviewAdd = async (recruitId, reviewData) => {
    try {
      const response = await fetch(`https://api.kkijuk.com/recruit/${recruitId}/review`, {
        method: 'POST',
        headers: {
          credentials: "include", // 쿠키와 인증 정보를 함께 보냄

          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add review');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error adding review:', error);
      throw error;
    }
  };
  