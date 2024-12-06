import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const Container = styled.div`
	width: 380px;
	border: 1px solid var(--gray-02, #707070); /* 컨테이너에 보더 추가 */
	display: flex;
	flex-direction: column;
	align-items: center; /* 자식 요소들을 수평 가운데 정렬 */
	background: var(--gray-04, #e0e0e0);
`;

const Title = styled.div`
	color: var(--black, #000);
	font-family: Pretendard;
	font-size: 20px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;

	border: 1px solid black;
	margin-top: 30px;
	margin-bottom: 25px;
	text-align: center; /* 텍스트 가운데 정렬 */
`;

const Nav = styled.div`
	display: flex;
	gap: 80px;
	justify-content: space-around;
	position: relative;

	border: 1px solid black;
`;

const NavText = styled.div`
	color: ${(props) => (props.isSelected ? 'var(--black, #000)' : 'var(--gray-02, #707070)')};
	text-align: center;
	font-family: Pretendard;
	font-size: 20px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
	cursor: pointer;

	margin-bottom: 5px;
`;

const Underline = styled.div`
	position: absolute;
	bottom: 0;
	left: ${(props) => props.position}px;
	width: ${(props) => props.width}px;
	height: 5px;
	background: var(--main-01, #3aaf85);
`;

const SearchWrapper = styled.div`
	position: relative;
	width: 325px;
	margin: 20px 0;
	border: 1px solid black;
`;

const Search = styled.input`
	height: 35px; /* 보이는 높이 설정 */
	width: 100%;
	padding: 7px 12px; /* 내부 패딩 */
	padding-right: 40px; /* 오른쪽 아이콘 공간 확보 */
	border-radius: 10px;
	background: #fff;
	border: 1px solid var(--gray-02, #707070);
	box-sizing: border-box; /* 패딩과 보더 포함 */
`;

const Icon = styled.svg`
	position: absolute;
	right: 10px;
	top: 50%;
	transform: translateY(-50%);
	width: 25px;
	height: 25px;
	fill: #707070;
	cursor: pointer;
`;

export default function Helper() {
	const [selectedTab, setSelectedTab] = useState('활동기록');
	const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });

	const navRefs = {
		활동기록: useRef(null),
		자기소개서: useRef(null),
	};

	useEffect(() => {
		// 컴포넌트가 렌더링된 후 초기 상태 설정
		const initialTab = navRefs[selectedTab].current;
		if (initialTab) {
			const { offsetLeft, offsetWidth } = initialTab;
			setUnderlineStyle({ left: offsetLeft, width: offsetWidth });
		}
	}, [selectedTab]);

	const handleNavClick = (e, tabName) => {
		const { offsetLeft, offsetWidth } = e.target;
		setSelectedTab(tabName);
		setUnderlineStyle({ left: offsetLeft, width: offsetWidth });
	};

	return (
		<Container>
			<Title>자기소개서 작성 도우미</Title>
			<Nav>
				<NavText
					ref={navRefs['활동기록']}
					isSelected={selectedTab === '활동기록'}
					onClick={(e) => handleNavClick(e, '활동기록')}>
					활동기록
				</NavText>
				<NavText
					ref={navRefs['자기소개서']}
					isSelected={selectedTab === '자기소개서'}
					onClick={(e) => handleNavClick(e, '자기소개서')}>
					자기소개서
				</NavText>
				<Underline position={underlineStyle.left} width={underlineStyle.width} />
			</Nav>
			<SearchWrapper>
				<Search placeholder="검색어를 입력하세요" />
				<Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" fill="none">
					<path
						d="M22.5852 23.7075L14.6307 16.0334C13.9205 16.5816 13.1037 17.0155 12.1804 17.3353C11.2571 17.655 10.2746 17.8149 9.23295 17.8149C6.65246 17.8149 4.46875 16.9529 2.68182 15.229C0.893939 13.5042 0 11.397 0 8.90746C0 6.41794 0.893939 4.31075 2.68182 2.5859C4.46875 0.861968 6.65246 0 9.23295 0C11.8134 0 13.9976 0.861968 15.7855 2.5859C17.5724 4.31075 18.4659 6.41794 18.4659 8.90746C18.4659 9.9124 18.3002 10.8602 17.9687 11.751C17.6373 12.6417 17.1875 13.4297 16.6193 14.1149L24.6094 21.8233C24.8698 22.0745 25 22.3828 25 22.7483C25 23.1137 24.858 23.4335 24.5739 23.7075C24.3134 23.9588 23.982 24.0844 23.5795 24.0844C23.1771 24.0844 22.8456 23.9588 22.5852 23.7075ZM9.23295 15.0742C11.0085 15.0742 12.518 14.4748 13.7614 13.2762C15.0038 12.0767 15.625 10.6204 15.625 8.90746C15.625 7.19448 15.0038 5.73823 13.7614 4.53869C12.518 3.34007 11.0085 2.74076 9.23295 2.74076C7.45739 2.74076 5.94792 3.34007 4.70454 4.53869C3.46212 5.73823 2.84091 7.19448 2.84091 8.90746C2.84091 10.6204 3.46212 12.0767 4.70454 13.2762C5.94792 14.4748 7.45739 15.0742 9.23295 15.0742Z"
						fill="#707070"
					/>
				</Icon>
			</SearchWrapper>
		</Container>
	);
}
