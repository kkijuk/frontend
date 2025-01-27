import api from '../../Axios';

export const getRecruitDetails = async (id) => {
    try {
        const response = await api.get(`/recruit/${id}`);
        console.log('Recruit details for ID', id, ':', response.data); // 로그 추가

        return { ...response.data, id }; // id 필드 추가
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.warn(`Recruit에서 ID ${id}를 찾을 수 없습니다.`);
            return null; // ID를 찾지 못한 경우 null 반환
        }
        console.error('Error fetching recruit details:', error.message);
        return null; // 에러 발생 시 null 반환
    }
};
