import styled from 'styled-components';
import { theme } from '@/constants/theme';
import { Color } from '@/constants/color';

const ContentWrapper = styled.div`
	width: 100%;
	display: flex;
	align-items: flex-start;
	margin-bottom: ${({ isLastItem }) => (isLastItem ? '0' : '42px')};
	font-family: 'Regular';
	positon: relative;

	@media (max-width: ${theme.breakpoints.md}) {
		margin-bottom: ${({ isLastItem }) => (isLastItem ? '0' : '40px')};
	};
`;