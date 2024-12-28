const distributeTimelinePositions = (data) => {
	const maxRows = 4; // 최대 4줄
	const positions = Array(maxRows)
		.fill(null)
		.map(() => []); // 각 줄의 데이터를 저장할 배열

	const sortedData = data.sort((a, b) => {
		// 1. 시작일이 빠른 순으로 정렬
		const startDiff = a.y[0] - b.y[0];
		if (startDiff !== 0) return startDiff;

		// 2. 기간이 긴 순으로 정렬
		const durationA = a.y[1] - a.y[0];
		const durationB = b.y[1] - b.y[0];
		return durationB - durationA;
	});

	const updatedData = sortedData.filter((item) => {
		// 각 행에 대해 가장 적합한 위치 찾기
		let assigned = false;
		for (let row = 0; row < maxRows; row++) {
			// 현재 행의 데이터들과 겹치는지 확인
			const hasOverlap = positions[row].some(
				(existingItem) => !(item.y[1] < existingItem.y[0] || item.y[0] > existingItem.y[1]),
			);

			if (!hasOverlap) {
				// 겹치지 않는 경우 해당 행에 할당
				positions[row].push(item);
				item.x = String(row); // x값을 문자열로 할당
				assigned = true;
				break;
			}
		}
		// 네 줄 모두에 겹치는 경우 배열에서 제외
		return assigned;
	});

	return updatedData;
};

export default distributeTimelinePositions;
