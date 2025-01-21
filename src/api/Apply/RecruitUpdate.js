import api from '../../Axios'; 

export const updateRecruit = async (recruitId, updatedJob) => {
  if (!recruitId || !updatedJob) {
    console.error('Invalid parameters for API request');
    throw new Error('Both recruitId and updatedJob are required');
  }

  // 로컬 시간을 'YYYY-MM-DD HH:mm' 형식으로 변환
  const formatToServerTime = (dateTime) => {
    const localDate = new Date(dateTime);

    const year = localDate.getFullYear();
    const month = String(localDate.getMonth() + 1).padStart(2, '0');
    const day = String(localDate.getDate()).padStart(2, '0');
    const hours = String(localDate.getHours()).padStart(2, '0');
    const minutes = String(localDate.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  try {
    // Axios로 PUT 요청
    const response = await api.put(`/recruit/${recruitId}`, {
      title: updatedJob.title || null,
      startTime: updatedJob.startTime ? formatToServerTime(updatedJob.startTime) : null,
      endTime: updatedJob.endTime ? formatToServerTime(updatedJob.endTime) : null,
      status: updatedJob.status || null,
      tags: updatedJob.tags && updatedJob.tags.length > 0 ? updatedJob.tags : null,
      link: updatedJob.link || null,
    });

    console.log('Recruit updated successfully:', response.data);

    return response.data; // API 응답 데이터 반환
  } catch (error) {
    console.error('Error updating recruit:', error.message);
    throw error; // 에러를 그대로 throw
  }
};
