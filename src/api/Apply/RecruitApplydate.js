import api from '../../Axios';

export const updateRecruitApplyDate = async (recruitId, applyDate) => {
    try {
        const token = localStorage.getItem("token"); //  토큰 가져오기 (저장된 위치 확인)
        const response = await api.patch(
            `/recruit/${recruitId}/apply-date`,
            { applyDate: new Date(applyDate).toISOString().split("T")[0] }, //  "YYYY-MM-DD" 형식으로 변환
            {
                headers: {
                    Authorization: `Bearer ${token}`, //  헤더에 토큰 추가
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error updating apply date:', error.response?.data || error);
        throw error;
    }
};
