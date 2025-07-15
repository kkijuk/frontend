import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { readIntro, updateIntro } from "@/api/Intro/intro";
import { getRecruitDetails } from "@/api/Apply/RecruitDetails";
import { updateRecruit } from "@/api/Apply/RecruitUpdate";

// 참고) createIntro, deleteIntro는 캐시 사용 X

// others 자기소개서 조회
export const useReadIntro = (introId) => {
    return useQuery({
        queryKey: ['intro', introId], // 쿼리 키는 intro와 introId로 구성
        queryFn: () => readIntro(introId),
        enabled: !!introId, // introId가 있을 때만 쿼리 실행
    })
}

// others 자기소개서 수정
export const useUpdateIntro = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ introId, data }) => updateIntro(introId, data),
        onSuccess: (_, variables) => { // variables: mutationFn에 넘긴 { introId, data } 객체
            queryClient.invalidateQueries({ queryKey: ['intro', variables.introId] }); // 해당 자기소개서 쿼리 다시 생성
        }
    })
}

// 자기소개서에 연결된 공고 정보 조회
export const useReadRecruitAtIntro = (recruitId) => {
    return useQuery({
        queryKey: ['recruit', recruitId], // 쿼리 키는 recruit와 recruitId로 구성
        queryFn: () => getRecruitDetails(recruitId),
        enabled: !!recruitId, // recruitId가 있을 때만 쿼리 실행
    })
}

// 자기소개서 수정 페이지에서 공고 정보 수정 시
export const useUpdateRecruitAtIntro = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ recruitId, introId, data}) => updateRecruit(recruitId, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries(['intro', variables.introId]); // 해당 자기소개서 쿼리 다시 생성
        }
    })
}