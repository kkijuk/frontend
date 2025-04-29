import React, { lazy } from 'react';

import { ROUTES } from '@constants/routes';

const ApplySchedule = lazy(() => import('@pages/Apply/ApplySchedule'));
const ApplyStatus = lazy(() => import('@pages/Apply/ApplyStatus'));
const ApplyDetail = lazy(() => import('@pages/Apply/ApplyDetail'));
const FilterPage = lazy(() => import('@components/Apply/FilterPage'));

export const applyRoutes = [
	{ path: ROUTES.APPLY_SCHEDULE, element: <ApplySchedule /> },
	{ path: ROUTES.APPLY_STATUS, element: <ApplyStatus /> },
	{ path: ROUTES.APPLY_DETAIL, element: <ApplyDetail /> },
	{ path: ROUTES.FILTER, element: <FilterPage /> },
];
