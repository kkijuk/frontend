import { ROUTES } from '@constants/routes';

export const shouldShowPageFooter = (pathname) => {
	const showPageFooterRoutes = [
		ROUTES.MYCAREER,
		ROUTES.MYCAREER_SEARCH,
		ROUTES.MYCAREER + '/',
		ROUTES.APPLY_SCHEDULE,
		ROUTES.APPLY_STATUS,
		ROUTES.APPLY_DETAIL.replace('/:id', '/'),
		ROUTES.FILTER,
	];

	return showPageFooterRoutes.some((route) => pathname.startsWith(route));
};

export const shouldHideHeader = (pathname) => {
	const hideHeaderRoutes = [
		ROUTES.COMMING_SOON,
		ROUTES.SIGNUP,
		ROUTES.SIGNUP_INTEREST,
		ROUTES.SIGNUP_SUCCESS,
		ROUTES.PRIVACY_AGREED,
		ROUTES.DELETE_ACCOUNT,
		ROUTES.SERVICE_MAINTENANCE,
	];

	return hideHeaderRoutes.includes(pathname);
};

export const shouldHideHeaderFooter = (pathname) => {
	const hideHeaderFooterRoutes = [ROUTES.BROWSER_ERROR, ROUTES.ROOT];

	return hideHeaderFooterRoutes.includes(pathname);
};
