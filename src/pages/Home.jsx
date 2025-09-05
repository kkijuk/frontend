import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '@/Axios';
import getCoachmark from '@/coachmark';
import { AddDetail } from '@/api/Mycareer/AddDetail';
import getColorByCategory from '@/utils/getColorByCategory';
import ProfileBox from '../components/Home/Profile';
import { getRecentCareerDetails } from '@/api/Home/getRecentCareerDetails';
import BannerComponent from '../components/Home/Banner';
import Noti from '../components/Home/Noti';
import CLNoti from '../components/Home/CLNoti';

import { useNavigate } from 'react-router-dom';

import CareerTimeline from '../components/Mycareer/CareerTimeline';
import OnboardingModal from '../components/Modal/OnboardingModal';
import AddQuickCareerDetailModal from '@/components/Modal/AddQuickCareerDetailModal/AddQuickCareerDetailModal';
import SvgIcon from '@/components/shared/SvgIcon';
import { theme } from '../constants/theme';
import { Color } from '@/constants/color';
import banner1 from '@/assets/banner/banner1.png';
import banner2 from '@/assets/banner/banner2.png';


const Container = styled.div`
	display: flex;
	height: auto;
	gap: 32px;
	flex-direction: column;
	margin: 48px auto 48px;
	width: 100%; /*얘랑 아랫줄 추가*/
	max-width: 820px;
	box-sizing: border-box;

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		margin: 24px auto;
		padding: 0 16px;
	}
	/*border: 1px solid black;
	box-sizing: border-box;*/
`;

const Top = styled.div`
	width: 100%;
	max-width: 820px;
	height: auto; /*160*/
	display: flex;
	gap: 20px;

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		width: 100%;

		flex-direction: column;
		align-items: center;
	}

	/*border: 1px solid black;
	box-sizing: border-box;*/
`;

const TopBox1 = styled.div`
	display: flex;
	width: 240px;
	height: 160px;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border-radius: 10px;
	border: 1px solid ${Color.gray03};

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		width: 100%;
		padding: 20px 0px;
	}
`;

const TopBox2 = styled.div`
	width: 560px;
	height: 160px;
	flex-shrink: 0;
	border-radius: 10px;
	/*border: 1px solid var(--gray-03, #d9d9d9); 수정*/
	background: ${Color.white};
	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		/*width: 368px;*/ //TopBox1과 맞춰주기
		width: 100%;
		/*max-width: 560px;*/
	}
`;

const Middle = styled.div`
	width: auto; /*820px*/
	height: 80px; /*기존 188px*/
	max-width: 820px;

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		width: 100%;
	}

	/*border: 1px solid black;
	box-sizing: border-box;*/
`;

const Bottom = styled.div`
	width: auto; /*820*/
	max-width: 820px;

	height: auto; /*194*/
	display: flex;
	flex-direction: column;
	gap: 16px;

	/*border: 1px solid black;
	box-sizing: border-box;*/
	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		width: 100%;
		align-items: center; 
	}
`;

const BottomText = styled.div`
	color: ${Color.black};
	font-family: Pretendard;
	font-size: 20px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
	align-self: flex-start;
`;

const CareerDeatailWrapper = styled.div`
	box-sizing: border-box;
	width: auto;
	height: auto;
	padding: 24px 30px;

	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
	gap: 24px;

	border-radius: 10px;
	background: ${Color.gray06};
`;

const CareerDetailContentBox = styled.div`
	box-sizing: border-box;
	height: 212px;

	border-radius: 10px;
	background: ${Color.white};
	box-shadow: 1px 1px 6px 0px rgba(112, 112, 112, 0.25);
	cursor: pointer;
`;

const AddCareerDetailBox = styled(CareerDetailContentBox)`
	padding: 16px 24px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const CareerDetailBox = styled(CareerDetailContentBox)`
	padding: 16px 24px 20px 24px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 20px;
`;

const ActivityBox = styled.div`
	width: auto; /*820*/
	height: auto; /*194*/
	display: flex;
	justify-content: space-between;
	gap: 16px;
	box-sizing: border-box;

	@media (max-width: ${(props) => props.theme.breakpoints.md}) {
		width: 100%;
		display: flex;
		gap: 16px;
		flex-direction: column;
		/*align-items: center;  가운데 정렬 */
	}
`;

const AddButton = styled.button`
	width: 60px;
	height: 60px;
	border: none;
	border-radius: 50%;
	background-color: ${Color.main01};
	color: white;
	cursor: pointer;
	box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

const CategoryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CategoryLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const CategoryDot = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const CategoryName = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: #444;
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 6px;
`;

const DetailTitle = styled.div`
  font-weight: 700;
  font-size: 17px;
  color: #111;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;  
  max-width: 170px;
`;


const DetailDate = styled.div`
  font-size: 12px;
  color: #999;
`;

const DetailContent = styled.div`
  font-size: 13px;
  color: #333;
  margin-top: -10px;

  display: -webkit-box;             
  -webkit-line-clamp: 3;            
  -webkit-box-orient: vertical;    
  
  overflow: hidden;                
  text-overflow: ellipsis;       
  white-space: normal;              
  word-break: break-word;           
`;


const TagList = styled.div`
  margin-top: auto;
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  background-color: ${Color.gray06};
  color: ${Color.main01};
  font-size: 11px;
  padding: 3px 10px;
  border-radius: 16px;
`;

const EmptyStateCard = styled.div`
  grid-column: 1 / -1;        
  min-height: 120px;
  border-radius: 10px;
  background: ${Color.gray06}; 
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${Color.gray03};
  font-size: 18px;
  text-align: center;
  user-select: none;
`;

/*const bannerDummy = [
	{
		image: require('../assets/banner/banner1.png'),
	},
	{
		image: require('../assets/banner/banner2.png'),
		url: 'https://docs.google.com/forms/d/e/1FAIpQLSfCNlO7_QQR7J3BYHV4tGhkpCyJp4VggIKX1bmBBhs7DYEzWQ/viewform?usp=sharing',
	},
];
*/


const bannerDummy = [
  { image: banner1 },
  { image: banner2, url: 'https://docs.google.com/forms/d/e/1FAIpQLSfCNlO7_QQR7J3BYHV4tGhkpCyJp4VggIKX1bmBBhs7DYEzWQ/viewform?usp=sharing'},
];

export default function Home() {
	const navigate = useNavigate(); // useNavigate 훅을 사용합니다.

	const [showOnboarding, setShowOnboarding] = useState(false); // 온보딩 모달 상태
	const [showAddQuickCareerDetailModal, setShowAddQuickCareerDetailModal] = useState(false); // 빠른 활동 기록 추가 모달 상태

	const [recentCareerDetails, setRecentCareerDetails] = useState([]);

	// [useQuery]] 최근 활동 기록 가져오기
	// [useQuery] 빠른 활동 기록 추가 후 최근 활동 기록 업데이트

	// 빠른 활동 기록 추가
	const handleSaveQuickCareerDetail = async (careerId, data) => {
		try {
			const response = await AddDetail(careerId, data);
			console.log('활동 기록 추가 성공:', response.data);
			setShowAddQuickCareerDetailModal(false);
			fetchRecentCareerDetails();
		} catch (error) {
			console.error('활동 기록 추가 실패:', error);
		}
	};

	//localStorage를 확인해서 오늘은 온보딩 모달을 보이지 않도록 처리
	useEffect(() => {
		const lastClosedDate = localStorage.getItem('hideOnboardingModal');
		const today = new Date().toISOString().split('T')[0]; // 오늘 날짜 (YYYY-MM-DD)

		if (lastClosedDate !== today) {
			setShowOnboarding(true); // 오늘 처음 방문하면 모달 표시
		}
	}, []);

	// 온보딩 모달 닫기 함수
	const handleCloseOnboarding = () => {
		setShowOnboarding(false);
	};

	// 빠른 활동 기록 추가 모달 닫기 함수
	const handleCloseAddQuickCareerDetailModal = () => {
		setShowAddQuickCareerDetailModal(false);
	};

	const fetchRecentCareerDetails = async () => {

		try {
			const data = await getRecentCareerDetails();
			setRecentCareerDetails(data);
			console.log(data);
		} catch (error) {
			console.error('최근 활동 기록 가져오기 실패:', error);
		}
	};

	useEffect(() => {
		fetchRecentCareerDetails();

		const lastClosedDate = localStorage.getItem('hideOnboardingModal');
		const today = new Date().toISOString().split('T')[0];
		if (lastClosedDate !== today) {
			setShowOnboarding(true);
		}
	}, []);

	const startTour = () => {
		const tour = getCoachmark("home");
		tour?.drive();
	}

	return (
		<>
			{showOnboarding && <OnboardingModal onClose={handleCloseOnboarding} />}
			{showAddQuickCareerDetailModal && (
				<AddQuickCareerDetailModal
					onClose={handleCloseAddQuickCareerDetailModal}
					onSave={(careerId, data) => handleSaveQuickCareerDetail(careerId, data)}
				/>
			)}
			<Container>
				<Middle>
					<BannerComponent banners={bannerDummy} />
				</Middle>
				{/* Middle 컴포넌트 위치 바*/}
				<Top>
					<TopBox1>
						<ProfileBox />
					</TopBox1>
					<TopBox2>
						<CareerTimeline />
					</TopBox2>
				</Top>

				<Bottom>
					<BottomText>최근 이런 활동을 기록했어요</BottomText>
					<CareerDeatailWrapper>
  {recentCareerDetails.length === 0 ? (
    <EmptyStateCard>
      지금 첫 활동을 추가하고 홈에서 바로 기록을 남겨보세요!
    </EmptyStateCard>
  ) : (
    <>
      <AddCareerDetailBox
        data-coach="add-careerDetail"
        onClick={() => setShowAddQuickCareerDetailModal(true)}
      >
        <AddButton>
          <SvgIcon name="addButton" size={18} color={Color.white} />
        </AddButton>
      </AddCareerDetailBox>

      {recentCareerDetails.map((activity, index) => (
        <CareerDetailBox key={index}>
							{/* 카테고리 */}
							<CategoryRow>
							<CategoryLeft>
								<CategoryDot color={getColorByCategory(activity.category?.categoryKoName)} />

								<CategoryName>{activity.category?.categoryKoName || '카테고리 없음'}</CategoryName>
							</CategoryLeft>
							</CategoryRow>

							{/* 제목 + 날짜 */}
							<TitleRow>
							<DetailTitle>{activity.detailTitle}</DetailTitle>
							<DetailDate>
								{activity.detailStartDate} ~ {activity.detailEndDate}
							</DetailDate>
							</TitleRow>

							{/* 본문 */}
							<DetailContent>{activity.detailContent}</DetailContent>

							{/* 태그 */}
							<TagList>
							{activity.tags.map((tag, idx) => (
								<Tag key={idx}>{tag.tagName}</Tag>
							))}
							</TagList>
						</CareerDetailBox>
						))}
					</>
  )}
</CareerDeatailWrapper>
				</Bottom>

				<Bottom>
					<BottomText>잠깐! 잊지 않으셨죠?</BottomText>
					<ActivityBox data-coach="noti-at-home">
						<Noti />
						<CLNoti />
					</ActivityBox>
				</Bottom>

				{/* <TourBtn onClick={startTour}>투어 시작하기</TourBtn> */}
			</Container>
		</>
	);
}
