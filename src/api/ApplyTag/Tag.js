import api from '../../Axios';

// 공고 태그 불러오기 (GET)
export const fetchModalTags = async () => {
    try {
        console.log('Fetching modal tags...');
        const response = await api.get('/recruit/tag');
        console.log('Response:', response.data); // 응답 데이터 출력
        return response.data.tags;
    } catch (error) {
        console.error('Error fetching tags:', error); // 에러 로그 출력
        return [];
    }
};


// 공고 태그 추가 (POST)
export const addModalTag = async (tagName) => {
    try {
        const response = await api.post(`/recruit/tag?tag=${tagName}`);
        return response.data; // 서버에서 추가된 태그 반환
    } catch (error) {
        console.error('Error adding tag:', error);
    }
};

// 공고 태그 삭제 (DELETE)
export const deleteModalTag = async (tagName) => {
    try {
        await api.delete(`/recruit/tag?tag=${tagName}`);
    } catch (error) {
        console.error('Error deleting tag:', error);
    }
};
