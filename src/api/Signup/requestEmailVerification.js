export async function requestEmailVerification(email) {
    try {
      const response = await fetch('https://api.kkijuk.com/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': '*/*'
        },
       
        body: JSON.stringify({ email })
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '이메일 인증 요청 중 오류가 발생했습니다.');
      }
  
      return true; // 요청 성공 시 true 반환
    } catch (error) {
      throw new Error(error.message);
    }
  }
  