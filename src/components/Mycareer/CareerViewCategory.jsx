import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import CareerCategoryCircle from './CareerCategoryCircle';
import { ViewCareerDetail } from '../../api/Mycareer/ViewCareerDetail';
import EmptyActivityMessage from './EmptyActivityMessage';

const BackgroundSection = styled.div`
	width: 100vw;
	min-height: 100vh;
	background-color: #f0f0f0;
	position: relative;
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: flex-start;
	padding: 20px 0;
`;
const CategoryBox = styled.div`
	width: 100%;
	max-width: 820px;
	gap: 12px;
	margin-bottom: 10px;
	padding: 0 15px; /* 좌우 여백 추가 */

	@media (max-width: 600px) {
		padding: 0 10px; /* 작은 화면에서 패딩 조정 */
	}
`;

const Category = styled.div`
	width: 820px;
	height: 25px;
	display: flex;
	align-items: center;
	margin-bottom: 10px;
	margin-top: 25px;
`;

const CategoryText = styled.div`
	color: var(--black, #000);
	font-family: regular;
	font-size: 20px;
	font-weight: 400;
	line-height: normal;
	margin-top: 14px;
	margin-bottom: 20px;
	margin-left: 10px;

	@media (max-width: 600px) {
		font-size: 16px; /* 작은 화면에서 폰트 크기 축소 */
	}
`;

const ListBox = styled.div`
	width: 95%;
	height: auto;
	padding: 10px;
	flex-shrink: 0;
	border-radius: 10px;
	background: var(--white, #fff);
	box-shadow: 1px 1px 6px 0px rgba(112, 112, 112, 0.25);
	margin-left: 5px;
	margin-bottom: 10px;
	box-sizing: border-box;
	cursor: pointer;

	@media (max-width: 600px) {
		padding: 10px; /* 작은 화면에서 패딩 축소 */
	}
`;

const Name = styled.div``;

const AliasName = styled.div`
	color: var(--black, #000);
	font-family: Pretendard;
	font-size: 18px;
	font-weight: 400;
	line-height: normal;
	margin-bottom: 9px;
	margin-top: 5px;

	@media (max-width: 600px) {
		font-size: 14px; /* 작은 화면에서 폰트 크기 축소 */
	}
`;

const CareerContainer = styled.div`
	display: flex; /* Flexbox로 가로 정렬 */
	align-items: center; /* 세로 가운데 정렬 (선택 사항) */
`;

const CareerName = styled.div`
	color: var(--black, #000);
	font-family: bold;
	font-size: 18px;
	font-style: regular;
	line-height: normal;
	margin-bottom: 9px;
	margin-top: 5px;
`;

const Date = styled.div`
	font-size: 14px;
	color: #555;
	margin-bottom: 20px;
`;
const CareerViewCategory = ({ data }) => {
	const navigate = useNavigate();

	// 데이터가 없거나 유효하지 않을 경우 처리
	if (!data || typeof data !== 'object') {
		return (
			<BackgroundSection>
				<EmptyActivityMessage />
			</BackgroundSection>
		);
	}

	// 데이터의 키를 정렬
	const sortedKey = Object.keys(data).sort((a, b) => b - a);

	// 데이터가 없을 경우 처리
	const hasData = sortedKey.some((key) => Array.isArray(data[key]) && data[key].length > 0);
	if (!hasData) {
		return (
			<BackgroundSection>
				<EmptyActivityMessage />
			</BackgroundSection>
		);
	}

	const handleListBoxClick = (careerId, category) => {
		navigate(`/mycareer/${category}/${careerId}`, { state: { careerId, category } });
	};

	return (
		<BackgroundSection>
			<CategoryBox>
				{sortedKey.map((category) => {
					// 카테고리 내 데이터가 없는 경우 건너뜀
					if (!Array.isArray(data[category]) || data[category].length === 0) return null;

					return (
						<React.Fragment key={category}>
							<Category>
								<CareerCategoryCircle category={category} />
								<CategoryText>{category}</CategoryText>
							</Category>
							{data[category].map((item) => (
								<ListBox
									key={`${item.id}_${item.category}`}
									onClick={() => handleListBoxClick(item.id, item.category.categoryKoName)} // 클릭 시 career.id 전송
								>
									<Name>
										<CareerContainer>
											<CareerName>{item.name}</CareerName>
											<AliasName>&nbsp;/ {item.alias}</AliasName>
										</CareerContainer>
									</Name>
									<Date>
										{item.startdate} ~ {item.endDate}
									</Date>
								</ListBox>
							))}
						</React.Fragment>
					);
				})}
			</CategoryBox>
		</BackgroundSection>
	);
};

export default CareerViewCategory;
