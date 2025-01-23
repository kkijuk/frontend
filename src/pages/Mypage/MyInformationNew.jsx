import React, { useState, useEffect } from 'react';
import SubNav from '../../components/Mypage/SubNav';
import styled from 'styled-components';
import axios from 'axios';
import { fetchMyinfo, changeMyinfo } from '../../api/Mypage/Myinformation';

const ContentBox = styled.div`
	width: 450px;
	height: 96px;
`;

const ContentName = styled.div`
	height: 21px;
	color: var(--main-01, #3aaf85);
	font-family: Pretendard;
	font-size: 18px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;

	margin-bottom: 20px;
`;

const Box = styled.div`
	width: 430px;
	justify-content: space-between;
	margin-left: 30px;
`;

const Content = styled.div`
	height: 19px;
	color: #000;
	font-family: Pretendard;
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
`;

const EditButton = styled.button`
	width: 65px;
	height: 25px;
	border-radius: 10px;
	background: var(--gray-06, #f5f5f5);

	color: var(--gray-02, #707070);
	text-align: center;
	font-family: Pretendard;
	font-size: 14px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const Top = styled.div`
	width: 464px;
	margin-top: 7px;
	margin-bottim: 31px;
`;
const Container2 = styled.div`
	width: 400px;
	margin: 0 auto;
`;

const Middle = styled.div`
	width: 400px;
`;

const Bottom = styled.div`
	width: 464px;
	height: 196px;
	margin-top: 47px;
`;

const Text1 = styled.div`
	color: var(--black, #000);
	font-family: Pretendard;
	font-size: 20px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
`;

const Text2 = styled.div`
	margin-bottom: ${(props) => props.marginBottom};
	color: var(--main-01, #3aaf85);
	font-family: regular;
	font-size: 18px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
	margin-top: 32px;
`;

const Input = styled.input`
	height: 50px;
	border-radius: 10px;
	width: 400px;
	background-color: ${(props) => props.backgroundColor || '#F5F5F5'};
	color: ${(props) => props.color || 'black'};
	border: ${(props) => props.border || 'none'};
	border-color: ${(props) => props.borderColor || 'black'};

	fint-family: regular;
	font-size: 15px;
	padding-left: 20px; /* padding-left 속성 추가 */
	box-sizing: border-box;
`;

const CheckBoxContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 129px;
	margin-left: 102px;
`;

const CheckBoxContainer1 = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
	margin-top: 20px;
	margin-left: 52px;
`;

const CheckBoxContainer2 = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
	margin-top: 10px;
`;

const CheckBoxContainer3 = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
	margin-top: 10px;
`;

const CustomCheckBox = styled.input.attrs({ type: 'checkbox' })`
	width: 19px;
	height: 19px;
	border-radius: 4px;
	border: 1px solid var(--gray-03, #d9d9d9);
	background: #fff;
`;

const Button = styled.button`
	width: 400px;
	height: 50px;
	flex-shrink: 0;
	border-radius: 10px;
	background: var(--main-01, #3aaf85);
	border: none;
	color: #fff;

	margin-left: 32px;
	margin-top: 34px;
	text-align: center;
	font-family: Pretendard;
	font-size: 18px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
`;

export default function MyInformation() {
	return (
		<Container>
			<SubNav></SubNav>
			<ContentBox>
				<ContentName>이메일</ContentName>
				<Box>
					<Content></Content>
					<EditButton></EditButton>
				</Box>
			</ContentBox>

			<ContentBox>
				<ContentName>이름</ContentName>
				<Box>
					<Content></Content>
					<EditButton></EditButton>
				</Box>
			</ContentBox>

			<ContentBox>
				<ContentName>연락처</ContentName>
				<Box>
					<Content></Content>
					<EditButton></EditButton>
				</Box>
			</ContentBox>

			<ContentBox>
				<ContentName>생년월일</ContentName>
				<Box>
					<Content></Content>
					<EditButton></EditButton>
				</Box>
			</ContentBox>
		</Container>
	);
}
