import React from 'react';
import styled from 'styled-components';

const BackgroundSection = styled.div`
	width: 100vw;
	display: flex;
	justify-content: center;
	background-color: #f0f0f0;
	margin-top: 20px;
	padding: 20px 0;
	box-sizing: border-box;
`;

const ContentSection = styled.div`
	width: 100%;
	max-width: 820px;
	padding: 15px;
	background-color: #f0f0f0;
	border-radius: 15px;
	position: relative;
`;

const AdListStyled = styled.div`
	padding: 20px;
	border-radius: 10px;
	margin-top: 30px;
`;

const AdDateSection = styled.div`
	margin-bottom: 30px;
`;

const AdDate = styled.div`
	font-size: 16px;
	color: var(--black, #000);
	font-family: Regular;
	font-weight: 500;
	margin-bottom: 10px;
	margin-left: 5px;
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
	font-weight: 700;
	margin-top: 5px;
`;

const TagContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 13px;
	margin-left: 15px;
	margin-bottom: 5px;
`;

const DefaultTag = styled.span`
	background: #f5f5f5;
	border-radius: 10px;
	padding: 4px 8px;
	font-size: 13px;
	color: #707070;
	font-family: Light;
`;

const StatusTag = styled.span`
	background: ${({ status }) => {
		if (status === 'UNAPPLIED') return '#d9d9d9';
		if (status === 'PLANNED') return '#b0b0b0';
		if (status === 'APPLYING') return '#707070';
		if (status === 'ACCEPTED') return '#78d333';
		if (status === 'REJECTED') return '#fa7c79';
		return '#d9d9d9';
	}};
	color: white;
	border-radius: 10px;
	padding: 4px 8px;
	font-size: 13px;
	font-family: Light;
`;

const StatusCircle = styled.span`
	display: inline-block;
	width: 15px;
	height: 15px;
	border-radius: 50%;
	background-color: ${({ status }) => {
		if (status === 'UNAPPLIED') return '#d9d9d9';
		if (status === 'PLANNED') return '#b0b0b0';
		if (status === 'APPLYING') return '#707070';
		if (status === 'ACCEPTED') return '#78d333';
		if (status === 'REJECTED') return '#fa7c79';
		return '#707070';
	}};
	margin-right: 10px;
	margin-top: 5px;
`;

const groupByDate = (data) => {
	return data.reduce((acc, current) => {
		if (current.endTime) {
			const date = current.endTime.split(' ')[0];
			if (!acc[date]) {
				acc[date] = [];
			}
			acc[date].push(current);
		}
		return acc;
	}, {});
};

const ListView = ({ data, onJobClick }) => {
	if (!data || data.length === 0) {
		return (
			<BackgroundSection>
				<ContentSection>{/* 데이터가 없는 경우 빈 화면 처리 */}</ContentSection>
			</BackgroundSection>
		);
	}

	const groupedData = groupByDate(data);

	return (
		<BackgroundSection>
			<ContentSection>
				<AdListStyled>
					{Object.keys(groupedData).map((date, index) => (
						<AdDateSection key={index}>
							<AdDate>{date}</AdDate>
							{(groupedData[date] || []).map((ad, idx) => (
								<AdItem
									key={idx}
									onClick={() => {
										window.scrollTo(0, 0); // 페이지를 최상단으로 스크롤
										onJobClick(ad);
									}}
								>
									<TagContainer>
										{(ad.tag || ad.tags || []).map((tag, tagIdx) =>
											ad.isReviewTitleTag && ad.reviewTitleTag === tag ? (
												<StatusTag key={tagIdx} status={ad.status}>
													{tag}
												</StatusTag>
											) : (
												<DefaultTag key={tagIdx}>{tag}</DefaultTag>
											),
										)}
									</TagContainer>
									<AdDetails>
										<AdTitleContainer>
											<StatusCircle status={ad.status} />
											<AdTitle>{ad.title}</AdTitle>
										</AdTitleContainer>
									</AdDetails>
								</AdItem>
							))}
						</AdDateSection>
					))}
				</AdListStyled>
			</ContentSection>
		</BackgroundSection>
	);
};

export default ListView;
