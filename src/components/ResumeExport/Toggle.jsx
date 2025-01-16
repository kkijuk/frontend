import React, { useState } from 'react';
import styled from 'styled-components';

const Box = styled.div`
	width: 150px;
	height: 35px;
	display: flex; /* Flexbox 활성화 */
	justify-content: space-between; /* 좌우 간격 */
	align-items: center; /* 세로 중앙 정렬 */
	border-radius: 10px;
	background: var(--white, #fff);
	padding: 5px;
	box-sizing: border-box;
`;

const PublicText = styled.div`
	color: ${(props) => (props.isActive ? '#fff' : 'var(--gray-03, #d9d9d9)')};
	text-align: center;
	font-family: Pretendard;
	font-size: 14px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
	position: relative;
	z-index: 1;
	cursor: pointer;
`;

const Public = styled.div`
	width: 65px;
	height: 25px;
	border-radius: 10px;
	background: ${(props) => (props.isActive ? 'var(--sub-gn, #78d333)' : 'transparent')};
	position: absolute;
	z-index: 0;
`;

const PrivateText = styled.div`
	color: ${(props) => (props.isActive ? '#fff' : 'var(--gray-03, #d9d9d9)')};
	text-align: center;
	font-family: Pretendard;
	font-size: 14px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
	position: relative;
	z-index: 1;
	cursor: pointer;
`;

const Private = styled.div`
	width: 65px;
	height: 25px;
	border-radius: 10px;
	background: ${(props) => (props.isActive ? 'var(--sub-rd, #fa7c79)' : 'transparent')};
	position: absolute;
	z-index: 0;
`;

const Wrapper = styled.div`
	position: relative;
	width: 65px; /* 텍스트와 배경이 일치하도록 고정 */
	height: 100%; /* 부모(Box) 높이에 맞춤 */
	display: flex; /* Flexbox 활성화 */
	justify-content: center; /* 가로 중앙 정렬 */
	align-items: center; /* 세로 중앙 정렬 */
`;

export default function Toggle() {
	const [isPublic, setIsPublic] = useState(true);

	return (
		<Box>
			<Wrapper>
				<Public isActive={isPublic} />
				<PublicText isActive={isPublic} onClick={() => setIsPublic(true)}>
					공개
				</PublicText>
			</Wrapper>
			<Wrapper>
				<Private isActive={!isPublic} />
				<PrivateText isActive={!isPublic} onClick={() => setIsPublic(false)}>
					비공개{' '}
				</PrivateText>
			</Wrapper>
		</Box>
	);
}
