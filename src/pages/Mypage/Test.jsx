import React from 'react';
import ButtonRectanglePrimary from '@/components/Button/button-rectangle/primary';
import ButtonRectangleOutline from '@/components/Button/button-rectangle/outline';
import ButtonRectangleSecondary from '@/components/Button/button-rectangle/secondary';
import ButtonRectangleDestructive from '@/components/Button/button-rectangle/destructive';
import ButtonRectangleTertiary from '@/components/Button/button-rectangle/tertiary';
export default function Test() {
	return (
		<>
			<ButtonRectanglePrimary text="테스트 버튼" width="200px" height="60px" />
			<ButtonRectanglePrimary text="테스트 버튼" width="200px" height="60px" disabled />

			<ButtonRectangleOutline text="테스트 버튼" width="200px" height="60px" />
			<ButtonRectangleSecondary text="테스트 버튼" width="200px" height="60px" />
			<ButtonRectangleDestructive text="테스트 버튼" width="200px" height="60px" />
			<ButtonRectangleTertiary text="테스트 버튼" width="200px" height="60px" />
		</>
	);
}
