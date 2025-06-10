import { useQuery } from '@tanstack/react-query';

import { getMycareerActivityByView } from '../../api/Mycareer/getMycareerActiviyByView';

export const useFetchMycareerActivity = (view, refreshKey = 0) => {
	const { data, isLoading, error } = useQuery({
		queryKey: ['mycareer_activity', view, refreshKey],
		queryFn: () => getMycareerActivityByView(view),
	});

	return { data, isLoading, error };
};
