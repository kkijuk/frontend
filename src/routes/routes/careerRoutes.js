import { ROUTES } from '@/constants/routes';
import React, { lazy } from 'react';

const MyCareer = lazy(() => import('@pages/Mycareer/Mycareer'));
const MycareerSearch = lazy(() => import('@pages/Mycareer/MycareerSearch'));
const MycareerDetail = lazy(() => import('@pages/Mycareer/MycareerDetail'));

export const careerRoutes = [
	{ path: ROUTES.MYCAREER, element: <MyCareer /> },
	{ path: ROUTES.MYCAREER_SEARCH, element: <MycareerSearch /> },
	{ path: ROUTES.MYCAREER_DETAIL, element: <MycareerDetail /> },
];
