export const CareerViewSelect = async(status) => {
    try {
        console.log("Current view status:", status);
        const response = await fetch(
            `https://api.kkijuk.com/career?status=${status}`,
            {
                method: 'GET',
                credentials: 'include', // 쿠키와 인증 정보를 함께 보냄
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }
        );

        // fetch는 HTTP 응답 코드를 직접 처리해야 함
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("통신 완료 : ", data);
        return data;
    } catch (error) {
        console.log("Error", error.message);
        if (error.response) {
            console.log("서버 오류 응답 데이터:", error.response.data);
            console.log("서버 오류 상태 코드:", error.response.status);
            console.log("서버 오류 헤더:", error.response.headers);
        }
    }
};
