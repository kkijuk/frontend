import api from "../../Axios";

const readRecord = async () => {
    try {
        const response = await api.get('/history/resume');
        console.log(response.data);
        // 성공적으로 데이터를 받아왔을 때 추가 작업
        // 예를 들어, 데이터를 상태에 저장하거나 UI 업데이트 등을 처리
    } catch (error) {
        console.error('Error fetching record:', error);
        // 에러 발생 시 사용자에게 알림을 표시하거나, 특정 처리 로직을 추가할 수 있음
        if (error.response) {
            // 서버 응답이 있는 경우
            console.error('Server responded with:', error.response.data);
        } else if (error.request) {
            // 요청이 보내졌지만 응답을 받지 못한 경우
            console.error('No response received:', error.request);
        } else {
            // 요청 설정 중에 오류가 발생한 경우
            console.error('Error setting up request:', error.message);
        }
    }
};

export default readRecord;
