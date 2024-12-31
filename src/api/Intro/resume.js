//이력서 pdf 내보내기에 추가할 정보
const createIntro = async () => {
	try {
		const response = await api.get(`/history/resume/download`);
		console.log('Sucess-createIntro: ', response.data);
		return response.data;
	} catch (error) {
		console.error('Error-createIntro: ', error);
		if (error.response) {
			//서버 응답이 있는 경우
			console.error('Server responded with status code: ', error.response.status);
			console.error('Server responded with:', error.response.data);
		} else if (error.request) {
			//요청이 보내졌지만 응답을 받지 못한 경우
			console.error('No response received: ', error.request);
		} else {
			//요청 설정 중에 오류가 발생한 경우
			console.error('Error setting up request: ', error.message);
		}
	}
};
