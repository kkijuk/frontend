import ReactGA from 'react-ga4';

// 커스텀 이벤트 트래킹 함수
export const trackEvent = (category, action, label) => {
	ReactGA.event({
		category: category,
		action: action,
		label: label,
	});
};
