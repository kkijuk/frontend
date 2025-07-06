import React, { lazy } from 'react';

import { ROUTES } from '@/constants/routes';

const SubNav = lazy(() => import('@components/Intro/SubNav'));
const History = lazy(() => import('@pages/History/History'));
const ViewOptions = lazy(() => import('@pages/History/ViewOptions'));
const Master = lazy(() => import('@pages/History/Master'));
const Others = lazy(() => import('@pages/History/Others'));
const Portfolio = lazy(() => import('@pages/History/Portfolio'));
const MasterRewrite = lazy(() => import('@pages/History/MasterRewrite'));
const OthersRewrite = lazy(() => import('@pages/History/OthersRewrite'));
const Select = lazy(() => import('@pages/History/Select'));
const ResumePdf = lazy(() => import('@pages/History/ResumePDF'));

export const historyRoutes = [
	{
		path: ROUTES.HISTORY,
		element: <SubNav />,
		children: [
			{ path: '', element: <History /> },
			{
				path: 'master',
				element: <ViewOptions />,
				children: [{ path: '', element: <Master /> }],
			},
			{
				path: 'others/:id',
				element: <ViewOptions />,
				children: [{ path: '', element: <Others /> }],
			},
			{
				path: 'list/:state',
				element: <ViewOptions />,
			},
			{ path: 'portfolio', element: <Portfolio /> },
		],
	},
	{ path: ROUTES.HISTORY_MASTER_REWRITE, element: <MasterRewrite /> },
	{ path: ROUTES.HISTORY_OTHERS_REWRITE, element: <OthersRewrite /> },
	{ path: ROUTES.HISTORY_SELECT, element: <Select /> },
	{ path: ROUTES.HISTORY_RESUME_EXPORT, element: <ResumePdf /> },
];
