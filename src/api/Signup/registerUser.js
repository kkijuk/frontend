export async function registerUser({ email, name, phoneNumber, birthDate, password, passwordConfirm }) {
    try {
      const response = await fetch('https://api.kkijuk.com/member', {
        method: 'POST',
        headers: {

          'Content-Type': 'application/json',
          'accept': '*/*'
        },
        body: JSON.stringify({
          email,
          name,
          phoneNumber,
          birthDate,
          password,
          passwordConfirm,
          marketingAgree: "BOTH",  // 추후 수정
          userState: "ACTIVATE"     // 
        })
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '회원가입 요청 중 오류가 발생했습니다.');
      }
  
      const data = await response.json();
      return data; // 성공 시 서버로부터 반환된 데이터를 반환
    } catch (error) {
      throw new Error(error.message);
    }
  }
  