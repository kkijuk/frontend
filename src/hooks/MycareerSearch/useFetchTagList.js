import { useQuery } from '@tanstack/react-query';
import { getActivityTagList } from '../../api/MycareerSearch/getActivityTagList';

export const useFetchTagList = (searchParam) => {
	const { data, isLoading, error } = useQuery({
		queryKey: ['tagList', searchParam],
		queryFn: () => getActivityTagList(searchParam),
		staleTime: 1000 * 60 * 5, // 캐싱 시간 5분
	});

	return { data, isLoading, error };
};
