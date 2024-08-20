export async function logout() {
    try {
      const response = await fetch('https://api.kkijuk.com/logout', {
        method: 'POST',
        headers: {
          credentials: "include", 
 
          'accept': '*/*',
        }
      });
  
       
    if (response.ok) {
      const resultText = await response.text();

      
      if (resultText === 'logout success') {
        console.log('로그아웃 성공:', resultText);
        return true; 
      } else {
        throw new Error('Unexpected response format');
      }
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || '로그아웃 중 오류가 발생했습니다.');
    }
  } catch (error) {
    console.error('로그아웃 오류:', error.message);
    throw new Error(error.message);
  }
}
  