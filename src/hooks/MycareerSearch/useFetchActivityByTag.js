import { useQuery } from '@tanstack/react-query';
import { getActivityByTag } from '../../api/MycareerSearch/getActivityByTag';

export const useFetchActivityByTag = (tagID, sort) => {
	const { data, isLoading, error } = useQuery({
		queryKey: ['activityByTag', tagID, sort],
		queryFn: () => getActivityByTag(tagID, sort),
		enabled: !!tagID, // tagID가 있을 때만 실행
		staleTime: 1000 * 60 * 5,
	});

	return { data, isLoading, error };
};
