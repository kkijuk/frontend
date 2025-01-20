import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

const useGA4 = () => {
	const location = useLocation();

	// GA4 초기화
	useEffect(() => {
		const measurementId = process.env.REACT_APP_GA_MEASUREMENT_ID;
		if (!measurementId) {
			console.error('GA Measurement ID is missing!');
			return;
		}
		ReactGA.initialize(measurementId);
	}, []);

	// 페이지 변경 시 페이지 뷰 트래킹
	useEffect(() => {
		ReactGA.send({ hitType: 'pageview', page: location.pathname });
	}, [location.pathname]);
};

export default useGA4;
