export async function login({ email, password }) {
    try {
      const response = await fetch('https://api.kkijuk.com/login', {
        method: 'POST',
        credentials: "include", // 쿠키와 인증 정보를 함께 보냄

        headers: {
          'Content-Type': 'application/json',

          'accept': '*/*'
        },
        body: JSON.stringify({
          email,
          password
        })
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '로그인 중 오류가 발생했습니다.');
      }
  
      // 서버의 응답이 JSON이 아닌 경우 텍스트로 처리
      const resultText = await response.text();
      
      // JSON이 아니면 텍스트로 직접 처리
      if (resultText === "login success") {
        return { message: "login success" };
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
  
  