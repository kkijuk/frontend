import { readIntro } from "@/api/Intro/intro";
import { getRecruitDetails } from "@/api/Apply/RecruitDetails";

export async function getRecruitStatusByIntroId(introId) {
    try {
        const introRes = await readIntro(introId);
        const recruitId = introRes.recruitId;
        if (!recruitId) { return 'UNKNOWN'; }

        const recruitRes = await getRecruitDetails(recruitId);
        const status = recruitRes?.status || 'UNKNOWN';

        console.log(`Intro ID ${introId}의 Recruit ID ${recruitId} 상태:`, status);
        return status;
    } catch (error) {
        console.error('Error in getRecruitStatusByIntroId:', error);
        return 'UNKNOWN';
    }
}

export async function attachRecruitStatusToItems(items) {
  // introId만 뽑아 중복 제거
  const introIds = Array.from(
    new Set(
      (items ?? [])
        .map(it => it.introId)
        .filter(Boolean)
    )
  );

  // 병렬 조회
  const results = await Promise.allSettled(introIds.map(getRecruitStatusByIntroId));

  // id → status 매핑
  const statusMap = {};
  results.forEach((r, idx) => {
    const id = introIds[idx];
    statusMap[id] = r.status === 'fulfilled' ? (r.value?.status ?? 'UNKNOWN') : 'UNKNOWN';
  });

  // 원본에 주입(불변성 유지)
  const merged = (items ?? []).map(it => {
    if (it.masterIntroId) return { ...it }; // 마스터는 별도 규칙, status 불필요
    if (it.introId) {
      return { ...it, applyStatus: statusMap[it.introId] ?? 'UNKNOWN' };
    }
    return { ...it, applyStatus: 'UNKNOWN' };
  });

  return merged;
}