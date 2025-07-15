import React from 'react';
import styled from 'styled-components';
import '../../pages/History/history.css';
import { theme } from '../../constants/theme';
import { Color } from '../../constants/color';

const ListItem = ({ title, updated_at, deadline, state, timeSinceUpdate, onClick }) => {
	const daysLeft = Math.ceil((new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24));
	const deadlineColor = daysLeft <= 7 ? Color.subRd : Color.gray02;

	return (
		<ListBox title={title} onClick={onClick}>
			<LeftSide>
				<h3>{title}</h3>
				<InfoBox>
					<div>
						<p style={{color: `${Color.gray02}`}}>마지막 수정 일시: {updated_at}</p>
						{title !== 'MASTER' && (
							<p style={{color: deadlineColor}}>
								공고 마감 일시: {deadline} <span style={{ fontWeight: 'Bold' }}>({timeSinceUpdate})</span>
							</p>
						)}
					</div>
				</InfoBox>
			</LeftSide>
			<Tag state={state}>{state === 0 ? '작성중' : state === 1 ? '작성완료' : state === 2 ? '보관' : ''}</Tag>
		</ListBox>
	);
};

export default ListItem;

const ListBox = styled.div`
	flex: 1;
	padding: ${props => (props.title === 'MASTER' ? '20px 30px' : '10px 30px')};
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;

	border-radius: 10px;
	box-shadow: 1px 1px 6px 0px rgba(112, 112, 112, 0.25);

	cursor: pointer;

	h3 {
		font-size: 18px;
		font-family: 'Regular';
		font-weight: 700;
		margin: 0px;
		color: ${(props) => (props.title == "MASTER" ? Color.main01 : Color.black)};
	}

	p {
		font-family: 'Regular';
		font-size: 12px;
		margin: 0px;
	}

	@media (max-width: ${theme.breakpoints.md}) {
		height: auto;
		padding: ${props => (props.title === 'MASTER' ? '16px 20px' : '12px 20px')};
		align-items: flex-end;
	}
`;

const LeftSide = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;

	@media (max-width: ${theme.breakpoints.md}) {
		// width: 100%;
	}
`;

const InfoBox = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
`

const Tag = styled.div`
	height: 22px;
	padding: 0px 16px;
	display: flex;
	justify-content: center;
	align-items: center;

	font-size: 12px;
	font-family: Regular;
	border-radius: 20px;
	border: ${(props) => (props.state === 1 ? `1px solid ${Color.gray02}` : 'none')};
	background: ${(props) => {
		switch (props.state) {
			case 0:
				return Color.main01;
			case 1:
				return Color.white;
			case 2:
				return Color.gray02;
		}
	}};

	color: ${(props) => {
		switch (props.state) {
			case 0:
				return Color.white;
			case 1:
				return Color.gray02;
			case 2:
				return Color.white;
		}
	}};

	@media (max-width: ${theme.breakpoints.md}) {
		position: static;
	}
`;


