import axios from "axios";

export const CareerViewSelect = async(status) => {
    try{
        console.log("Current view status:", status);
        const response = await axios.get(
            "https://api.kkijuk.com/career?status={status}",
            {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }
        )
        console.log("통신 완료 : ", response.data);
    } catch (error) {
        console.log("Error", error.message);
        if(error.response){
            console.log("서버 오류 응답 데이터:", error.response.data);
            console.log("서버 오류 상태 코드:", error.response.status);
            console.log("서버 오류 헤더:", error.response.headers);
        }
    }
};