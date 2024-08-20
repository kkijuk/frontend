//여기서 전해야 할건 태그박스 리스트에서 여태까지 썼던 태그들을 GET요청으로 받아와야 함

import axios from "axios";

export const TagBoxApi = async() => {
    try{
        const response = await axios.get(
            "https://api.kkijuk.com/career/tag",
            {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    withCredentials: true, // 이 옵션을 설정하여 쿠키와 인증 정보를 함께 보냄

                }
            }
        )
        console.log("통신 완료: ", response.data);
    } catch (error) {
        console.log("Errpr", error.message);
        if(error.response){
            console.log("서버 오류 응답 데이터:", error.response.data);
            console.log("서버 오류 상태 코드:", error.response.status);
            console.log("서버 오류 헤더:", error.response.headers);
        }
    }
};