// hook/MycareerDetail/useCareerQueries.js
import { useQuery } from '@tanstack/react-query';
import { ViewCareerDetail } from '@/api/Mycareer/ViewCareerDetail';
import { CareerViewSelect } from '@/api/Mycareer/CareerviewSelect';

const categoryToTypeMap = {
	대외활동: 'activity',
	동아리: 'circle',
	프로젝트: 'project',
	교육: 'edu',
	공모전대회: 'competition',
	경력: 'employment',
	기타: 'etc',
};

export const useCareerList = () => {
	return useQuery({
		queryKey: ['careerList'],
		queryFn: () => CareerViewSelect('all').then((res) => {
			return res.data.map((career) => ({
				...career,
				startdate: career.startdate || career.startDate,
			}));
		}),
		staleTime: 1000 * 60 * 5,
	});
};

export const useCareerDetail = (careerId, categoryKo) => {
	const categoryEn = categoryToTypeMap[categoryKo] || categoryKo;

	return useQuery({
		queryKey: ['careerDetail', careerId, categoryEn],
		queryFn: () =>
			ViewCareerDetail(careerId, categoryEn).then((res) => {
				const d = res.data;
				return {
					...d,
					startdate: d.startdate || d.startDate,
					endDate: d.endDate || d.enddate,
				};
			}),
		enabled: !!careerId && !!categoryKo, // 둘 다 존재할 때만 요청
		staleTime: 1000 * 60 * 5,
	});
};
