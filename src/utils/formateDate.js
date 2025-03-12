export const formatDate = (startdate, enddate, unknown) => {
	if (unknown) {
		return `${startdate} ~ ing`;
	}
	return startdate === enddate ? startdate : `${startdate} ~ ${enddate}`;
};
