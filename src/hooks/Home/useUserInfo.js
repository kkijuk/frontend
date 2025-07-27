import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from '@/api/Home/getUserInfo';

export const useUserInfo = () => {
	return useQuery({
		queryKey: ['userInfo'],
		queryFn: getUserInfo,
		staleTime: 1000 * 60, // 5분간 캐시 유지..근데 이거 왜 필요한거지 찾아보기! -> 1분으로 변경
		refetchOnWindowFocus: true, // 탭을 다시 클릭하면 refetch
		refetchOnMount: false, // 컴포넌트 마운트될 때는 refetch 안 함
	});
};
