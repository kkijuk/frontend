import React from 'react';
import styled from 'styled-components';
import '../../pages/moni/history.css';

const Container = styled.div`
	position: relative;
	margin-top: 10px;
	margin-bottom: 33px;
`;
const ContentTitle = ({ text }) => {
	return (
		<Container>
			<h1 style={{ display: 'inline-block' }}>{text}</h1>
			<p className="lastUpdated" style={{ display: 'inline-block', position: 'absolute', top: '10px', right: 0 }}>
				마지막 수정일시: 2022-02-02 00:00
			</p>
		</Container>
	);
};

export default ContentTitle;
