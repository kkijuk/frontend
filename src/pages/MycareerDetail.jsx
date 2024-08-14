import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom'; // URL에서 careerId를 가져오기 위해 사용
import Careerbox from '../components/MyCareerDetail/CareerBox';
import CareerList from '../components/MyCareerDetail/CareerList';
import DetailAdd from '../components/MyCareerDetail/DetailAdd';
import CareerNameTag from '../components/shared/CareerNameTag';
import EditIconBig from '../components/shared/EditIconBigSIze';
import { CareerViewSelect } from '../api/Mycareer/CareerviewSelect';
import { ViewCareerDetail } from '../api/Mycareer/ViewCareerDetail';

const Body = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  padding-bottom: 100px;
`;

const Container1 = styled.div`
  width: 820px;
  height: 299px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;

const Top = styled.div`
  width: 820px;
  height: 108px;
  padding-bottom: 5px;
  box-sizing: border-box;
  padding-top: 35px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CareerBoxList = styled.div`
  display: flex;
  width: 800px;
  height: 72px;
  align-items: flex-start;
  gap: 10px;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
`;

const Box = styled.div`
  width: 800px;
  height: 30px;
  box-sizing: border-box;
`;

const CareerTitle = styled.div`
  width: 800px;
  height: auto;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border: 1px solid black;
  padding-bottom: 10px;
`;

const ActivityDetails = styled.div`
  width: 720px;
  color: #000;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 18px;
`;

const Container2 = styled.div`
  width: 800px;
  height: 477px;
`;

const CareerListBox = styled.div`
  width: 800px;
  height: 475px;
  overflow-y: auto;
  overflow-x: hidden;
`;

const Container3 = styled.div`
  width: 800px;
  height: 174px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  box-sizing: border-box;
`;

const CareerPlus = styled.button`
  width: 720px;
  height: 50px;
  border-radius: 10px;
  background: var(--main-01, #3AAF85);
  border: none;
  color: white;
  cursor: pointer;
  position: fixed;
  bottom: 30px;
  background: ${props => props.disabled ? 'var(--gray-03, #D9D9D9)' : 'var(--main-01, #3AAF85)'};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
`;

const SearchIcon = styled.svg`
  width: 25px;
  height: 25px;
  flex-shrink: 0;
  cursor: pointer;
`;

const ActivityRecordWrapper = styled.div`
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
  const [careers, setCareers] = useState([]); // CareerBox에 들어갈 데이터
  const [selectedIndex, setSelectedIndex] = useState(null); // 선택된 CareerBox의 인덱스
  const [selectedCareerDetail, setSelectedCareerDetail] = useState(null); // 선택된 CareerBox의 상세 정보
  const [isAdding, setIsAdding] = useState(false); // 활동 기록 추가 상태
  const { careerId } = useParams(); // URL에서 careerId 추출

  // 데이터 가져오기 및 careerId에 해당하는 CareerBox 선택
  useEffect(() => {
    const fetchCareers = async () => {
      const response = await CareerViewSelect('year'); // 항상 'year'로 설정하여 데이터 가져오기
      const data = response.data; // 응답 데이터에서 'data' 배열 추출

      setCareers(data);

      // URL에서 받아온 careerId에 해당하는 CareerBox를 자동 선택
      const selectedCareer = data
        .flatMap(yearItem => yearItem.careers)
        .find(career => career.id === parseInt(careerId));

      console.log('URL로 받은 careerId:', careerId);
      console.log('매칭된 CareerBox:', selectedCareer);

      if (selectedCareer) {
        setSelectedIndex(selectedCareer.id); // 선택된 CareerBox의 ID를 설정
        setSelectedCareerDetail(selectedCareer); // 선택된 CareerBox의 상세 정보를 설정

        // 선택된 CareerBox의 상세 데이터 가져오기
        const careerDetail = await ViewCareerDetail(careerId);
        console.log('선택된 CareerBox의 상세 데이터:', careerDetail.data);

        setSelectedCareerDetail(careerDetail.data);
      }
    };

    fetchCareers();
  }, [careerId]);

  // 선택된 CareerBox의 데이터를 가져오기
  const selectedCareer = careers.find(career => career.id === selectedIndex);

  return (
    <Body>
      <Container1>
        <Top>
          <MyCareerText>내 커리어</MyCareerText>
          <SearchIcon xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
            <path d="..." fill="#707070"/>
          </SearchIcon>
        </Top>
        <CareerBoxList>
          {careers.map((yearItem) => (
            yearItem.careers.map((item) => (
              <Careerbox
                key={item.id}
                startDate={item.startDate}
                endDate={item.endDate}
                careerName={item.careerName}
                category={item.categoryId}
                selected={selectedIndex === item.id} // ID를 기준으로 선택된 항목을 결정
                onClick={() => {
                  setSelectedIndex(item.id); // 클릭 시 해당 항목의 ID를 설정
                  setSelectedCareerDetail(item); // 선택된 CareerBox의 상세 정보를 설정
                }}
              />
            ))
          ))}
        </CareerBoxList>

        <Box></Box>
        <CareerTitle>
          <div>
            {selectedCareerDetail && (
              <ActivityRecordWrapper>
                <ActivityRecord>{selectedCareerDetail.alias} 활동기록</ActivityRecord>
                <CareerNameT>
                  <CareerNameTag careerName={selectedCareerDetail.careerName} category={selectedCareerDetail.categoryId} />
                </CareerNameT>
              </ActivityRecordWrapper>
            )}
            {selectedCareerDetail && (
              <>
                <ActivityDate>{formatDate(selectedCareerDetail.startDate)} ~ {formatDate(selectedCareerDetail.endDate)}</ActivityDate>
                <ActivityDetails>{selectedCareerDetail.summary}</ActivityDetails>
              </>
            )}
          </div>
          <EditIconBig />
        </CareerTitle>
      </Container1>
      <Container2>
        <CareerListBox>
          {selectedCareerDetail?.details?.map((detail, index) => (
            <CareerList
              key={index}
              title={detail.title}
              date={`${formatDate(detail.startDate)} ~ ${formatDate(detail.endDate)}`}
              contents={detail.content}
              detailTag={detail.careerTagList.map(tag => tag.tagName)}
            />
          ))}
          {isAdding && <DetailAdd onCancel={() => setIsAdding(false)}  careerId={careerId}/>} {/* 콜백 전달 */}
          </CareerListBox>
      </Container2>
      <Container3>
        <CareerPlus onClick={() => setIsAdding(true)} disabled={isAdding}>
          활동 기록 추가
        </CareerPlus>
      </Container3>
    </Body>
  );
}

const formatDate = (dateString) => {
  return dateString.replace(/-/g, '.');
};