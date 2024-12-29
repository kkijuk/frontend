import { useQuery } from '@tanstack/react-query';

import { getActivityDetailSearch } from '../../api/MycareerSearch/getActivityDetailSearch';

export const useFetchActivityDetail = (searchParam, sort) => {
	const { data, isLoading, error } = useQuery({
		queryKey: ['activityDetail', searchParam, sort],
		queryFn: () => getActivityDetailSearch(searchParam, sort),
	});
	return { data, isLoading, error };
};
