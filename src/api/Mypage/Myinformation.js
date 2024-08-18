import axios from "axios";

//내 정보 비번 확인 페이지에서 내 이메일 가져오기

export const fetchEmail = async() => {
    try{
        const response = await axios.get(
            `https://api.kkijuk.com/member/mypage`,
            {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }
        )
        console.log("이메일 가져오기 완료 : ", response.data);
        return response.data;
    } catch (error) {
        console.log("Error", error.message);
        if(error.response){
            console.log("서버 오류 응답 데이터:", error.response.data);
            console.log("서버 오류 상태 코드:", error.response.status);
            console.log("서버 오류 헤더:", error.response.headers);
        }
    }
};



// 비밀번호 확인
export const verifyPassword = async (email, password) => {
    try {
        const response = await axios.post('/member/myPage/verifyPassword', { email, password }, {
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        });
        return response.data.valid;
    } catch (error) {
        console.error("비밀번호 확인 실패:", error.message);
        throw error;
    }
};



