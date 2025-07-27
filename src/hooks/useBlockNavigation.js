// hooks/useBlockNavigation.js
import { useEffect, useContext } from 'react';
import { UNSAFE_NavigationContext } from 'react-router-dom';

export function useBlockNavigation(shouldBlock, onBlock) {
	const navigator = useContext(UNSAFE_NavigationContext)?.navigator;

	useEffect(() => {
		if (!shouldBlock || !navigator?.block) return;

		const unblock = navigator.block((tx) => {
			onBlock(tx); // tx.retry()
		});

		return () => {
			unblock();
		};
	}, [shouldBlock, onBlock, navigator]);
}
