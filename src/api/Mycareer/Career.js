//무원 생성
import React, { useState } from 'react';
import api from '../../Axios';

// 활동 생성
export const createCareer = async (category, data) => {
	console.log('createCareer:', data);
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
		case 7: //기타
			endpoint = `/career/etc`;
			return;
		default:
			console.log('Unknown category');
			return;
	}

	try {
		const response = await api.post(endpoint, data, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`, // Authorization 헤더에 토큰 포함
			},
		});
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

// 활동 수정
export const editCareer = async (category, careerId, data) => {
	let endpoint = '';
	switch (category) {
		case 1: //동아리
			endpoint = `/career/circle/${careerId}`;
			break;
		case 2: //대외활동
			endpoint = `/career/activity/${careerId}`;
			break;
		case 3: //대회/공모전
			endpoint = `/career/competition/${careerId}`;
			break;
		case 4: //프로젝트
			endpoint = `/career/project/${careerId}`;
			break;
		case 5: //경력
			endpoint = `/career/employment/${careerId}`;
			break;
		case 6: //교육
			endpoint = `/career/educareer/${careerId}`;
			break;
		case 7: //기타
			endpoint = `/career/etc/${careerId}`;
			break;
		default:
			console.log('Unknown category');
			return;
	}

	try {
		const response = await api.patch(endpoint, data, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		});
		console.log('Success-editCareer:', response.data);
		return response.data;
	} catch (error) {
		console.error('Error-editCareer: ', error);
		if (error.response) {
			console.error('Server responded with status code: ', error.response.status);
			console.error('Server responded with:', error.response.data);
		} else if (error.request) {
			console.error('No response received: ', error.request);
		} else {
			console.error('Error setting up request: ', error.message);
		}
	}
};

// 활동 삭제
export const deleteCareer = async (category, careerId) => {
	let endpoint = '';
	switch (category) {
		case 1: //동아리
			endpoint = `/career/circle/${careerId}`;
			break;
		case 2: //대외활동
			endpoint = `/career/activity/${careerId}`;
			break;
		case 3: //대회/공모전
			endpoint = `/career/competition/${careerId}`;
			break;
		case 4: //프로젝트
			endpoint = `/career/project/${careerId}`;
			break;
		case 5: //경력
			endpoint = `/career/employment/${careerId}`;
			break;
		case 6: //교육
			endpoint = `/career/edu/${careerId}`;
			break;
		case 7: //기타
			endpoint = `/career/etc/${careerId}`;
			break;
		default:
			console.log('Unknown category');
			return;
	}

	try {
		const response = await api.delete(endpoint, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		});
		console.log('Success-deleteCareer:', response.data);
		return response.data;
	} catch (error) {
		console.error('Error-deleteCareer: ', error);
		if (error.response) {
			console.error('Server responded with status code: ', error.response.status);
			console.error('Server responded with:', error.response.data);
		} else if (error.request) {
			console.error('No response received: ', error.request);
		} else {
			console.error('Error setting up request: ', error.message);
		}
	}
};
