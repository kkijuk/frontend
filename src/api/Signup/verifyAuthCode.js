export async function verifyAuthCode(email, authNumber) {
    try {
      const response = await fetch('https://api.kkijuk.com/auth/confirm', {
        method: 'POST',
        headers: {
          credentials: "include", // 쿠키와 인증 정보를 함께 보냄

          'Content-Type': 'application/json',
          'accept': '*/*'
        },
        body: JSON.stringify({ email, authNumber })
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '인증 실패');
      }
  
      return true; // 인증 성공 시 true 반환
    } catch (error) {
      throw new Error(error.message);
    }
  }
  