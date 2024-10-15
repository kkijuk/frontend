import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL; 

export const sendPasswordResetEmail = async (email) => {
    try {
        console.log(email);
        const response = await axios.post(
            `${apiUrl}/password/send`, 
            JSON.stringify({ email }), 
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
            }
        );
        console.log("통신 완료 : ", response.data);
    } catch (error) {
        console.log("Error", error.message);
        if (error.response) {
            console.log("서버 오류 응답 데이터:", error.response.data);
            console.log("서버 오류 상태 코드:", error.response.status);
            console.log("서버 오류 헤더:", error.response.headers);
        }
    }
};

// 비밀번호 재설정 인증 코드 검증 및 이메일 전송
export const sendAuthNumber = async (authNumber, email) => {
    try {
        const response = await axios.post(
            `${apiUrl}/password/confirm`, 
            {
                authNumber: authNumber,
                email: email,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        console.log("응답 데이터:", response.data);
        return response.data;
    } catch (error) {
        console.error("인증 번호 전송 중 오류 발생:", error);
        if (error.response) {
            console.error("서버 오류 응답 데이터:", error.response.data);
            console.error("서버 오류 상태 코드:", error.response.status);
            console.error("서버 오류 헤더:", error.response.headers);
        }
        throw error;
    }
};

export const resetPassword = async (email, newPassword, newPasswordConfirm) => {
    try {
        const response = await axios.post(
            `${apiUrl}/password/reset`, 
            {
                newPassword: newPassword,
                newPasswordConfirm: newPasswordConfirm,
                email: email,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        console.log("응답 데이터:", response.data);
        return response.data;
    } catch (error) {
        console.error("비밀번호 재설정 중 오류 발생:", error);
        if (error.response) {
            console.error("서버 오류 응답 데이터:", error.response.data);
            console.error("서버 오류 상태 코드:", error.response.status);
            console.error("서버 오류 헤더:", error.response.headers);
        }
        throw error;
    }
};
