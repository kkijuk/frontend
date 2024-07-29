import React, { useState } from 'react';
import styled from 'styled-components';
import Careerbox from '../components/MyCareerDetail/CareerBox';
import CareerList from '../components/MyCareerDetail/CareerList';
import DetailAdd from '../components/MyCareerDetail/DetailAdd';
import CareerNameTag from '../components/shared/CareerNameTag';
import EditIconBig from '../components/shared/EditIconBigSIze';

const Body = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column; /*Top이랑 CareerBox를 세로 방향 정렬*/
  box-sizing: border-box; /* 추가 */
  padding-bottom: 100px;
`;

const Container1 = styled.div`
  width: 820px;
  height: 299px;
  display: flex;
  flex-direction: column; /* Top과 CareerBox를 세로 방향으로 정렬 */
  justify-content: center; /* 수직 방향으로 중앙 정렬 */
  align-items: center; /* 수평 방향으로 중앙 정렬 */
  box-sizing: border-box; /* 추가 */
`;

const Top = styled.div`
  width: 820px;
  height: 108px;
  padding-bottom: 5px;
  box-sizing: border-box; /* 추가 */
  padding-top: 35px; /* 추가된 부분 */
  display: flex; /* 아이콘과 텍스트를 가로로 배치하기 위해 추가 */
  justify-content: space-between; /* 텍스트와 아이콘을 양쪽 끝으로 배치 */
  align-items: center; /* 아이콘과 텍스트를 수직으로 중앙 정렬 */
`;

const CareerBoxList = styled.div`
  display: flex;
  width: 800px;
  height: 72px;
  align-items: flex-start;
  gap: 10px;
  overflow-x: auto; /* 가로 스크롤 추가 */
  overflow-y: hidden; /* 세로 스크롤 숨김 */
  white-space: nowrap; /* 줄바꿈을 하지 않음 */
`;

const Box = styled.div` /*Box는 다 빈칸채우기 위한 애들임!*/
  width: 800px;
  height: 30px;
  box-sizing: border-box; /* 추가 */
`;

const CareerTitle = styled.div`
  width: 800px;
  height: 89px;
  box-sizing: border-box; 
  display: flex;
  justify-content: space-between; /* 왼쪽에 텍스트, 오른쪽에 아이콘 배치 */
  align-items: flex-start; /* 텍스트와 아이콘을 수직 정렬 */
`;

const Container2 = styled.div`
  width: 800px;
  height: 477px;
`;

const Box2 = styled.div`
  width: 800px;
  height: 2px;
`;

const CareerListBox = styled.div`
  width: 800px;
  height: 475px;
  overflow-y: auto; /* Enables vertical scrolling */
  overflow-x: hidden;
`;

const Container3 = styled.div`
  width: 800px;
  height: 174px;
  display: flex;
  justify-content: center;
  align-items: flex-end; /* 항목을 아래쪽에 정렬 */
  box-sizing: border-box; /* 추가 */
`;

const CareerPlus = styled.button`
  width: 720px;
  height: 50px;
  border-radius: 10px;
  background: var(--main-01, #3AAF85);
  border: none; /* 테두리를 없앰 */
  color: white; /* 글자 색을 흰색으로 변경 */
  cursor: pointer; /* 마우스 커서를 포인터로 변경 */
  position: fixed; /* 화면에 고정 */
  bottom: 30px; /* 화면 하단에서 30px 위로 위치 */
  background: ${props => props.disabled ? 'var(--gray-03, #D9D9D9)' : 'var(--main-01, #3AAF85)'};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
`;

const SearchIcon = styled.svg`
  width: 25px;
  height: 25px;
  flex-shrink: 0;
  cursor: pointer; /* 커서를 포인터로 변경 */
`;

const ActivityRecordWrapper = styled.div` /*alias랑 careerNameTag가 각각 왼쪽 오른쪽에 있게 하기 위해*/
  display: flex;
  align-items: center;
`;

const ActivityRecord = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 7px;
`;

const ActivityDate = styled.div`
  color: #707070;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const CareerNameT = styled.div`
  margin-left: 23px;
`;

const MyCareerText = styled.div`
  color: var(--black, #000);
  font-family: Pretendard;
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export default function MycareerDetail() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const dummyData = [
    { startDate: '2023.06', endDate: '2024.01', careerName: '학원 아르바이트', category: '아르바이트/인턴', alias: '학원 알바' },
    { startDate: '2024.03', endDate: '2024.08', careerName: 'IT 서비스 개발 동아리', category: '동아리', alias: 'UMC' },
    { startDate: '2023.06', endDate: '2024.01', careerName: '데이터분석 공모전', category: '공모전/대회', alias: 'dd 공모전'},
    { startDate: '2023.06', endDate: '2024.01', careerName: 'UXUI 소학회', category: '동아리', alias: 'SWUX' },
    { startDate: '2023.06', endDate: '2024.01', careerName: 'oo 서포터즈 3기', category: '대외활동', alias: 'oo 서포터즈' },
    { startDate: '2023.06', endDate: '2024.01', careerName: '디자인 개인 프로젝트', category: '프로젝트', alias: '디자인 프로젝트' }
  ];

  const dummyData2 = [
    { 
      title: '아이디어톤', 
      date: '2024.05.26', 
      contents: '기획한 웹/앱 서비스를 발표하고 피드백을 교환함\n투표 결과 우수상 수상', 
      detailTag: ['Figma 활용 능력','React 활용 능력', '발표 능력' ]
    },
    { 
      title: '피그마 와이어프레임 제작', 
      date: '2024.04.24', 
      contents: '피그마로 와이어프레임 제작\n상세 내역 상세 내역 상세 내역 ', 
      detailTag: ['Figma 활용 능력','React 활용 능력', 'Spring 활용 능력' ]
    },
    { 
      title: '기획서 작성', 
      date: '2024.05.26', 
      contents: '기획서 초안 작성\n어쩌구 저쩌구 어쩌구..', 
      detailTag: ['Notion 활용 능력','Figma 활용 능력']
    },
    { 
      title: '기획서 작성', 
      date: '2024.05.26', 
      contents: '기획서 초안 작성\n어쩌구 저쩌구 어쩌구..', 
      detailTag: ['Notion 활용 능력','Figma 활용 능력']
    }
  ];

  const selectedCareer = dummyData[selectedIndex];

  return (
    <Body>
      <Container1>
        <Top>
          <MyCareerText>내 커리어</MyCareerText>
          <SearchIcon xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
            <path d="M22.5852 23.8578L14.6307 16.3683C13.9205 16.9033 13.1037 17.3268 12.1804 17.6389C11.2571 17.9509 10.2746 18.107 9.23295 18.107C6.65246 18.107 4.46875 17.2657 2.68182 15.5833C0.893939 13.8999 0 11.8435 0 9.41384C0 6.98422 0.893939 4.92774 2.68182 3.24439C4.46875 1.56193 6.65246 0.720703 9.23295 0.720703C11.8134 0.720703 13.9976 1.56193 15.7855 3.24439C17.5724 4.92774 18.4659 6.98422 18.4659 9.41384C18.4659 10.3946 18.3002 11.3196 17.9687 12.189C17.6373 13.0583 17.1875 13.8273 16.6193 14.496L24.6094 22.0189C24.8698 22.2641 25 22.565 25 22.9216C25 23.2783 24.858 23.5903 24.5739 23.8578C24.3134 24.103 23.982 24.2256 23.5795 24.2256C23.1771 24.2256 22.8456 24.103 22.5852 23.8578ZM9.23295 15.4322C11.0085 15.4322 12.518 14.8473 13.7614 13.6775C15.0038 12.5068 15.625 11.0856 15.625 9.41384C15.625 7.74208 15.0038 6.32087 13.7614 5.15019C12.518 3.98041 11.0085 3.39551 9.23295 3.39551C7.45739 3.39551 5.94792 3.98041 4.70454 5.15019C3.46212 6.32087 2.84091 7.74208 2.84091 9.41384C2.84091 11.0856 3.46212 12.5068 4.70454 13.6775C5.94792 14.8473 7.45739 15.4322 9.23295 15.4322Z" fill="#707070"/>
          </SearchIcon>
        </Top>
        <CareerBoxList>
          {dummyData.map((item, index) => (
            <Careerbox
              key={index}
              startDate={item.startDate}
              endDate={item.endDate}
              careerName={item.careerName}
              category={item.category}
              selected={selectedIndex === index}
              onClick={() => setSelectedIndex(index)}
            />
          ))}
        </CareerBoxList>
        <Box></Box>
        <CareerTitle>
          <div>
            {selectedCareer && (
              <ActivityRecordWrapper>
                <ActivityRecord>{selectedCareer.alias} 활동기록</ActivityRecord>
                <CareerNameT>
                  <CareerNameTag careerName={[selectedCareer.careerName]} category={selectedCareer.category} />
                </CareerNameT>
              </ActivityRecordWrapper>
            )}
            {selectedCareer && (
              <ActivityDate>{selectedCareer.startDate} ~ {selectedCareer.endDate}</ActivityDate>
            )}
          </div>
          <EditIconBig />
        </CareerTitle>
      </Container1>
      <Container2>
        <Box2></Box2>
        <CareerListBox>
          {dummyData2.map((item, index) => (
            <CareerList
              key={index}
              title={item.title}
              date={item.date}
              contents={item.contents}
              detailTag={item.detailTag}
            />
          ))}
          {isAdding && <DetailAdd />}
        </CareerListBox>
      </Container2>
      <Container3>
        <CareerPlus
          onClick={() => setIsAdding(true)}
          disabled={isAdding}
        >
          활동 기록 추가
        </CareerPlus>
      </Container3>
    </Body>
  );
}
