//무원 생성
import React, { useState } from 'react';
import api from '../../Axios';

const createCareer = async (category, data) => {
	//data 필드명 변경 필요
	// period -> startdate, enddate
	// participantType -> isTeam, teamSize, contribution

	let endpoint = '';
	switch (category) {
		case 1: //동아리
			endpoint = '/career/circle';
			break;
		case 2: //대외활동
			endpoint = '/career/activity';
			break;
		case 3: //대회/공모전
			endpoint = '/career/competition';
			break;
		case 4: //프로젝트
			endpoint = '/career/project';
			break;
		case 5: //경력
			endpoint = '/career/employment';
			break;
		case 6: //교육
			endpoint = '/career/educareer';
			break;
		case 7: //기타... api 없음
			console.log('category number is 7');
			return;
		default:
			console.log('Unknown category');
			return;
	}

	try {
		const response = await api.post(endpoint, data);
		console.log('Success-createCareer:', response.data);
		return response.data;
	} catch (error) {
		console.error('Error-createCareer: ', error);
		if (error.response) {
			// 서버 응답이 있는 경우
			console.error('Server responded with status code: ', error.response.status);
			console.error('Server responded with:', error.response.data);
		} else if (error.request) {
			// 요청이 보내졌지만 응답을 받지 못한 경우
			console.error('No response received: ', error.request);
		} else {
			// 요청 설정 중에 오류가 발생한 경우
			console.error('Error setting up request: ', error.message);
		}
	}
};

export default createCareer;
