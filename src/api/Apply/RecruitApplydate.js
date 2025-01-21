import api from '../../Axios'; 

export const updateRecruitApplyDate = async (recruitId, applyDate) => {
	try {
		// Axios PATCH 요청
		const response = await api.patch(`/recruit/${recruitId}/apply-date`, {
			applyDate, // 요청 body에 데이터 추가
		});

		console.log('Apply date updated successfully:', response.data); // 디버깅용 로그 추가
		return response.data; // 업데이트된 데이터 반환
	} catch (error) {
		console.error('Error updating apply date:', error.message); // 에러 메시지 출력
		throw error;
	}
};
