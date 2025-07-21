import { useContext, useEffect } from 'react';
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';

export function useBlockNavigation(shouldBlock, onNavigate) {
	const navigator = useContext(NavigationContext).navigator;

	useEffect(() => {
		console.log('useBlockNavigation called, shouldBlock:', shouldBlock);
		if (!shouldBlock || typeof navigator.block !== 'function') return;

		const unblock = navigator.block((tx) => {
			console.log('Navigation blocked:', tx);
			onNavigate(tx); // tx.retry()로 이동 재시도 가능
		});

		return unblock;
	}, [shouldBlock, onNavigate, navigator]);
}
