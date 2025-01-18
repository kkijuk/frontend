export const validateAndFilterForm = (category, formData) => {
	let errors = [];
	let filteredData = {};

	// 카테고리별 필드 정의
	const categoryFields = {
		1: ['name', 'alias', 'startdate', 'enddate', 'unknown', 'location', 'role'], // 동아리
		2: ['name', 'alias', 'startdate', 'enddate', 'unknown', 'organizer', 'role', 'isTeam', 'teamSize', 'contribution'], // 대외활동
		3: ['name', 'alias', 'startdate', 'enddate', 'unknown', 'organizer', 'isTeam', 'teamSize', 'contribution'], // 공모전/대회
		4: ['name', 'alias', 'startdate', 'enddate', 'unknown', 'location', 'isTeam', 'teamSize', 'contribution'], // 프로젝트
		5: ['name', 'startdate', 'enddate', 'unknown', 'type', 'alias', 'position', 'jobField'], // 경력
		6: ['name', 'alias', 'startdate', 'enddate', 'unknown', 'organizer', 'educationHours'], // 교육
	};

	// 필수 필드 정의
	const requiredFields = {
		1: ['name', 'alias', 'startdate', 'location'],
		2: ['name', 'alias', 'startdate', 'organizer'],
		3: ['name', 'alias', 'startdate', 'organizer'],
		4: ['name', 'alias', 'startdate', 'location'],
		5: ['name', 'startdate', 'type', 'alias'],
		6: ['name', 'alias', 'startdate', 'organizer', 'educationHours'],
	};

	// 필수 필드 확인 및 필터링
	requiredFields[category].forEach((field) => {
		if (field === 'enddate' && formData.unknown) return;
		if (field === 'isTeam') return; // isTeam은 직접 처리하므로 여기서는 검사하지 않음
		if (!formData[field] && formData[field] !== 0) errors.push(`${field}은(는) 필수 항목입니다.`);
	});

	// `isTeam`이 true일 때만 teamSize와 contribution을 필수로 확인
	if (formData.isTeam) {
		if (!formData.teamSize) errors.push('teamSize은(는) 필수 항목입니다.');
		if (!formData.contribution) errors.push('contribution은(는) 필수 항목입니다.');
		filteredData.teamSize = parseInt(formData.teamSize, 10) || null;
		filteredData.contribution = parseInt(formData.contribution, 10) || null;
	}

	// 필요한 필드만 필터링
	categoryFields[category].forEach((field) => {
		if (formData[field] !== undefined) {
			// 조건에 따라 teamSize와 contribution 추가
			if ((field === 'teamSize' || field === 'contribution') && !formData.isTeam) {
				// isTeam이 false일 때는 teamSize와 contribution을 추가하지 않음
				return;
			} else {
				filteredData[field] = formData[field];
			}
		}
	});

	// `enddate` timestamp 형식 확인
	filteredData.startdate = formData.startdate ? formData.startdate : null;
	filteredData.enddate = formData.enddate && !formData.unknown ? formData.enddate : undefined;

	filteredData.unknown = formData.unknown || false;

	// `location` 처리
	if (category === 1 && formData.location) {
		filteredData.location = formData.location === 'ON_CAMPUS';
	}

	// Enum 검사 및 기타 숫자 형식 변환
	const validLocationValues = ['ON_CAMPUS', 'OFF_CAMPUS', 'OTHER'];
	const validTypeValues = ['PART_TIME', 'INTERNSHIP', 'FULL_TIME', 'CONTRACT', 'FREELANCE'];
	if (category === 4 && formData.location && !validLocationValues.includes(formData.location)) {
		errors.push('프로젝트의 location은 ON_CAMPUS, OFF_CAMPUS, OTHER 중 하나여야 합니다.');
	}
	if (category === 5 && formData.type && !validTypeValues.includes(formData.type)) {
		errors.push('경력의 type은 PART_TIME, INTERNSHIP, FULL_TIME, CONTRACT, FREELANCE 중 하나여야 합니다.');
	}

	// 유효한 데이터 반환
	return errors.length === 0 ? { isValid: true, filteredData } : { isValid: false, errors };
};
