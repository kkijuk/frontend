import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL; 

// 계정 관리 - 비밀번호 바꾸기
export const ChangePassword = async (passwordData) => {
    try {
        const response = await axios.post(
            `${apiUrl}/member/myPage/password`, 
            passwordData, 
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true, // 쿠키와 인증 정보를 함께 보냄
            }
        );

        console.log("비밀번호 변경 완료 : ", response.data);
        return response.data;
    } catch (error) {
        console.error("비밀번호 변경 중 오류 발생:", error);
        if (error.response) {
            console.error("서버 오류 응답 데이터:", error.response.data);
            console.error("서버 오류 상태 코드:", error.response.status);
            console.error("서버 오류 헤더:", error.response.headers);
        }
        throw error; // 오류를 다시 던져서 호출 측에서 처리할 수 있도록 함
    }
};
