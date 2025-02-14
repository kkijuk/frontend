import React from 'react';
import Error from '../../components/shared/Error';

export default function BrowserError() {
	return (
		<Error
			title="지원하지 않는 브라우저입니다."
			content={`원활한 서비스 이용을 위해 다른 브라우저를 사용해 주세요.\nChrome, Safari, Whale 등을 권장합니다.`}
			showErrorNum={false} // 404ERORR 안보임
			showHomeButton={false} // 홈으로 버튼 안보임
		/>
	);
}
