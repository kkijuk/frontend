export const fetchEmail = async () => {
    try {
        const response = await fetch(`https://api.kkijuk.com/member/myPage`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            credentials: 'include' // 이 옵션을 설정하여 쿠키와 인증 정보를 함께 보냄
        });

        // fetch는 HTTP 응답 코드를 직접 처리해야 함
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("이메일 가져오기 완료 : ", data);
        return data.email;
    } catch (error) {
        console.log("Error", error.message);
        if (error.response) {
            console.log("서버 오류 응답 데이터:", error.response.data);
            console.log("서버 오류 상태 코드:", error.response.status);
            console.log("서버 오류 헤더:", error.response.headers);
        }
    }
};




export const verifyPassword = async (currentPassword) => {
    try {
        const response = await fetch('https://api.kkijuk.com/member/myPage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            credentials: 'include',

            body: JSON.stringify({currentPassword})
        });

        // fetch는 HTTP 응답 코드를 직접 처리해야 함
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("T/F:", data);
        return data;
    } catch (error) {
        console.error("비밀번호 확인 실패:", error.message);
        throw error;
    }
};


