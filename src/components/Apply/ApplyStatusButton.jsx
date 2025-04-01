import React from 'react';
import styled from 'styled-components';
import { trackEvent } from '../../utils/ga4';

const StatusContainer = styled.div`
	display: flex;
	width: 800px;
	align-items: center;
	justify-content: flex-start;
	padding: 10px 0px;
	gap: 30px;
	margin-left: 10px;
	padding-right: 90px;
	white-space: nowrap;

`;
const ScrollWrapper = styled.div`
  width: 100%;

  /* 기본 데스크탑에서는 영향 X */
  overflow: visible;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    overflow-x: auto;
    overflow-y: hidden;

    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;


const StatusButton = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	border: 2px solid ${(props) => props.borderColor};
	border-radius: 13px;
	padding: 9px 18px;
	color: ${(props) =>
		props.active && props.statusType !== 'unapplied' && props.statusType !== 'planned'
			? '#fff'
			: 'black'};
	cursor: pointer;
	background: ${(props) => (props.active ? props.borderColor : 'transparent')};
	margin-bottom: -12px;
	text-align: center;
	font-family: 'Medium';
	font-size: 14px;
	font-weight: 400;
	line-height: normal;
	outline: none;
	width: 130px;
	height: 40px;
	@media (max-width: ${({ theme }) => theme.breakpoints.md}) {
	margin-bottom: -10px;
	}
`;

const StatusText = styled.span`
	margin-left: 5px;
`;

const ApplyStatusButton = ({ activeStatus, onStatusClick, statusCounts }) => {
	const handleClick = (status) => {
		window.scrollTo(0, 0); 
	
		//  GA 트래킹 추가 (공고 상태 칩 클릭)
		trackEvent('chip_click', {
			category: 'apply',
			detail: 'status_chip',
			action_type: 'click',
			label: '공고 상태 칩',
			status: status, // 선택한 상태 전달
		});
	
		onStatusClick(status); 
	};

	return (
		<ScrollWrapper>
		<StatusContainer>
			<StatusButton
				active={activeStatus === 'all'}
				onClick={() => handleClick('all')}
				borderColor="#3AAF85"
				statusType="all"
			>
				전체보기 <StatusText>({statusCounts.all})</StatusText>
			</StatusButton>
			<StatusButton
				active={activeStatus === 'unapplied'}
				onClick={() => handleClick('unapplied')}
				borderColor="#D9D9D9"
				statusType="unapplied"
			>
				미지원 <StatusText>({statusCounts.unapplied})</StatusText>
			</StatusButton>
			<StatusButton
				active={activeStatus === 'planned'}
				onClick={() => handleClick('planned')}
				borderColor="#B0B0B0"
				statusType="planned"
			>
				지원 예정 <StatusText>({statusCounts.planned})</StatusText>
			</StatusButton>
			<StatusButton
				active={activeStatus === 'applying'}
				onClick={() => handleClick('applying')}
				borderColor="#707070"
				statusType="applying"
			>
				진행 중 <StatusText>({statusCounts.applying})</StatusText>
			</StatusButton>
			<StatusButton
				active={activeStatus === 'accepted'}
				onClick={() => handleClick('accepted')}
				borderColor="#78D333"
				statusType="accepted"
			>
				합격 <StatusText>({statusCounts.accepted})</StatusText>
			</StatusButton>
			<StatusButton
				active={activeStatus === 'rejected'}
				onClick={() => handleClick('rejected')}
				borderColor="#FA7C79"
				statusType="rejected"
			>
				불합격 <StatusText>({statusCounts.rejected})</StatusText>
			</StatusButton>
		</StatusContainer>
		</ScrollWrapper>
	);
};

export default ApplyStatusButton;
