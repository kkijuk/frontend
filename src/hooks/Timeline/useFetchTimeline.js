import { useQuery } from '@tanstack/react-query';

import { getTimeline } from '../../api/Timeline/getTimeline';

export const useFetchTimeline = () => {
	const { data, isLoading, error } = useQuery({
		queryKey: 'timeline',
		queryFn: () => getTimeline(),
	});

	console.log('data', data);

	return { data, isLoading, error };
};
