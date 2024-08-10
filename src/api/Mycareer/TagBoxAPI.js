
import axios from "axios";

//여기서 전해야 할건 태그박스 리스트에서 여태까지 썼던 태그들을 GET요청으로 받아와야 함

export const TagBoxFetchList = async() => {
    try{
        const response = await axios.get(
            "https://api.kkijuk.com/career/tag",
            {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }
        )
        console.log("통신 완료: ", response.data);
        return response.data.data.tagList; // 태그 목록 반환

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

export const TagBoxCreateTag = async(tagName) => {
    try{
        const response = await axios.post(
            "https://api.kkijuk.com/career/tag",
            { tagName }, //POST할 때 보내는 데이터에 tagName을 포함하기 때문에
            {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
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
}


export const TagBoxDeleteTag = async(tagId) => {
    try{
        const response = await axios.delete(
            `https://api.kkijuk.com/career/tag/${tagId}`,
            {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }
        )
        console.log("태그 삭제 완료: ", response.data);
    } catch (error) {
        console.log("Errpr", error.message);
        if(error.response){
            console.log("서버 오류 응답 데이터:", error.response.data);
            console.log("서버 오류 상태 코드:", error.response.status);
            console.log("서버 오류 헤더:", error.response.headers);
        }
    }
}