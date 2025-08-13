import { useQuery } from "@tanstack/react-query";
import { readMaster } from "@/api/Intro/master";
import { readIntro } from "@/api/Intro/intro";
import { ViewCareerDetail } from "@/api/Mycareer/ViewCareerDetail";
import {
    normalizeActivityDetail,
    normalizeMasterIntro,
    normalizeRegularIntro,
} from "@/utils/introHelperDetailNormalizers";


const categoryMapping = {
    ACTIVITY: 'activity',
    PROJECT: 'project',
    EDU: 'edu',
    EMP: 'employment',
    CIRCLE: 'circle',
    COM: 'competition',
    ETC: 'ETC',
};

// target 객체 형식
// 유형 1) {type: 'activity', id: item.careerId, careerType: item.category}
// 유형 2) {type: 'intro', id, introKind: isMaster ? 'master' : 'regular'}

const queryKeyFromTarget = (t) => {
    if(!t) return ["detail", "none"];
    const catEn = t?.careerType?.categoryEnName || null;
    return ["detail", t.type, t.introKind || null, t.id, catEn]; 
}

export default function useIntroHelperDetail(target) {
    return useQuery({
        queryKey: queryKeyFromTarget(target),
        enabled: !!target,
        staleTime: 1000 * 60 * 5,
        queryFn: async () => {
            console.log('useIntroHelperDetail 쿼리 실행:', target);

            if(!target) return null;

            if(target.type === 'activity') {
                const en = target?.careerType?.categoryEnName;
                if(!en) throw new Error("activity 상세 조회에 categoryEnName이 필요합니다.");
                const cat = categoryMapping[en] || 'unknown';
                const res = await ViewCareerDetail(target.id, cat);
                console.log('activity 상세 쿼리 조회 결과:', res);
                return res?.data || null;
            }

            if(target.type === 'intro' && target.introKind === 'master') {
                const res = await readMaster();
                console.log('master 자소서 쿼리 조회 결과:', res);
                return res || null;
            }

            if(target.type === 'intro' && target.introKind === 'regular') {
                const res = await readIntro(target.id);
                console.log('regular 자소서 쿼리 조회 결과:', res);
                return res || null;
            }
        },

        // 정규화
        select: (raw) => {
            if (!raw) return null;
            if (target.type === 'activity') return normalizeActivityDetail(raw);
            if (target.type === 'intro' && target.introKind === 'master') return normalizeMasterIntro(raw);
            return normalizeRegularIntro(raw);
        }

    })
}