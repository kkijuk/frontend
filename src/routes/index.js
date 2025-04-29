import { authRoutes } from './routes/authRoutes';
import { mypageRoutes } from './routes/mypageRoutes';
import { historyRoutes } from './routes/historyRoutes';
import { careerRoutes } from './routes/careerRoutes';
import { applyRoutes } from './routes/applyRoutes';
import { miscRoutes } from './routes/miscRoutes';

export const getAllRoutes = () => [
	...authRoutes,
	...mypageRoutes,
	...historyRoutes,
	...careerRoutes,
	...applyRoutes,
	...miscRoutes,
];
