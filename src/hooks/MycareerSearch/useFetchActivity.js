import { useQuery } from '@tanstack/react-query';

import { getActivitySearch } from '../../api/MycareerSearch/getActivitySearch';

export const useFetchActivity = (searchParam, sort) => {
	const { data, isLoading, error } = useQuery({
		queryKey: ['activity', searchParam, sort],
		queryFn: () => getActivitySearch(searchParam, sort),
	});

	return { data, isLoading, error };
};
