import React from 'react';
import styled from 'styled-components';

const ResetSuccessScreen = styled.div`
	max-width: flex;
	margin: 50px auto;
	padding: 20px;
	background: white;
	border-radius: 10px;
	text-align: center;
	margin-bottom: 90px;
	position: relative;
	top: 70px;

	p {
		margin-bottom: 10px;
		color: var(--main-01, #3aaf85);
		text-align: center;
		font-family: REgular;
		font-size: 27px;
		font-style: normal;
		font-weight: 700;
		line-height: normal;
	}

	.button {
		width: 160px;
		height: 50px;
		flex-shrink: 0;
		padding: 10px;
		margin: 10px 0;
		border: none;
		border-radius: 10px;
		background-color: #3aaf85;
		color: white;
		font-family: 'Light';
		font-size: 19px;
		font-weight: 500;
		cursor: pointer;
		margin-top: 15px;
	}

	.successtext {
		color: black;
		text-align: center;
		font-family: Light;
		font-size: 19px;
		font-weight: 400;
		line-height: normal;
		margin-top: 60px;
	}
`;

const ResetSuccess = () => {
	return (
		<ResetSuccessScreen>
			<p className="successtext">비밀번호가 성공적으로 변경되었습니다.</p>

			<button className="button" onClick={() => (window.location.href = '/login')}>
				로그인
			</button>
		</ResetSuccessScreen>
	);
};

export default ResetSuccess;
