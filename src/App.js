import React from 'react';
import styled from 'styled-components';
import AppRoutes from '@routes/AppRoutes';
import { BrowserRouter } from 'react-router-dom';

const AppContainer = styled.div`
	display: flex;
	flex-direction: column;
	min-height: 100vh;
`;

export default function App() {
	return (
		<AppContainer>
			<AppRoutes />
		</AppContainer>
	);
}
