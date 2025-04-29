import React, { lazy } from 'react';

import { ROUTES } from '@/constants/routes';

const Home = lazy(() => import('@pages/Home'));
const Browser = lazy(() => import('@pages/Error/Browser'));
const Community = lazy(() => import('@pages/Community'));
const Error = lazy(() => import('@pages/Error/BasicError'));
const NumError = lazy(() => import('@pages/Error/NumError'));
const ServiceMaintenence = lazy(() => import('@pages/Error/ServiceMaintenence'));

export const miscRoutes = [
	{ path: ROUTES.HOME, element: <Home /> },
	{ path: ROUTES.BROWSER_ERROR, element: <Browser /> },
	{ path: ROUTES.COMMUNITY, element: <Community /> },
	{ path: ROUTES.ERROR, element: <Error /> },
	{ path: ROUTES.NUM_ERROR, element: <NumError /> },
	{ path: ROUTES.SERVICE_MAINTENANCE, element: <ServiceMaintenence /> },
];
