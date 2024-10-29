import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
	width: 820px;
	height: 300px;
`;

const Box = styled.div`
	width: 820px;
	height: 505px;
	flex-shrink: 0;
	border-radius: 10px;
	background: var(--gray-06, #f5f5f5);
`;

export default function SelectResume() {
	return (
		<Wrapper>
			<Box></Box>
		</Wrapper>
	);
}
