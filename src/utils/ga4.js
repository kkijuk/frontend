import ReactGA from 'react-ga4';

// 커스텀 이벤트 트래킹 함수
export const trackEvent = (eventName, params) => {
	ReactGA.event(eventName, params);
};
