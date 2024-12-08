import React, { useState } from 'react';
import styled from 'styled-components';
import { Education, Career, Experience } from './Content';

const Wrapper = styled.div`
	width: 820px;
	height: 300px;
`;

const CategoryBox = styled.div`
	width: 820px;
	height: 33px;
`;

const Category = styled.div`
	height: 33px;
	display: inline-flex; /* Flexbox로 설정하여 수직 가운데 정렬 가능 */
	align-items: center; /* 세로 가운데 정렬 */
	padding: 0 28px; /* 양쪽에 28px의 공간을 줌 */
	border-radius: 10px 10px 0px 0px;
	background-color: ${(props) =>
		props.isSelected ? 'var(--gray-06, #F5F5F5)' : '#FFFFFF'}; /* 선택 여부에 따른 배경색 */
	cursor: pointer;
`;

const CategoryText = styled.div`
	color: ${(props) => (props.isSelected ? 'var(--main-01, #3AAF85)' : 'var(--gray-02, #707070)')};
	text-align: right;
	font-family: Pretendard;
	font-size: 14px;
	font-style: normal;
	font-weight: 600;
	line-height: normal;
`;

const ContentBox = styled.div`
	width: 820px;
	height: 267px;
	flex-shrink: 0;
	border-radius: 0px 10px 10px 10px;
	background: var(--gray-06, #f5f5f5);

	display: flex; /* Flexbox로 중앙 정렬 */
	flex-direction: column; /* 세로 방향 배치 */
	align-items: center; /* 가로 중앙 정렬 */
`;

export default function SelectContent() {
	const [selectedCategory, setSelectedCategory] = useState(1); // 학력이 기본적으로 클릭되어있는 상태

	const handleCategoryClick = (category) => {
		setSelectedCategory(category);
	};

	const renderContent = () => {
		if (selectedCategory === 1) {
			return (
				<>
					<Education text="xx고등학교" />
					<Education text="서울여자대학교" />
				</>
			);
		}
		if (selectedCategory === 2) {
			return (
				<>
					<Career text="영어학원 알바" />
					<Career text="영어학원 알바2" />
				</>
			);
		}
		if (selectedCategory === 3) {
			return (
				<>
					<Experience text="웹개발 소학회" />
					<Experience text="IT서비스 개발 동아리" />
				</>
			);
		}
	};

	return (
		<Wrapper>
			<CategoryBox>
				<Category isSelected={selectedCategory === 1} onClick={() => handleCategoryClick(1)}>
					<CategoryText isSelected={selectedCategory === 1}>학력</CategoryText>
				</Category>
				<Category isSelected={selectedCategory === 2} onClick={() => handleCategoryClick(2)}>
					<CategoryText isSelected={selectedCategory === 2}>경력</CategoryText>
				</Category>
				<Category isSelected={selectedCategory === 3} onClick={() => handleCategoryClick(3)}>
					<CategoryText isSelected={selectedCategory === 3}>활동 및 경험</CategoryText>
				</Category>
			</CategoryBox>

			<ContentBox>
				{renderContent()} {/* 선택된 카테고리에 따라 콘텐츠를 렌더링 */}
			</ContentBox>
		</Wrapper>
	);
}
