import React, { useState } from 'react';
import styled from 'styled-components';

const Box = styled.div`
	width: 820px;
	height: 175px;
	flex-shrink: 0;
	/* Box를 가운데 정렬 */
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column; /* 세로로 배치 */

	border: 1px solid black;
	box-sizing: border-box;
`;

const Filter = styled.div`
	width: 820px;
	height: 145px;
	flex-shrink: 0;
	border-radius: 10px;
	border: 1px solid var(--gray-03, #d9d9d9);
	background: var(--white, #fff);
`;

const FilterReset = styled.div`
	width: 99px;
	height: 20px;
	margin-right: 20px;
	margin-left: 701px;
	flex-shrink: 0;
	background: var(--white, #fff);
	margin-top: 10px;

	box-sizing: border-box;
	border: 1px solid black;

	/* 추가된 부분: 가로 중앙 정렬 */
	display: flex;
	justify-content: center; /* 수평 중앙 정렬 */
	align-items: center; /* 수직 중앙 정렬 */
`;
const ResetIcon = styled.div`
	width: 20px;
	height: 20px;
	margin-right: 5px; /* 아이콘과 텍스트 사이 간격 추가 */

	svg {
		width: 100%;
		height: 100%;
	}
`;

const ResetText = styled.div`
	width: 74px;
	height: 20px;
	color: var(--gray-02, #707070);
	font-family: Pretendard;
	font-size: 15px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;

	/*세로로 가운데 정렬*/
	display: flex;
	justify-content: center; /* 수평 중앙 정렬 */
	align-items: center; /* 수직 중앙 정렬 */
`;

/*이거 안쓰고 시ㅣㅍ은데 뭐가 문제길래 어???*/
const EmptyBox = styled.div`
	width: 820px;
	height: 17px;
`;

const ContentBox = styled.div`
    width: 789px;
    height: 25px;
    
    box-sizing: border-box;
    border: 1px solid black;

    /* 글자 세로 중앙 정렬 하려고 추가한거*/
    display: flex;
    align-items: center; /* 세로 중앙 정렬 */
    justify-content: flex-start; /* 없애도 될 듯*/

    /* ContentBox 사이 간격 18px 추가 */
    &:not(:last-child) {
        margin-bottom: 18px;
;`;

const TitleBox = styled.div`
	height: 25px;
	width: 30px; /*원래는 28px로 되어있긴 함..*/
	margin-left: 31px;
	margin-right: 40px;

	/* 글자 세로 중앙 정렬 하려고 추가한거*/
	display: flex;
	align-items: center; /* 세로 중앙 정렬 */
	justify-content: space-between; /* 가로 정렬(내용 간 간격 조절) */

	box-sizing: border-box;
	border: 1px solid black;
`;

const TitleText = styled.div`
	color: var(--black, #000);
	font-family: Pretendard;
	font-size: 16px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
`;

const Tag = styled.div`
	padding: 0 16px; /* 글자 양 옆에 16px 여백 */
	height: 25px;
	flex-shrink: 0;
	border-radius: 10px;
	background: ${(props) => (props.clicked ? 'var(--main-03, #E1FAED)' : 'var(--gray-06, #F5F5F5)')};
	outline: ${(props) => (props.clicked ? '1px solid var(--main-01, #3AAF85)' : 'none')};
	color: ${(props) => (props.clicked ? 'var(--main-01, #3AAF85)' : 'var(--gray-01, #424242)')};
	font-weight: ${(props) => (props.clicked ? 600 : 400)};

	text-align: center;
	font-family: Pretendard;
	font-size: 14px;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	box-sizing: border-box;

	margin-right: 18px;
`;

const Text = styled.div`
	color: ${(props) => (props.clicked ? 'var(--main-01, #3AAF85)' : 'var(--gray-01, #424242)')};
	font-weight: ${(props) => (props.clicked ? 600 : 400)};
	margin-right: 20px;
	font-family: Pretendard;
	font-size: 14px;
	font-style: normal;
	line-height: normal;
	cursor: pointer;
`;

const DateConatainer = styled.div`
	width: 270px;
	display: flex;
	justify-content: space-between; /* 요소들을 양쪽 끝에 배치 */
	align-items: center;
	margin-right: 20px;
`;

const DateBox = styled.div`
	width: 120px;
	height: 25px;
	flex-shrink: 0;
	border-radius: 10px;
	border: 1px solid var(--gray-03, #d9d9d9);
	background: #fff;
`;

const Apply = styled.div`
	width: 53px;
	height: 25px;
	flex-shrink: 0;
	border-radius: 10px;
	background: var(--main-01, #3aaf85);

	color: var(--white, #fff);
	text-align: center;
	font-family: Pretendard;
	font-size: 14px;
	font-weight: 500;

	display: flex;
	align-items: center;
	justify-content: center;
`;

export default function SearchFilter() {
	const [clickedTags, setClickedTags] = useState({
		activityName: false,
		activityRecord: false,
		tag: false,
	});

	const handleTagClick = (tag) => {
		setClickedTags((prevState) => ({
			...prevState,
			[tag]: !prevState[tag],
		}));
	};

	const [clickedSort, setClickedSort] = useState({
		latest: false,
		earliest: false,
	});

	const handleSortClick = (sortType) => {
		setClickedSort({
			latest: sortType === 'latest',
			earliest: sortType === 'earliest',
		});
	};

	return (
		<Box>
			<Filter>
				<EmptyBox></EmptyBox>
				<ContentBox>
					<TitleBox>
						<TitleText>대상</TitleText>
					</TitleBox>
					<Tag clicked={clickedTags.activityName} onClick={() => handleTagClick('activityName')}>
						활동명
					</Tag>
					<Tag clicked={clickedTags.activityRecord} onClick={() => handleTagClick('activityRecord')}>
						활동기록
					</Tag>
					<Tag clicked={clickedTags.tag} onClick={() => handleTagClick('tag')}>
						태그
					</Tag>
				</ContentBox>
				<ContentBox>
					<TitleBox>
						<TitleText>정렬</TitleText>
					</TitleBox>
					<Text clicked={clickedSort.latest} onClick={() => handleSortClick('latest')}>
						최신순
					</Text>
					<Text clicked={clickedSort.earliest} onClick={() => handleSortClick('earliest')}>
						오래된순
					</Text>
				</ContentBox>
				<ContentBox>
					<TitleBox>
						<TitleText>기간</TitleText>
					</TitleBox>
					<DateConatainer>
						<DateBox></DateBox> ~ <DateBox></DateBox>
					</DateConatainer>
					<Apply>적용</Apply>
				</ContentBox>

				<EmptyBox></EmptyBox>
			</Filter>
			<FilterReset>
				<ResetIcon>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none">
						<path
							d="M11.9985 7.00146H16.8569V2.14307"
							stroke="#707070"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M16.8301 11.8301C16.4273 13.3337 15.5395 14.6623 14.3046 15.6099C13.0697 16.5574 11.5566 17.0711 10 17.0711C8.44342 17.0711 6.93033 16.5574 5.69541 15.6099C4.46049 14.6623 3.57275 13.3337 3.16987 11.8301C2.767 10.3266 2.87151 8.73212 3.46719 7.29402C4.06286 5.85592 5.11642 4.65457 6.46447 3.87628C7.81251 3.09798 9.37969 2.78625 10.923 2.98943C12.4662 3.1926 13.8993 3.89933 15 5"
							stroke="#707070"
							strokeWidth="2"
							strokeLinecap="round"
						/>
					</svg>
				</ResetIcon>
				<ResetText>필터 초기화</ResetText>
			</FilterReset>
		</Box>
	);
}
