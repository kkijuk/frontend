const getColorByCategory = (category) => {
	let color;
	switch (category) {
		case '동아리':
			color = '#FCC400';
			break;
		case '대외활동':
			color = '#77AFF2';
			break;
		case '공모전대회':
			color = '#C48DEF';
			break;
		case '프로젝트':
			color = '#78D333';
			break;
		case '경력':
			color = '#FA7C79';
			break;
		case '교육':
			color = '#F99538';
			break;
		case '기타':
			color = '#707070';
			break;
		default:
			color = '#707070';
	}
	return color;
};

export default getColorByCategory;
