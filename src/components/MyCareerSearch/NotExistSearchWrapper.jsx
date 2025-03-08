import styled from 'styled-components';

const Container = styled.div`
	color: var(--gray-02, #707070);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: 40px;
	padding: 20px;

	div {
		margin-bottom: 20px;
	}
`;

const Button = styled.button`
	border-radius: 0.625rem;
	background: var(--main-01, #3aaf85);
	display: flex;
	width: 11.25rem;
	height: 1.875rem;
	justify-content: center;
	align-items: center;
	gap: 0.625rem;
	flex-shrink: 0;
	color: #ffffff;
	font-family: Pretendard, sans-serif;
	font-size: 0.875rem;
	font-weight: 500;
	line-height: normal;
	cursor: pointer;
	border: none;
	transition: background-color 0.3s ease;

	&:hover {
		background-color: #2e9872;
	}
`;

const Text = styled.div`
	color: var(--gray-02, #707070);
	text-align: center;
	font-family: Inter;
	font-size: 0.875rem;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
`;

export const NotExistSearchComponent = ({ query, onClick }) => {
	return (
		<Container>
			<Text>'{query}'의 검색 결과가 없어요.</Text>
			<Button onClick={onClick}>내 활동 보러가기</Button>
		</Container>
	);
};
