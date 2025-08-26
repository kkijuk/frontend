const getColorByCategory = (category) => {
	let color;
	switch (category) {
		case '동아리':
		case 'CIRCLE':
			color = '#FCC400';
			break;
		case '대외활동':
		case 'ACTIVITY':
			color = '#77AFF2';
			break;
		case '공모전대회':
		case 'COM':
			color = '#C48DEF';
			break;
		case '프로젝트':
		case 'PROJECT':
			color = '#78D333';
			break;
		case '경력':
		case 'EMP':
			color = '#FA7C79';
			break;
		case '교육':
		case 'EDU':
			color = '#F99538';
			break;
		case '인턴':
			color = '#FF7979'; //세연 추가
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
