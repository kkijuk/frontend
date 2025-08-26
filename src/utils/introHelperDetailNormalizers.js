import { formateDateDashToDot } from "./formateDate";

// DetailDisplay 화면 공통 포맷으로 정규화
const range = (s, e) => (s || e ? `${formateDateDashToDot(s)} ~ ${e ? formateDateDashToDot(e) : "현재"}` : "");

// 활동 기록
export const normalizeActivityDetail = (data = {}) => {
    return {
        kind: 'activity',
        id: data.careerId,
        title: data.name || "", // 현재 title은 안 불러와짐
        subTitle: data.alias || "",
        category: data.category.categoryEnName || "",
        blocks: (data.detailList || []).map((d) => ({
            detailId: d.detailId,
            title: d.title || "",
            content: d.content || "",
            dateText: range(d.startDate, d.endDate),
            tags: d.detailTag || [],
        })),
        raw: data,
    }

};

// 마스터 자소서
export const normalizeMasterIntro = (data = {}) => {
    return {
        kind: 'intro-master',
        id: data.id,
        title: data.oneLiner || "",
        dateText: formateDateDashToDot(data.updatedAt) || "",
        tags: [], // master 자소서는 태그 없음
        qna: (data.questionList || []).map((q) => ({
            number: q?.number || 0,
            title: q?.title || "",
            content: q?.content || "",
        })),
        raw: data,
    }
    
}

// 개별 자소서
export const normalizeRegularIntro = (data = {}) => {
    return {
        kind: 'intro-regular',
        id: data.id,
        recruitId: data.recruitId,
        title: data.recruitTitle || "",
        dateText: formateDateDashToDot(data.updatedAt) || "",
        tags: Array.isArray(data.tags) ? data.tags : [],
        qna: (data.questionList || []).map((q) => ({
            number: q?.number || 0,
            title: q?.title || "",
            content: q?.content || "",
        })),
        raw: data,
    }
}