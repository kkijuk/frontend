import React from 'react';
import ButtonRectanglePrimary from '@/components/Button/button-rectangle/primary';
import ButtonRectangleOutline from '@/components/Button/button-rectangle/outline';
import ButtonRectangleSecondary from '@/components/Button/button-rectangle/secondary';
import ButtonRectangleDestructive from '@/components/Button/button-rectangle/destructive';
import ButtonRectangleTertiary from '@/components/Button/button-rectangle/tertiary';

import ButtonCirclePrimary from '@/components/Button/button-circle/primary';
import ButtonCircleSecondary from '@/components/Button/button-circle/secondary';
import ButtonSmallPrimary from '@/components/Button/button-small/primary';
import ButtonSmallSecondary from '@/components/Button/button-small/secondary';
import ButtonSmallOutline from '@/components/Button/button-small/outline';
import ButtonText from '@/components/Button/button-text/text';

export default function Test() {
	return (
		<>
			<ButtonRectanglePrimary text="테스트 버튼" width="200px" height="60px" />
			<ButtonRectanglePrimary text="테스트 버튼" width="200px" height="60px" disabled />

			<ButtonRectangleOutline text="테스트 버튼" width="200px" height="60px" />
			<ButtonRectangleSecondary text="테스트 버튼" width="200px" height="60px" />
			<ButtonRectangleDestructive text="테스트 버튼" width="200px" height="60px" />
			<ButtonRectangleTertiary text="테스트 버튼" width="200px" height="60px" />

			{/* Circle Buttons */}
			<ButtonCirclePrimary />
			<ButtonCircleSecondary />

			{/* Small Buttons */}
			<ButtonSmallPrimary text="기본" />
			<ButtonSmallSecondary text="보조" />
			<ButtonSmallOutline text="외곽선" />

			{/* Text Button */}
			<ButtonText text="텍스트 버튼" />
		</>
	);
}
