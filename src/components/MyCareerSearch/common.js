import styled from 'styled-components';
import { theme } from '../../constants/theme';

export const Container = styled.div`
	width: 100%;
	max-width: 820px;
	box-sizing: border-box;
	// padding: 0 15px;

	@media (max-width: ${theme.breakpoints.md}) {
		padding: 0 10px;
	}
`;
