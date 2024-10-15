export const ReviewAdd = async (recruitId, reviewData) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/recruit/${recruitId}/review`, {
        method: 'POST',
        headers: {

          'Content-Type': 'application/json',
        },
        credentials: "include", 
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
  