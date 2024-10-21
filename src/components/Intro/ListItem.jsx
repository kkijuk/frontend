import React from 'react';
import styled from 'styled-components';
import '../../pages/History/history.css';

const ListItem = ({ title, updated_at, deadline, state, timeSinceUpdate, onClick }) => {
	return (
		<ListBox onClick={onClick}>
			<h3 style={{ fontWeight: 800, margin: '10px 0px', color: title === 'MASTER' ? '#3AAF85' : 'black' }}>{title}</h3>
			<p className="lastupdated" style={{ color: '#707070', margin: '5px 0px', fontSize: '15px' }}>
				마지막 수정 일시: {updated_at}
			</p>
			{title !== 'MASTER' && (
				<p className="lastupdated" style={{ color: '#FA7C79', margin: '0px 0px', fontSize: '15px' }}>
					공고 마감 일시: {deadline} <span style={{ fontWeight: 'Bold' }}>({timeSinceUpdate})</span>
				</p>
			)}

			<Tag state={state}>{state === 0 ? '작성중' : state === 1 ? '작성완료' : state === 2 ? '보관' : ''}</Tag>
		</ListBox>
	);
};

export default ListItem;

const ListBox = styled.div`
	width: 780px;
	border-radius: 10px;
	box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
	padding: 15px 20px;
	position: relative;
	margin: 15px 0px;
	cursor: pointer;
`;

const Tag = styled.div`
	height: 22px;
	padding: 0px 16px;
	position: absolute;
	top: 70px;
	right: 10px;
	font-size: 12px;
	font-family: Regular;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 20px;
	border: ${(props) => (props.state === 1 ? '1px solid #707070' : 'none')};
	background: ${(props) => {
		switch (props.state) {
			case 0:
				return '#3AAF85';
			case 1:
				return '#FFF';
			case 2:
				return '#707070';
		}
	}};

	color: ${(props) => {
		switch (props.state) {
			case 0:
				return '#FFF';
			case 1:
				return '#707070';
			case 2:
				return '#FFF';
		}
	}};
`;
