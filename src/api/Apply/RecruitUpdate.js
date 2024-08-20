export const updateRecruit = async (recruitId, updatedJob) => {
  // 로컬 시간을 'YYYY-MM-DD HH:mm' 형식으로 변환하면서 9시간을 뺌
  const formatToServerTime = (dateTime) => {
    const localDate = new Date(dateTime);
    
  
    localDate.setHours(localDate.getHours() - 9);

    const year = localDate.getFullYear();
    const month = String(localDate.getMonth() + 1).padStart(2, '0');
    const day = String(localDate.getDate()).padStart(2, '0');
    const hours = String(localDate.getHours()).padStart(2, '0');
    const minutes = String(localDate.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const response = await fetch(`https://api.kkijuk.com/recruit/${recruitId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      credentials: "include", // 쿠키와 인증 정보를 함께 보냄

    },
    body: JSON.stringify({
      title: updatedJob.title || null,
      startTime: updatedJob.startTime ? formatToServerTime(updatedJob.startTime) : null,
      endTime: updatedJob.endTime ? formatToServerTime(updatedJob.endTime) : null,
      status: updatedJob.status || null,
      tags: updatedJob.tags.length > 0 ? updatedJob.tags : null,
      link: updatedJob.link || null,
    }),
  });

  if (!response.ok) {
    const errorMessage = await response.text(); // 서버에서 반환한 에러 메시지 확인
    console.error('Error message from server:', errorMessage);
    throw new Error('Failed to update job');
  }

  return response.json();
};











