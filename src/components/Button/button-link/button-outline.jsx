import React from 'react';
import styled from 'styled-components';

const Container = styled.button`
	display: flex;
	padding: 4px 20px;
	justify-content: center;
	align-items: center;
	gap: 10px;
	flex-shrink: 0;
	border-radius: 10px;
	border: 1px solid ${({ disabled }) => (disabled ? '#D0D0D0' : 'var(--gray-04, #d0d0d0)')};
	background: ${({ disabled }) => (disabled ? '#D0D0D0' : 'var(--white, #fff)')};
	cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

	&:hover {
		border: 1px solid ${({ disabled }) => (disabled ? '#D0D0D0' : 'var(--gray-04, #d0d0d0)')};
		background: ${({ disabled }) => (disabled ? '#D0D0D0' : 'var(--gray-06, #f5f5f5)')};
	}
`;

const Text = styled.div`
	color: ${({ disabled }) => (disabled ? '#D0D0D0' : 'var(--gray-02, #707070)')};
	text-align: center;
	font-family: Pretendard;
	font-size: 14px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
`;

const Icon = ({ disabled }) => (
	<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
		<path
			d="M7.25 2H4.25C3.00736 2 2 3.00735 2 4.24999V11.75C2 12.9926 3.00736 14 4.25 14H11.75C12.9926 14 14 12.9926 14 11.75V8.74996M10.2496 2.00018L14 2M14 2V5.37507M14 2L7.62445 8.37478"
			stroke={disabled ? '#D0D0D0' : '#707070'}
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

export default function ButtonLinkOutline({ text, disabled }) {
	return (
		<Container disabled={disabled}>
			<Text disabled={disabled}>{text}</Text>
			<Icon disabled={disabled} />
		</Container>
	);
}
