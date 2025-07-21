// useBeforeUnload.js
import { useEffect } from 'react';

export function useBeforeUnload(shouldBlock) {
	useEffect(() => {
		const handler = (e) => {
			if (!shouldBlock) return;
			e.preventDefault();
			e.returnValue = ''; // 일부 브라우저는 이 문자열을 무시함
		};

		window.addEventListener('beforeunload', handler);
		return () => window.removeEventListener('beforeunload', handler);
	}, [shouldBlock]);
}
