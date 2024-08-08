export const updateRecruit = async (recruitId, updatedJob) => {
    const response = await fetch(`/recruit/${recruitId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedJob)
    });
  
    if (!response.ok) {
      throw new Error('Failed to update job');
    }
  
    return response.json();
  };
  
  // 마찬가지로 수정이 필요한 공고 수정 api