import api from '../../Axios';

// [자기소개서 문단 검색]
// 키워드로 자기소개서 문단을 검색합니다.
// 반환 형식 :{ count: 7, data: [{introId, title, content, createDate},...] }
const getIntroSearch = async (keyword) => {
    try {
        const response = await api.get(`/history/intro/search?keyword=${keyword}`);
        console.log('Success-getIntroSearch: ', response.data);
        return response.data;
    } catch (error) {
        console.error('Error-getIntroSearch: ', error);
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
}

export default getIntroSearch;
