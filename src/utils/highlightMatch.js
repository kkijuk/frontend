export const highlightMatch = (text, keyword) => {
	if (!keyword) return text; // 검색어가 없으면 원본 텍스트 그대로 반환

	// 정규식을 이용해 keyword를 찾는다 (대소문자 구분 없이)
	const regex = new RegExp(`(${keyword})`, 'gi');

	// 검색어가 포함되지 않은 경우 원본 반환
	if (!regex.test(text)) return text;

	// 검색어를 기준으로 문자열을 split하고, 강조 표시
	return text
		.split(regex)
		.map((part, index) => (part.toLowerCase() === keyword.toLowerCase() ? <b key={index}>{part}</b> : part));
};
