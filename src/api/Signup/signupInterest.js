import api from '../../Axios'; 

export const saveInterests = async (interestingList) => {
	try {
		console.log('Sending data to server:', { field: interestingList });

		const response = await api.post('/member/field', { field: interestingList }); // POST 요청

		return response.data; // 서버 응답 데이터 반환
	} catch (error) {
		if (error.response) {
			console.error('Error message from server:', error.response.data.message || 'Unknown error');
		}
		console.error('Error saving interests:', error);
		console.log('Interest list being sent:', interestingList);
		throw error;
	}
};
