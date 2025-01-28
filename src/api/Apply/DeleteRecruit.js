import api from '../../Axios';

export const deleteRecruit = async (id) => {
    try {
        const response = await api.delete(`/recruit/${id}`);
        return response.data; // 성공적으로 삭제된 데이터 반환
    } catch (error) {
        if (error.response) {
            console.error('Error message from server:', error.response.data.message); // 서버에서 반환된 에러 메시지
        }
        console.error('Error deleting recruit:', error.message);
        throw error;
    }
};
