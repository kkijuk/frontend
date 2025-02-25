import moment from "moment";

export const validateAndFilterForm = (category, formData) => {
	let errors = [];
	let filteredData = {};

	// 카테고리별 필드 정의
	const categoryFields = {
		1: ['name', 'alias', 'startdate', 'enddate', 'unknown', 'location', 'role'], // 동아리
		2: ['name', 'alias', 'startdate', 'enddate', 'unknown', 'organizer', 'role', 'isTeam', 'teamSize', 'contribution'], // 대외활동
		3: ['name', 'alias', 'startdate', 'enddate', 'unknown', 'organizer', 'isTeam', 'teamSize', 'contribution'], // 공모전/대회
		4: ['name', 'alias', 'startdate', 'enddate', 'unknown', 'location', 'isTeam', 'teamSize', 'contribution'], // 프로젝트
		5: ['name', 'startdate', 'enddate', 'unknown', 'type', 'alias', 'position', 'jobField', 'type'], // 경력
		6: ['name', 'alias', 'startdate', 'enddate', 'unknown', 'organizer', 'time'], // 교육
		7: ['name', 'alias', 'startdate', 'enddate'] // 기타
	};

	// 필수 필드 정의
	const requiredFields = {
		1: ['name', 'alias', 'startdate', 'location'],
		2: ['name', 'alias', 'startdate', 'organizer'],
		3: ['name', 'alias', 'startdate', 'organizer'],
		4: ['name', 'alias', 'startdate', 'location'],
		5: ['name', 'startdate', 'type', 'alias'],
		6: ['name', 'alias', 'startdate', 'organizer', 'time'],
		7: ['name', 'alias', 'startdate']
	};

	// 필드별 에러 메세지 매핑
	const errorMessageMap = {
		name: "활동명을 입력해주세요.",
		alias: "별칭을 입력해주세요.",
		startdate: "시작 날짜를 선택해주세요.",
		enddate: "종료 날짜를 선택해주세요.",
		location: "소속을 선택해주세요.",
		organizer: "주최를 입력해주세요.",
		teamSize: "인원을 선택해주세요.",
		type: "분류를 선택해주세요.",
		invalidPeriodError: "종료 날짜는 시작 날짜 이후로 설정해주세요",
		otherError: {}, // 기타 에러 메시지를 순차적으로 저장할 객체
	}

	// 기타 에러 번호 카운트
	let otherErrorCount = 0; 

	// 필수 필드 확인 및 필터링
	requiredFields[category].forEach((field) => {
		if (field === 'isTeam') return; // isTeam은 직접 처리하므로 여기서는 검사하지 않음
		if (!formData[field] && formData[field] !== 0){
			console.log("필드 확인: ", field, formData[field]);
			if(errorMessageMap[field]){
				otherErrorCount++;
				errors.push(errorMessageMap[field]);
			} else {
				otherErrorCount ++;
				// 기타 에러 메세지 순차적으로 등록
				errorMessageMap.otherError[otherErrorCount] = "입력값을 확인해주세요.";
				errors.push(errorMessageMap.otherError[otherErrorCount]); //새로운 에러 errors에 push
			}
		};
	});

	// 종료날짜 필드 확인
	if (!formData.enddate && !formData.unknown) {
		console.log("필드 확인: ", formData.enddate);
		otherErrorCount ++;
		errors.push(errorMessageMap.enddate);
	}

	// 종료날짜 < 시작날짜 비교
	if(
		!formData.unknown &&
		formData.startdate &&
		formData.enddate &&
		moment(formData.enddate).isBefore(moment(formData.startdate))
	) {
		console.log("시작날짜<종료날짜 확인: ", formData.enddate);
		errors.push(errorMessageMap.invalidPeriodError);
	}


	// `isTeam`이 true일 때만 teamSize와 contribution을 필수로 확인
	if (formData.isTeam) {
		if (!formData.teamSize) {
			otherErrorCount ++;
			errorMessageMap.otherError[otherErrorCount] = "teamSize은(는) 필수 항목입니다.";
			errors.push(errorMessageMap.otherError[otherErrorCount]);
		}
		if (!formData.contribution) {
			otherErrorCount++;
			errorMessageMap.otherError[otherErrorCount] = "contribution은(는) 필수 항목입니다.";
			errors.push(errorMessageMap.otherError[otherErrorCount]);
		}
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

	// `location` 처리. 동아리의 경우 location을 boolean으로 변환시켜야함
	if (category === 1 && formData.location) {
		filteredData.location = formData.location === 'ON_CAMPUS';
	}

	// Enum 검사 및 기타 숫자 형식 변환
	const validLocationValues = ['ON_CAMPUS', 'OFF_CAMPUS', 'OTHER'];
	const validTypeValues = ['PART_TIME', 'INTERNSHIP', 'FULL_TIME', 'CONTRACT', 'FREELANCE'];
	if (category === 4 && formData.location && !validLocationValues.includes(formData.location)) {
		otherErrorCount++;
		errorMessageMap.otherError[otherErrorCount] = "프로젝트의 location은 ON_CAMPUS, OFF_CAMPUS, OTHER 중 하나여야 합니다.";
    	errors.push(errorMessageMap.otherError[otherErrorCount]);
	}
	if (category === 5 && formData.type && !validTypeValues.includes(formData.type)) {
		otherErrorCount++;
		errorMessageMap.otherError[otherErrorCount] ="경력의 type은 PART_TIME, INTERNSHIP, FULL_TIME, CONTRACT, FREELANCE 중 하나여야 합니다.";
		errors.push(errorMessageMap.otherError[otherErrorCount]);
	}

	// 유효한 데이터 반환
	return errors.length === 0 ? { isValid: true, filteredData } : { isValid: false, errors };
};
