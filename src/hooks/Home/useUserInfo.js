import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from '@/api/Home/getUserInfo';

export const useUserInfo = () => {
	return useQuery({
		queryKey: ['userInfo'],
		queryFn: getUserInfo,
		staleTime: 1000 * 60 * 5, // 5분간 캐시 유지..근데 이거 왜 필요한거지 찾아보기!
	});
};
