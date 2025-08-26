import api from "@/Axios";

// [사용량 높은 순으로 태그 제공]
const getMostUsedTags = async () => {
	try {
		const response = await api.get(`/career/find/taglist/count`);
		console.log('Sucess-getMostUsedTags: ', response);
		return response.data.data; // 태그 배열 반환
	} catch (error) {
		console.error('Error-getMostUsedTags: ', error);
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

export default getMostUsedTags;
