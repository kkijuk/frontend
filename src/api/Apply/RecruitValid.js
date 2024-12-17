export const getValidRecruitList = async (date) => {
    try {
      console.log('Fetching valid recruit list after date:', date); // 디버깅용 로그 추가
  
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/recruit/list/valid?time=${encodeURIComponent(date)}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            accept: '*/*',
          },
          credentials: 'include',
        },
      );
  
      if (!response.ok) {
        throw new Error('Failed to fetch valid recruit list');
      }
  
      const data = await response.json();
      console.log('Valid recruit list fetched:', data); // 디버깅용 로그 추가
  
      // 데이터 구조 확인 및 반환
      return data;
    } catch (error) {
      console.error('Error fetching valid recruit list:', error);
      throw error;
    }
  };
  