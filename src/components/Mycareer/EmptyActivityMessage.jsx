import styled from 'styled-components';

const MessageContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	color: var(--gray-01, #424242);
	text-align: center;
`;

const MessageTitle = styled.div`
	color: var(--gray-01, #424242);
	font-size: 20px;
	font-weight: 400;
	margin-bottom: 14px;
`;

const MessageContent = styled.div`
	font-size: 16px;
	color: var(--gray-02, #707070);
	font-weight: 400;
`;

export default function EmptyActivityMessage() {
	return (
		<MessageContainer>
			<MessageTitle>아직 등록된 활동이 없어요.</MessageTitle>
			<MessageContent>오른쪽 아래의 버튼을 눌러 끼적을 시작해보세요!</MessageContent>
		</MessageContainer>
	);
}
