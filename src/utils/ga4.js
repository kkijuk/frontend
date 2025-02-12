import ReactGA from 'react-ga4';

// 커스텀 이벤트 트래킹 함수
export const trackEvent = (action, category, label, value = 'default') => {
	ReactGA.event({
		action: action,
		category: category,
		label: label,
		value: value,
	});
};
