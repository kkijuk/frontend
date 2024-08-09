export const updateRecruit = async (recruitId, updatedJob) => {
  const response = await fetch(`https://api.kkijuk.com/recruit/${recruitId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: updatedJob.title || null,
      startTime: updatedJob.startTime || null,
      endTime: updatedJob.endTime || null,
      status: updatedJob.status || null,
      tags: updatedJob.tags.length > 0 ? updatedJob.tags : null,
      link: updatedJob.link || null,
    })
  });

  if (!response.ok) {
    const errorMessage = await response.text(); // 서버에서 반환한 에러 메시지 확인
    console.error('Error message from server:', errorMessage);
    throw new Error('Failed to update job');
  }

  return response.json();
};

