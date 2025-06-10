import styled from 'styled-components';

export const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	width: 100vw;
	height: 100vh;
`;

export const Logo = styled.div`
	width: 80px;
	height: 40px;
	margin-bottom: 160px;

	img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
`;

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 280px;
	height: 391px;
	flex-shrink: 0;
	margin-top: 32px;
`;

export const TitleText = styled.div`
	color: var(--black, #000);
	text-align: center;
	font-family: Pretendard;
	font-size: 24px;
	font-weight: 700;
	margin-bottom: 48px;
`;

export const Container2 = styled.div`
	display: flex;
	width: 220px;
	flex-direction: column;
	align-items: center;
	gap: 24px;
`;

export const Text = styled.div`
	align-self: stretch;
	color: var(--gray-02, #707070);
	text-align: center;
	font-family: Pretendard;
	font-size: 16px;
	font-weight: 400;
`;

export const MainButton = styled.button`
	width: 220px;
	height: 52px;
	flex-shrink: 0;
	border-radius: 10px;
	background: var(--gray-02, #707070);
	border: none;

	color: #fff;
	text-align: center;
	font-family: Pretendard;
	font-size: 18px;
	font-weight: 500;
`;
