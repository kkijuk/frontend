import React from 'react';
import styled from 'styled-components';

const Box = styled.div`
	width: 150px;
	height: 35px;
	flex-shrink: 0;
	border-radius: 10px;
	background: var(--white, #fff);
`;

const Public = styled.div`
	width: 65px;
	height: 25px;
	flex-shrink: 0;
	border-radius: 10px;
	background: var(--sub-gn, #78d333);
`;

const Private = styled.div`
	width: 65px;
	height: 25px;
	flex-shrink: 0;
	border-radius: 10px;
	background: var(--sub-rd, #fa7c79);
`;

//공개 비공개 사이에 간격 있고.. 일단 둘다 배치하고 클릭했을 때 색 보이게 클릭 안된 상태면 색 안보이게 + 텍스트 색깔도 바꿔야 함. 상태 관리(눌렀는지 여부 useState)
export default function Toggle() {
	return (
		<Box>
			<Public></Public>
			<Private></Private>
		</Box>
	);
}
