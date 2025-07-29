// src/hooks/useBlockNavigation.js
import { useContext, useEffect } from 'react';
import { UNSAFE_NavigationContext as NavigationContext, useLocation } from 'react-router-dom';

export function useBlockNavigation(when, onBlock) {
	const navigator = useContext(NavigationContext).navigator;
	const location = useLocation();

	useEffect(() => {
		if (!when) return;

		const unblock = navigator.block((tx) => {
			if (location.pathname !== tx.location.pathname) {
				onBlock(tx); // 페이지 이동 시도 시 콜백 실행
			}
		});

		return unblock;
	}, [when, onBlock, location, navigator]);
}
