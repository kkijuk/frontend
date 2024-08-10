export const updateRecruitStatus = async (recruitId, status) => {
    try {
      const response = await fetch(`https://api.kkijuk.com/recruit/${recruitId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      });
  
      if (!response.ok) {
        throw new Error('Failed to update status');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error updating status:', error);
      throw error;
    }
  };
  