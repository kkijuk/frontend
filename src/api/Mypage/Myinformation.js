//내 정보 불러오기(이메일, 이름, 휴대폰번호, 생년월일)
export const fetchMyinfo = async () => {
    try {
        const response = await fetch(`https://api.kkijuk.com/member/myPage/info`, {
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
        console.log("내 정보 가져오기 완료 : ", data);
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


//수정된 내 정보 보내기
export const changeMyinfo = async (name, phoneNumber, birthDate, marketingAgree) => {
    try {
        const response = await fetch(`https://api.kkijuk.com/member/myPage/info`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            credentials: 'include', // 이 옵션을 설정하여 쿠키와 인증 정보를 함께 보냄
            body: JSON.stringify({
                name,
                phoneNumber,
                birthDate,
                marketingAgree
            })
        });

        // fetch는 HTTP 응답 코드를 직접 처리해야 함
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("내 정보 수정 완료 : ", data);
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