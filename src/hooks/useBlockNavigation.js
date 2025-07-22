// useBlockNavigation.js (hooks 폴더에 만들어서 재사용 가능)
import { useEffect } from 'react';
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';
import { useContext } from 'react';

export function useBlockNavigation(shouldBlock, onBlock) {
	const navigator = useContext(NavigationContext).navigator;

	useEffect(() => {
		if (!shouldBlock) return;

		const unblock = navigator.block((tx) => {
			onBlock(tx); // tx.retry()를 저장해두고 나중에 실행 가능
		});
		return unblock;
	}, [shouldBlock, onBlock, navigator]);
}
