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

import ButtonLinkPrimary from '@/components/Button/button-link/button-outline';
import ButtonLinkOutline from '@/components/Button/button-link/button-outline';
import { Button } from './Confirm.styles';
import DatePickerMultiCalendar from '@/components/Calendar/DatePickerMultiCalendar';
import DatePickerSingleCalendar from '@/components/Calendar/DatePickerSingleCalendar';


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
			<ButtonSmallPrimary text="기본" width="fit-content" />
			<ButtonSmallSecondary text="보조" width="fit-content" />
			<ButtonSmallOutline text="외곽선" width="fit-content" />
			{/* Text Button */}
			<ButtonText text="텍스트 버튼" />

			<ButtonLinkPrimary text="지원하러 가기" />
			<ButtonLinkOutline text="공고 보러가기" />

			<ButtonLinkPrimary text="지원하러 가기" disabled />
			<ButtonLinkOutline text="공고 보러가기" disabled />

			<DatePickerMultiCalendar/>
			<DatePickerSingleCalendar />
		</>
	);
}
