export const saveInterests = async (interestList) => {
    try {
      const response = await fetch('https://api.kkijuk.com/member/field', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ field: interestList }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save interests');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error saving interests:', error);
      throw error;
    }
  };
  