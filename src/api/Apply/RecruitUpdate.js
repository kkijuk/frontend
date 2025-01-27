export const updateRecruit = async (recruitId, updatedJob) => {
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

	const apiUrl = `${process.env.REACT_APP_API_URL}/recruit/${recruitId}`;

	try {
		const response = await fetch(apiUrl, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
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
	} catch (error) {
		console.error('Error updating recruit:', error.message);
		throw error;
	}
};