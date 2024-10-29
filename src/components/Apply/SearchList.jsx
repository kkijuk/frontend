import React from 'react';
import styled from 'styled-components';

const BackgroundSection = styled.div`
	width: 100%;
	background-color: #f0f0f0;
	padding: 20px 0;
`;

const ContentSection = styled.div`
	max-width: 820px;
	margin: 0 auto;
	padding: 15px;
	background-color: #f0f0f0;
	border-radius: 15px;
`;

const AdListStyled = styled.div`
	padding: 20px;
	border-radius: 10px;
	margin-top: 30px;
`;

const AdItem = styled.div`
	background-color: white;
	border: 1px solid #ddd;
	border-radius: 10px;
	padding: 15px;
	margin-bottom: 10px;
	box-shadow: 1px 1px 6px 0px rgba(112, 112, 112, 0.25);
	cursor: pointer;
`;

const AdDetails = styled.div`
	color: #555;
`;

const AdTitleContainer = styled.div`
	display: flex;
	align-items: center;
	margin-left: 16px;
`;

const AdTitle = styled.div`
	color: var(--black, #000);
	font-family: Pretendard;
	font-size: 18px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
	margin-top: 5px;
`;

const TagContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 13px;
	margin-left: 15px;
	margin-bottom: 5px;
`;

const Tag = styled.span`
	background: #f5f5f5;
	border-radius: 10px;
	padding: 4px 8px;
	font-size: 12px;
	color: #707070;
`;

const StatusCircle = styled.span`
	display: inline-block;
	width: 15px;
	height: 15px;
	border-radius: 50%;
	background-color: ${({ status }) => {
		if (status === 'UNAPPLIED') return '#D9D9D9';
		if (status === 'PLANNED') return '#B0B0B0';
		if (status === 'APPLYING') return '#707070';
		if (status === 'ACCEPTED') return '#78D333';
		if (status === 'REJECTED') return '#FA7C79';
		return '#707070';
	}};
	margin-right: 10px;
	margin-top: 5px;
`;

const SearchList = ({ data }) => {
	if (!data || data.length === 0) {
		return (
			<BackgroundSection>
				<ContentSection></ContentSection>
			</BackgroundSection>
		);
	}

	return (
		<BackgroundSection>
			<ContentSection>
				<AdListStyled>
					{data.map((recruit, index) => (
						<AdItem key={index}>
							<TagContainer>
								{recruit.tag.map((tag, tagIdx) => (
									<Tag key={tagIdx}>{tag}</Tag>
								))}
							</TagContainer>
							<AdDetails>
								<AdTitleContainer>
									<StatusCircle status={recruit.status} />
									<AdTitle>{recruit.title}</AdTitle>
								</AdTitleContainer>
							</AdDetails>
						</AdItem>
					))}
				</AdListStyled>
			</ContentSection>
		</BackgroundSection>
	);
};

export default SearchList;
