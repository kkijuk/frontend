import React from 'react';
import styled from 'styled-components';

// 스타일 정의
const Container = styled.div`
	width: 820px;
	margin: 0 auto;
	border: 1px solid black;
	padding: 20px;
	box-sizing: border-box;
`;

const Header = styled.div`
	text-align: center;
	font-family: Pretendard;
	font-size: 24px;
	font-weight: bold;
	margin-bottom: 20px;
`;

const Table = styled.table`
	width: 100%;
	border-collapse: collapse;
	margin-bottom: 20px;
`;

const Th = styled.th`
	border: 1px solid black;
	text-align: center;
	font-weight: bold;
	padding: 8px;
	background-color: #f5f5f5;
`;

const Td = styled.td`
	border: 1px solid black;
	text-align: center;
	padding: 8px;
`;

const SectionTitle = styled.div`
	font-family: Pretendard;
	font-size: 18px;
	font-weight: bold;
	margin: 20px 0 10px;
	border-bottom: 2px solid black;
	padding-bottom: 5px;
`;

export default function Resume() {
	return (
		<Container>
			<Header>이력서</Header>

			{/* 개인정보 */}
			<Table>
				<tbody>
					<tr>
						<Th>성명</Th>
						<Td>김끼적</Td>
						<Th>생년월일</Th>
						<Td>20021202</Td>
					</tr>
					<tr>
						<Th>연락처</Th>
						<Td>01011111111</Td>
						<Th>이메일</Th>
						<Td>siusy2618@naver.com</Td>
					</tr>
					<tr>
						<Th>주소</Th>
						<Td colSpan="3">서울시 서초구</Td>
					</tr>
				</tbody>
			</Table>

			{/* 학력 */}
			<SectionTitle>학력</SectionTitle>
			<Table>
				<thead>
					<tr>
						<Th>재학기간</Th>
						<Th>학교명</Th>
						<Th>전공</Th>
						<Th>구분</Th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<Td>2009.03.02~2015.02.01</Td>
						<Td>유치원~~~</Td>
						<Td>-</Td>
						<Td>졸업</Td>
					</tr>
					<tr>
						<Td>2009.03.02~2015.02.01</Td>
						<Td>초등학교</Td>
						<Td>-</Td>
						<Td>졸업</Td>
					</tr>
					<tr>
						<Td>2015.03.02~2018.02.01</Td>
						<Td>중학교</Td>
						<Td>-</Td>
						<Td>졸업</Td>
					</tr>
					<tr>
						<Td>2018.03.02~2021.02.01</Td>
						<Td>고등학교</Td>
						<Td>이과</Td>
						<Td>졸업</Td>
					</tr>
					<tr>
						<Td>2022.03.02~</Td>
						<Td>서울여자대학교</Td>
						<Td>소프트웨어융합학과</Td>
						<Td>재학</Td>
					</tr>
				</tbody>
			</Table>

			{/* 경력 */}
			<SectionTitle>경력</SectionTitle>
			<Table>
				<thead>
					<tr>
						<Th>활동명</Th>
						<Th>기간</Th>
						<Th>업무내용</Th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<Td>umc 6th web</Td>
						<Td>2024.03.24~2024.08.23</Td>
						<Td>리액트를 사용한 프론트엔드 개발</Td>
					</tr>
					<tr>
						<Td>서울여대 소학회</Td>
						<Td>2023.09.01~</Td>
						<Td>Node.js를 사용한 백엔드 개발</Td>
					</tr>
					<tr>
						<Td>졸린고</Td>
						<Td>2023.09.01~</Td>
						<Td>휴학</Td>
					</tr>
					<tr>
						<Td>스타트업 인턴십</Td>
						<Td>2023.05.01~2023.08.31</Td>
						<Td>React 및 Redux를 활용한 UI 개발</Td>
					</tr>
					<tr>
						<Td>팀 프로젝트</Td>
						<Td>2022.09.01~2023.02.01</Td>
						<Td>Java Spring Boot를 사용한 웹 애플리케이션 개발</Td>
					</tr>
					<tr>
						<Td>개인 프로젝트</Td>
						<Td>2021.12.01~2022.03.01</Td>
						<Td>Python과 Django를 활용한 블로그 제작</Td>
					</tr>
					<tr>
						<Td>봉사활동</Td>
						<Td>2020.06.01~2020.08.01</Td>
						<Td>코딩 기초 교육 프로그램 지원</Td>
					</tr>
					<tr>
						<Td>해커톤 참가</Td>
						<Td>2019.11.01~2019.11.02</Td>
						<Td>팀장으로 프로젝트 관리 및 발표</Td>
					</tr>
					<tr>
						<Td>팀 프로젝트</Td>
						<Td>2022.09.01~2023.02.01</Td>
						<Td>Java Spring Boot를 사용한 웹 애플리케이션 개발</Td>
					</tr>
					<tr>
						<Td>개인 프로젝트</Td>
						<Td>2021.12.01~2022.03.01</Td>
						<Td>Python과 Django를 활용한 블로그 제작</Td>
					</tr>
				</tbody>
			</Table>

			{/* 자격증 */}
			<SectionTitle>자격증</SectionTitle>
			<Table>
				<thead>
					<tr>
						<Th>취득일자</Th>
						<Th>자격명 및 자격번호</Th>
						<Th>급수</Th>
						<Th>발급기관</Th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<Td>2022.05.07</Td>
						<Td>운전면허</Td>
						<Td>2종보통</Td>
						<Td>도로교통공단</Td>
					</tr>
					<tr>
						<Td>2024.11.17</Td>
						<Td>SQLD</Td>
						<Td>-</Td>
						<Td>한국데이터산업진흥원</Td>
					</tr>
					<tr>
						<Td>2021.03.10</Td>
						<Td>정보처리기사</Td>
						<Td>-</Td>
						<Td>한국산업인력공단</Td>
					</tr>
					<tr>
						<Td>2020.07.15</Td>
						<Td>TOEIC</Td>
						<Td>900점</Td>
						<Td>ETS</Td>
					</tr>
					<tr>
						<Td>2019.09.01</Td>
						<Td>컴퓨터 활용능력 1급</Td>
						<Td>-</Td>
						<Td>대한상공회의소</Td>
					</tr>
					<tr>
						<Td>2018.06.20</Td>
						<Td>Python Certification</Td>
						<Td>-</Td>
						<Td>Microsoft</Td>
					</tr>
					<tr>
						<Td>2022.05.07</Td>
						<Td>운전면허</Td>
						<Td>2종보통</Td>
						<Td>도로교통공단</Td>
					</tr>
					<tr>
						<Td>2024.11.17</Td>
						<Td>SQLD</Td>
						<Td>-</Td>
						<Td>한국데이터산업진흥원</Td>
					</tr>
					<tr>
						<Td>2021.03.10</Td>
						<Td>정보처리기사</Td>
						<Td>-</Td>
						<Td>한국산업인력공단</Td>
					</tr>
				</tbody>
			</Table>
		</Container>
	);
}
