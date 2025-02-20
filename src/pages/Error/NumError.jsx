import React from 'react';
import Error from '../../components/shared/Error';

export default function NumError() {
	return (
		<Error
			title="페이지를 찾을 수 없습니다."
			content={`이 주소는 존재하지 않거나 잘못된 링크입니다.\n주소를 확인하시거나, 아래의 방법으로 다시 시도해주세요.`}
			showErrorNum={true} // 404ERROR 보임
			showBackButton={true} // 홈으로 버튼 보임
		/>
	);
}
