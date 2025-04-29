// src/AppWrapper.js
import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';

import { theme } from '@constants/theme';
import queryClient from '@api/queryClient/queryClient';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

export default function AppWrapper() {
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<ThemeProvider theme={theme}>
					<App />
				</ThemeProvider>
			</BrowserRouter>
		</QueryClientProvider>
	);
}
