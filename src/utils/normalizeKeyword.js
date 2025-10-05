// 한글은 그대로, 영문은 소문자로 변환
// @param {string} keword
// @returns {string} Normalized keyword

export const normalizeKeyword = (keyword) => {
    if (typeof keyword !== 'string') return '';

    const trimmed = keyword.trim();

    const result = [...trimmed]
        .map(char => {
            if(/[A-Z]/.test(char)) return char.toLowerCase(); // 대문자 영문이면 소문자
            return char; // 그 외(한글, 숫자, 기호)는 그대로
        })
        .join('');

    return result;
}