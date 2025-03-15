import { useQuery } from '@tanstack/react-query';

import { getMycareerActivityByView } from '../../api/Mycareer/getMycareerActiviyByView';

export const useFetchMycareerActivity = (view) => {
	const { data, isLoading, error } = useQuery({
		queryKey: ['mycareer_activity', view],
		queryFn: () => getMycareerActivityByView(view),
	});

	return { data, isLoading, error };
};
