import api from '../../Axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import ListItem from '../../components/Intro/ListItem';
import { readMaster } from '../../api/Intro/master';
import { readIntroList } from '@/api/Intro/introList';
import { theme } from '../../constants/theme';

const List = () => {
	let { state } = useParams(); // state 0(작성중), 1(작성완료), 2(보관중), 3(전체) 중 하나

	const navigate = useNavigate();

	// (Data) 지원 공고 목록
	const [recruits, setRecruits] = useState([]);
	const [expiredRecruits, setExpiredRecruits] = useState([]); // 경과한 공고 목록
	const [isExpiredRecruitsVisible, setIsExpiredRecruitsVisible] = useState(false); // 경과한 공고 목록 토글

	// 0. 마스터 마지막 수정 일시 가져오기
	const [masterData, setMasterData] = useState({});

	useEffect(() => {
		const fetchMaster = async () => {
			try{
				const Data = await readMaster();
				console.log('마스터 자기소개서 조회:', Data);
				setMasterData({
					updated_at: Data.updatedAt,
					state: Data.state,
				});
			} catch (error) {
				console.error('Error:', error);
			}
		}
		fetchMaster();	
	}, []);

	// 1. 자기소개서 목록 조회
	useEffect(() => {
		const fetchIntroLIst = async () => {
			try {
				const Data = await readIntroList();
				console.log('자소서 목록 조회:', Data);

				// 현재 날짜
				const now = new Date();

				// 필터링
				const expiredItems = Data.filter((item) => new Date(item.deadline) < now); // 경과한 공고 목록 필터링
				const activeItems =  Data.filter((item) => new Date(item.deadline) >= now); // 경과하지 않은 공고 목록 필터링

				// 상태 업데이트
				console.log('진행중인 공고 목록:', activeItems);
				setRecruits(activeItems);
				console.log('경과한 공고 목록:', expiredItems);
				setExpiredRecruits(expiredItems);
			} catch (error) {
				console.error('Error:', error);
			}
		}
		fetchIntroLIst();
	}, []);
			

	const filterdData = state === '3' ? recruits : recruits.filter((item) => item.state.toString() === state);

	// 공고 마감일시가 빠른 순서대로 정렬(마감일이 지나지 않은 자소서)
	const sortedData = filterdData.sort((a, b) => {
		const aDays = parseInt(a.timeSinceUpdate.replace('D-',''));
		const bDays = parseInt(b.timeSinceUpdate.replace('D-',''));
		return aDays - bDays;
	});

	// 공고 마감일시가 늦은 순서대로 정렬(마감일이 지난 자소서)
	const sortedExpiredData = expiredRecruits.sort((a, b) => {
        const aDays = parseInt(a.timeSinceUpdate.replace('D-', ''), 10);
        const bDays = parseInt(b.timeSinceUpdate.replace('D-', ''), 10);
        return bDays - aDays;
    });

	return (
		<BaseDiv>
			{/* 마스터 자소서 */}
			{(state === '3' || state === String(masterData.state))&&(
				<ListItem
					title="MASTER"
					updated_at={masterData.updated_at}
					state={masterData.state}
					onClick={() => navigate('/history/master')}
				/>
			)}

			{/* 자기소개서 목록 */}
			{sortedData
				.filter((item) => item.state !== 2) // state가 2가 아닌 항목만 필터링
				.map((item) => (
					<ListItem
						key={item.id}
						title={item.recruitTitle}
						updated_at={item.updatedAt}
						deadline={item.deadline}
						state={item.state}
						timeSinceUpdate={item.timeSinceUpdate}
						onClick={() => navigate(`/history/others/${item.id}`)}
					/>
				))}

			{/* 만료된 자기소개서 목록 */}
			<br></br>
			{expiredRecruits.length > 0 && (
				<div>
					<div style={{display:'flex', justifyContent:'space-between', alignItems:'center', height:'20px'}}>					
						<h3 style={{ marginLeft: 10 }}>마감일이 지난 자기소개서 보기</h3>
						<ToggleButton onClick={()=>setIsExpiredRecruitsVisible(!isExpiredRecruitsVisible)}>
							{isExpiredRecruitsVisible ? '▲' : '▼'}
						</ToggleButton>
					</div>
					<AnimatedDiv isVisible={isExpiredRecruitsVisible}>
						{sortedExpiredData.map((item) => (
							<ListItem
								key={item.id}
								title={item.recruitTitle}
								updated_at={item.updatedAt}
								deadline={item.deadline}
								state={item.state}
								timeSinceUpdate={item.timeSinceUpdate}
								onClick={() => navigate(`/history/others/${item.id}`)}
							/>
						))}
					</AnimatedDiv>
				</div>
			)}
		</BaseDiv>
	);
};

export default List;

const BaseDiv = styled.div`
	width: 820px;
	max-width: 820px;
	position: relative;
	@media (max-width: ${theme.breakpoints.md}) {
		width: 310px;
	}
`;

const ToggleButton = styled.div`
	cursor: pointer;
	margin-right: 10px;
`

const AnimatedDiv = styled.div`
    max-height: ${({ isVisible }) => (isVisible ? '1000px' : '0')};
    overflow: hidden;
    transition: max-height 0.5s ease-in-out;
`;