export const formatDate = (startdate, enddate, unknown) => {
	if (unknown === true) {
		return `${startdate} ~ ing`;
	}
	return startdate === enddate ? startdate : `${startdate} ~ ${enddate}`;
};
