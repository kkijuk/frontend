import { useQuery } from '@tanstack/react-query';

import { getTimeline } from '../../api/Timeline/getTimeline';

export const useFetchTimeline = () => {
	const { data, isLoading, error } = useQuery({
		queryKey: 'timeline',
		queryFn: getTimeline,
	});

	// data가 존재하면 data.data만 반환
	const processedData = data?.data || [];

	return { data: processedData, isLoading, error };
};
