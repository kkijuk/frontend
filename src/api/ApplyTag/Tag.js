import api from '../../Axios';

// 공고 태그 불러오기 (GET)
export const fetchModalTags = async () => {
    try {
      const token = sessionStorage.getItem('token'); // 토큰 가져오기
      const response = await api.get('/recruit/tag', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      // ✅ 빈 태그 리스트 강제 초기화
      if (!response.data.tags) {
        return [];
      }
  
      return response.data.tags;
    } catch (error) {
      console.error('Error fetching tags:', error.response ? error.response.data : error);
      return [];
    }
  };
  
  // 공고 태그 추가 (POST)
  export const addModalTag = async (tagName) => {
    try {
      const token = sessionStorage.getItem('token'); // 토큰 가져오기
      const encodedTag = encodeURIComponent(tagName);
  
      // ✅ 태그 목록 초기화 (빈 배열 반환 보장)
      const existingTags = await fetchModalTags();
  
      // ✅ 태그 리스트가 null일 경우 빈 리스트로 초기화
      if (!Array.isArray(existingTags)) {
        console.warn('태그 목록이 비어 있습니다. 빈 배열로 초기화합니다.');
      }
  
      // ✅ 태그 추가 요청
      const response = await api.post(
        `/recruit/tag?tag=${encodedTag}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      return response.data;
    } catch (error) {
      console.error('Error adding tag:', error.response ? error.response.data : error);
    }
  };
  
  

// 공고 태그 삭제 (DELETE)
export const deleteModalTag = async (tagName) => {
    try {
      const token = sessionStorage.getItem('token'); //  토큰 가져오기
      const encodedTag = encodeURIComponent(tagName); //  인코딩 추가
      await api.delete(`/recruit/tag?tag=${encodedTag}`, {
        headers: {
          Authorization: `Bearer ${token}`, //  토큰 헤더에 추가
        },
      });
    } catch (error) {
      console.error('Error deleting tag:', error.response ? error.response.data : error);
    }
  };
  

