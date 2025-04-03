export const formatDate = (startdate, enddate, unknown) => {
	const formattedStartDate = formateDateDashToDot(startdate);
	const formattedEndDate = formateDateDashToDot(enddate);

	if (unknown === true) {
		return `${formattedStartDate} ~ ing`;
	}
	return startdate === enddate ? formattedStartDate : `${formattedStartDate} ~ ${formattedEndDate}`;
};

export const formateDateDashToDot = (dateString) => {
	if (!dateString) return '';

	// YYYY-MM-DD 형식을 YYYY.MM.DD 형식으로 변환
	return dateString.replace(/-/g, '.');
};
