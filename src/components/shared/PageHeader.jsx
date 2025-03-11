import styled from 'styled-components';

const Container = styled.div`
	width: 100%;
	max-width: 820px;
	height: 36px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 20px;
	margin-top: 40px;
	box-sizing: border-box;

	@media (max-width: 600px) {
		flex-direction: column;
		align-items: flex-start;
		height: auto;
		margin-top: 20px;
	}
`;

const Title = styled.div`
	color: var(--black, #000);
	font-family: Pretendard;
	font-size: 28px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;

	margin-top: 35px;
`;

const PageHeader = ({ title, children }) => {
	return (
		<Container>
			<Title>{title}</Title>
			{children}
		</Container>
	);
};
