export async function logout() {
    try {
      const response = await fetch('https://api.kkijuk.com/logout', {
        method: 'POST',
        headers: {
          credentials: "include", // 쿠키와 인증 정보를 함께 보냄

          'accept': '*/*',
        }
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '로그아웃 중 오류가 발생했습니다.');
      }
  
      return true; // 로그아웃 성공 시 true 반환
    } catch (error) {
      throw new Error(error.message);
    }
  }
  