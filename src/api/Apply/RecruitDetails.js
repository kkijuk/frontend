import api from '../../Axios';

export const getRecruitDetails = async (id) => {
    try {
        const response = await api.get(`/recruit/${id}`);

        // ✅ introduceId가 없으면 기본값 0을 설정
        const updatedResponse = {
            ...response.data,
            id,
            introduceId: response.data.introduceId ?? 0 // introduceId 추가
        };

        console.log('Recruit details for ID:', id, updatedResponse);

        return updatedResponse; 
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.warn(`Recruit에서 ID ${id}를 찾을 수 없습니다.`);
            return null; // ID를 찾지 못한 경우 null 반환
        }

        console.error('Error fetching recruit details:', error.message);
        return null; // 에러 발생 시 null 반환
    }
};
