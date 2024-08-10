import axios from "axios";

export const CareerViewSelect = async(status) => {
    try{
        console.log("Current view status:", status);
        const response = await axios.get(
<<<<<<< HEAD
            "https://api.kkijuk.com/career?status={status}",
=======
            `https://api.kkijuk.com/career?status=${status}`,
>>>>>>> 3900bd1f6e487e4b40f6ba87d8937091ff33e4b7
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