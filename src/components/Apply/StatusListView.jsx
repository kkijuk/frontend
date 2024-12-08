import React from 'react';
import styled from 'styled-components';

const BackgroundSection = styled.div`
	width: 100vw;
	background-color: #f0f0f0;
	margin-top: 20px;
	position: relative;
	padding: 20px 0;
	box-sizing: border-box;
	justify-content: center; /* 중앙 정렬 */
`;

const ContentSection = styled.div`
	max-width: 820px;
	margin: 0 auto;
	width: 100%; /* 전체 너비에 맞춤 */
	padding: 20px;
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
	font-size: 14px;
	color: var(--black, #000);
	font-family: Pretendard;
	font-size: 16px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
	margin-bottom: 10px;
	margin-left: 5px;
`;

const AdItem = styled.div`
	background-color: white;
	border: 1px solid #ddd;
	border-radius: 10px;
	padding: 15px;
	margin-bottom: 20px;
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

const Label = styled.span`
	border-radius: 11px;
	background: #f5f5f5;
	color: var(--gray-02, #707070);
	text-align: center;
	font-family: Pretendard;
	font-size: 12px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	padding: 4px 16px;
	margin-right: 10px;
	display: inline-block;
	margin-bottom: 10px;
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
	font-size: 13px;
	color: #707070;
	font-family: Light;
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
`;

const StatusTitleContainer = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 10px;
	font-size: 17px;
	font-family: Regular;
`;

const groupByStatus = (data) => {
	return {
	  '미지원': data.filter((job) => job.status === 'UNAPPLIED'),
	  '지원 예정': data.filter((job) => job.status === 'PLANNED'),
	  '진행 중': data.filter((job) => job.status === 'APPLYING'),
	  '합격': data.filter((job) => job.status === 'ACCEPTED'),
	  '불합격': data.filter((job) => job.status === 'REJECTED'),
	};
  };
  

const getStatusColor = (status) => {
	if (status === '미지원') return '#D9D9D9';
	if (status === '지원 예정') return '#B0B0B0';
	if (status === '진행 중') return '#707070';
	if (status === '합격') return '#78D333';
	if (status === '불합격') return '#FA7C79';
	return '#707070';
};

const StatusListView = ({ data = [], onJobClick }) => {
	const groupedData = groupByStatus(data);

	return (
		<BackgroundSection>
			<ContentSection>
				<AdListStyled>
					{Object.keys(groupedData).map((status, index) => (
						<div key={index}>
							{groupedData[status].length > 0 && (
								<>
									<StatusTitleContainer>
										<StatusCircle status={status} style={{ backgroundColor: getStatusColor(status) }} />
										{status} ({groupedData[status].length})
									</StatusTitleContainer>
									{groupedData[status].map((job, idx) => (
										<AdItem
											key={idx}
											onClick={() => {
												window.scrollTo(0, 0); 
												onJobClick(job);
											}}
										>
											<TagContainer>
												{(job.tag || job.tags || []).map((tag, tagIdx) => (
													<Tag key={tagIdx}>{tag}</Tag>
												))}
											</TagContainer>
											<AdDetails>
												<AdTitleContainer>
													<AdTitle>{job.title}</AdTitle>
												</AdTitleContainer>
											</AdDetails>
										</AdItem>
									))}
								</>
							)}
						</div>
					))}
				</AdListStyled>
			</ContentSection>
		</BackgroundSection>
	);
};


export default StatusListView;
