export const yearMockData = {
	2022: [
		{
			id: 1,
			category: '대외활동', //해당 활동의 카테고리(대외활동)
			name: '대외활동',
			alias: '연합동아리',
			unknown: false,
			summary: null,
			startdate: '2022-04-14',
			organizer: '컴공선배',
			role: '동아리 회장',
			teamSize: 30,
			contribution: 20,
			isTeam: false,
			detailList: null, //활동 기록 리스트 null
			endDate: '2022-07-20',
		},
	],
	2023: [
		{
			id: 1,
			category: '대회', //해당 활동의 카테고리(대회)
			name: '웹 개발 해커톤',
			alias: 'IT 연합 동아리 해커톤',
			unknown: false,
			summary: null,
			startdate: '2023-04-14',
			organizer: '컴공선배',
			teamSize: 4,
			contribution: 30,
			isTeam: true,
			detailList: null, //활동 기록 리스트 null
			endDate: '2023-07-20',
		},
	],
	2024: [
		{
			id: 2,
			category: '대회', //해당 활동의 카테고리(대회)
			name: '웹 개발 해커톤',
			alias: 'IT 연합 동아리 해커톤',
			unknown: false,
			summary: null,
			startdate: '2023-04-14',
			organizer: '컴공선배',
			teamSize: 4,
			contribution: 30,
			isTeam: true,
			detailList: null, //활동 기록 리스트 null
			endDate: '2024-10-20', //끝난 날짜 기준 정렬
		},
		{
			id: 1,
			category: '프로젝트', //해당 활동의 카테고리(프로젝트)
			name: '웹 프로젝트',
			alias: '끼적',
			unknown: false,
			summary: null,
			startdate: '2024-04-14',
			teamSize: 4,
			isTeam: false,
			contribution: 80,
			location: 'OTHER',
			detailList: null, //활동 기록 리스트 null
			endDate: '2024-07-20',
		},
		{
			id: 1,
			category: '경력', //해당 활동의 카테고리(경력)
			name: '학원 채점 아르바이트',
			alias: '근무처',
			unknown: false,
			summary: null,
			startdate: '2023-04-14',
			type: 'FULL_TIME',
			position: '보조강사',
			field: '마케팅',
			detailList: null, //활동 기록 리스트 null
			endDate: '2024-07-20',
		},
	],
};

export const categoryMockData = {
	프로젝트: [
		{
			id: 1,
			category: '프로젝트', //해당 활동의 카테고리(프로젝트)
			name: '수정된 웹 프로젝트',
			alias: '수정된 끼적',
			unknown: false,
			summary: null,
			startdate: '2024-04-14',
			teamSize: 7,
			isTeam: false,
			contribution: 80,
			location: 'ON_CAMPUS',
			detailList: null, //활동 기록 리스트 null
			endDate: '2024-07-20',
		},
	],
	교육: [
		{
			id: 1,
			category: '교육', //해당 활동의 카테고리(교육)
			name: '수정된 스프링부트 입문 강의 수강',
			alias: '스프링부트 입문 강의',
			unknown: false,
			summary: null,
			startdate: '2024-04-14',
			organizer: '인프런',
			time: 126,
			detailList: null, //활동 기록 리스트 null
			endDate: '2024-07-20',
		},
		{
			id: 1,
			category: '교육', //해당 활동의 카테고리(교육)
			name: '수정된 스프링부트 입문 강의 수강',
			alias: '스프링부트 입문 강의',
			unknown: false,
			summary: null,
			startdate: '2024-04-14',
			organizer: '인프런',
			time: 126,
			detailList: null, //활동 기록 리스트 null
			endDate: '2024-07-20',
		},
	],
	인턴: [
		{
			id: 1,
			category: '경력', //해당 활동의 카테고리(경력)
			name: '수정된 학원 채점 아르바이트',
			alias: '수정된 근무처',
			unknown: false,
			summary: null,
			startdate: '2024-04-14',
			type: 'FULL_TIME',
			position: '보조강사',
			field: '마케팅',
			detailList: null, //활동 기록 리스트 null
			endDate: '2024-07-20',
		},
	],
	대외활동: [
		{
			id: 1,
			category: '대외활동', //해당 활동의 카테고리(대외활동)
			name: '수정된 대외활동',
			alias: '수정된 연합동아리',
			unknown: false,
			summary: null,
			startdate: '2024-04-14',
			organizer: '수정된 컴공선배',
			role: '동아리 회장',
			teamSize: 30,
			contribution: 20,
			isTeam: false,
			detailList: null, //활동 기록 리스트 null
			endDate: '2024-07-20',
		},
	],
	동아리: [
		{
			id: 1,
			category: '동아리', //해당 활동의 카테고리(동아리)
			name: '수정된 IT 서비스 개발 동아리',
			alias: '수정된 UMC',
			unknown: false,
			summary: null,
			startdate: '2024-04-14',
			location: false,
			role: '동아리 회장',
			detailList: null, //활동 기록 리스트 null
			endDate: '2024-07-20',
		},
	],
	대회: [
		{
			id: 1,
			category: '대회', //해당 활동의 카테고리(대회)
			name: '수정된 웹 개발 해커톤',
			alias: 'IT 연합 동아리 해커톤',
			unknown: false,
			summary: null,
			startdate: '2024-04-14',
			organizer: '컴공선배',
			teamSize: 4,
			contribution: 30,
			isTeam: true,
			detailList: null, //활동 기록 리스트 null
			endDate: '2024-04-20',
		},
	],
};
