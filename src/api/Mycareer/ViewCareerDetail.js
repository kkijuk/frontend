
import axios from "axios";

//활동 내역 클릭하면 CareerId를 넘겨주고 그 CareerId에 맞는 정보들 불러오기

export const ViewCareerDetail = async(careerId) => {
    try{
        const response = await axios.get(
            `https://api.kkijuk.com/career/${careerId}`,
            {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }
        )
        console.log("통신 완료: ", response.data);
        return response.data; // 응답 데이터 반환

    } catch (error) {
        console.log("Error", error.message);
        if(error.response){
            console.log("서버 오류 응답 데이터:", error.response.data);
            console.log("서버 오류 상태 코드:", error.response.status);
            console.log("서버 오류 헤더:", error.response.headers);
        }
        return [];
    }
};