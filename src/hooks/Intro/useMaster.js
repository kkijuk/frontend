import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { readMaster, updateMaster } from "@/api/Intro/master";

// 마스터 자기소개서 조회
export const useReadMaster = () => {
    return useQuery({
        queryKey: ['masterIntro'], // 쿼리 키는 masterIntro로 구성
        queryFn: readMaster,
    });
}

// 마스터 자기소개서 수정
export const useUpdateMaster = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => updateMaster(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['masterIntro'] }); // 마스터 자기소개서 쿼리 다시 생성
        }
    })
}