export const ROUTES = {
	HOME: '/home',

	// 인증 관련 라우트
	ROOT: '/',
	SIGNUP: '/signup',
	SIGNUP_SUCCESS: '/signupsuccess',
	SIGNUP_INTEREST: '/signupinterest',
	PRIVACY_AGREED: '/agree',
	KAKAO_REDIRECT: '/login/oauth2/code/kakao',
	NAVER_REDIRECT: '/login/oauth2/code/naver',
    PRIVACY_POLICY: '/privacy-policy',
	SERVICE_AGREE: '/terms',
	// 마이페이지 관련 라우트
	MYPAGE: '/mypage',
	MYPAGE_AUTHENTICATION: '/mypage/authentication',
	MYPAGE_INFORMATION: '/mypage/myinformation',
	MYPAGE_FIELD: '/mypage/field',
	MYPAGE_FIELD_EDIT: '/mypage/fieldedit',
	MYPAGE_PASSWORD_RESET_EMAIL: '/mypage/passwordresetemail',
	MYPAGE_PASSWORD_RESET_EMAIL_CONFIRM: '/mypage/passwordresetemailconfirm',
	MYPAGE_PASSWORD_RESET: '/mypage/passwordreset',
	MYPAGE_RESET_SUCCESS: '/mypage/resetsuccess',
	DELETE_ACCOUNT: '/delete-account',

	// 히스토리 관련 라우트
	HISTORY: '/history',
	HISTORY_MASTER: '/history/master',
	HISTORY_OTHERS: '/history/others/:id',
	HISTORY_LIST: '/history/list/:state',
	HISTORY_PORTFOLIO: '/history/portfolio',
	HISTORY_MASTER_REWRITE: '/history/master/rewrite',
	HISTORY_OTHERS_REWRITE: '/history/others/:id/rewrite',
	HISTORY_SELECT: '/history/select',
	HISTORY_ADD_APPLY: '/history/add_apply',
	HISTORY_RESUME_EXPORT: '/history/resumeExport',

	// 커리어 관련 라우트
	MYCAREER: '/mycareer',
	MYCAREER_SEARCH: '/mycareer_search',
	MYCAREER_DETAIL: '/mycareer/:careerId/:category',

	// 지원 관련 라우트
	APPLY_SCHEDULE: '/apply-schedule',
	APPLY_STATUS: '/apply-status',
	APPLY_DETAIL: '/apply-detail/:id',
	FILTER: '/filter',

	// 기타 라우트
	COMMUNITY: '/community',
	BROWSER_ERROR: '/browser-error',
	ERROR: '/error',
	NUM_ERROR: '/numerror',
	SERVICE_MAINTENANCE: '/serviceMaintenence',
	COMMING_SOON: '/commingsoon',
};

// 경로 파라미터 대체 함수
export const getRoute = (routePath, params) => {
	if (!params) return routePath;

	let path = routePath;
	Object.entries(params).forEach(([key, value]) => {
		path = path.replace(`:${key}`, value);
	});

	return path;
};
