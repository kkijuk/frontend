// validateAndFilter.js
export const validateAndFilterForm = (category, formData) => {
	let errors = [];
	let filteredData = {};

	// 카테고리별로 필수 필드
	const requiredFields = {
		1: ['title', 'alias', 'period', 'affiliation'], // 동아리
		2: ['title', 'alias', 'period', 'organizer', 'participantType'], // 대외활동
		3: ['title', 'alias', 'period', 'organizer', 'participantType'], // 공모전/대회
		4: ['title', 'alias', 'period', 'affiliation', 'participantType'], // 프로젝트
		5: ['careerType', 'workplace', 'title', 'period'], // 경력
		6: ['title', 'alias', 'period', 'organizer', 'educationHours'], // 교육
		7: ['title', 'alias', 'period'], // 기타
	};

	// 필수 및 선택 필드를 모두 포함한 필드 리스트 (필수 필드 + 선택 필드)
	const allFields = {
		1: ['title', 'alias', 'period', 'affiliation', 'role'], // 동아리
		2: ['title', 'alias', 'period', 'organizer', 'role', 'participantType'], // 대외활동
		3: ['title', 'alias', 'period', 'organizer', 'participantType'], // 공모전/대회
		4: ['title', 'alias', 'period', 'affiliation', 'participantType'], // 프로젝트
		5: ['careerType', 'workplace', 'title', 'period', 'position', 'jobField'], // 경력
		6: ['title', 'alias', 'period', 'organizer', 'educationHours'], // 교육
		7: ['title', 'alias', 'period'], // 기타
	};

	// 필터링
	const fieldsToInclude = allFields[category];

	fieldsToInclude.forEach((field) => {
		// 필수 필드 검증
		if (requiredFields[category].includes(field) && !formData[field]) {
			errors.push(`${field}은(는) 필수 항목입니다.`);
		}
		// 필수 또는 선택 필드 값이 있는 경우만 필터링
		if (formData[field]) {
			filteredData[field] = formData[field];
		}
	});

	// 검증 결과 반환
	if (errors.length > 0) {
		return { isValid: false, errors };
	}
	return { isValid: true, filteredData };
};
