import { useContext, useEffect } from 'react';
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';

export function useBlockNavigation(shouldBlock, onNavigate) {
	const navigator = useContext(NavigationContext).navigator;

	useEffect(() => {
		if (!shouldBlock || typeof navigator.block !== 'function') return;

		const unblock = navigator.block((tx) => {
			onNavigate(tx); // tx.retry 저장 → onConfirm에서 실행
		});

		return unblock;
	}, [shouldBlock, onNavigate, navigator]);
}
