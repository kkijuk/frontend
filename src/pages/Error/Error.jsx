import React from 'react';
import Error from '../../components/shared/Error';

export default function Error() {
	return (
		<Error
			title="예상치 못한 문제가 발생했습니다."
			content={`네트워크 상태를 확인하거나, 잠시 후 다시 시도해주세요.\n문제가 지속된다면 관리자에게 문의해주세요.`}
			showErrorNum={false} // 404ERROR 안보임
			showBackButton={true} //이전 화면 버튼 보임
		/>
	);
}
