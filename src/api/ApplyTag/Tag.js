import api from '../../Axios';

// 공고 태그 불러오기 (GET)
export const fetchModalTags = async () => {
    try {
      const token = sessionStorage.getItem('token'); //  토큰 가져오기
      const response = await api.get('/recruit/tag', {
        headers: {
          Authorization: `Bearer ${token}`, //  토큰 헤더에 추가
        },
      });
      console.log('Response:', response.data); // 응답 데이터 출력
      return response.data.tags;
    } catch (error) {
      console.error('Error fetching tags:', error.response ? error.response.data : error); // 에러 로그 출력
      return [];
    }
  };


// 공고 태그 추가 (POST)
export const addModalTag = async (tagName) => {
    try {
      const token = sessionStorage.getItem('token'); //  토큰 가져오기
      const encodedTag = encodeURIComponent(tagName); //  인코딩 추가
      const response = await api.post(
        `/recruit/tag?tag=${encodedTag}`,
        {}, //  POST 요청 시 body가 필요 없다면 빈 객체 전달
        {
          headers: {
            Authorization: `Bearer ${token}`, //  토큰 헤더에 추가
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
  

