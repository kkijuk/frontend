import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom'; // URL에서 careerId를 가져오기 위해 사용
import Careerbox from '../components/MyCareerDetail/CareerBox';
import CareerList from '../components/MyCareerDetail/CareerList';
import EditIcon from '@mui/icons-material/Edit';

import DetailAdd from '../components/MyCareerDetail/DetailAdd';
import CareerNameTag from '../components/shared/CareerNameTag';
import AddCareerModalEdit from '../components/shared/AddCareerModalEdit';
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

    position: relative; /* Add this line */

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
  border: 1px solid black;
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
const EditIconStyled = styled(EditIcon)`
   width: 30px !important;  /* !important를 사용하여 우선순위를 높임 */
  height: 30px !important; /* !important를 사용하여 우선순위를 높임 */
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  color: #707070 !important; /* color 속성을 사용하여 색상 변경 */
`;


export default function MycareerDetail() {
  const [careers, setCareers] = useState([]); // CareerBox에 들어갈 데이터
  const [selectedCareerDetail, setSelectedCareerDetail] = useState(null); // 선택된 CareerBox의 상세 정보
  const [isAdding, setIsAdding] = useState(false); // 활동 기록 추가 상태
  const { careerId } = useParams(); // URL에서 careerId 추출
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // 모달 상태 추가
  const [modalData, setModalData] = useState(null); // 모달에 표시할 데이터 상태

  const navigate = useNavigate(); // useNavigate 훅 추가

  // 데이터 가져오기 및 careerId에 해당하는 CareerBox 선택
  useEffect(() => {
    const fetchCareers = async () => {
      const response = await CareerViewSelect('year'); // 항상 'year'로 설정하여 데이터 가져오기
      const data = response.data; // 응답 데이터에서 'data' 배열 추출
      console.log("박스 안의 data값:", data);
      setCareers(data);

      // URL에서 받아온 careerId에 해당하는 CareerBox를 자동 선택
      if (careerId) {
        loadCareerDetail(careerId);
      }
    };

    fetchCareers();
  }, [careerId]);

  // 특정 careerId의 상세 데이터를 로드하는 함수
  const loadCareerDetail = async (careerId) => {
    const careerDetail = await ViewCareerDetail(careerId);
    console.log('선택된 CareerBox의 상세 데이터:', careerDetail);
    setSelectedCareerDetail(careerDetail);
    setIsAdding(false); // 새로운 Careerbox를 클릭하면 활동 기록 추가를 닫음

    console.log("selectCareerDetail:", selectedCareerDetail);
    if (careerDetail) {
      navigate(`/mycareer/${careerId}`, { state: { details: careerDetail.data } });
    }
  };

 // 모달 열기 핸들러
 const handleEditClick = async () => {
  console.log('Edit icon clicked');

  if (careerId) {
    try {
      const careerDetailData = await ViewCareerDetail(careerId);
      console.log('모달에 보낼 데이터:', careerDetailData);
      
      setIsEditModalOpen(true);
      setModalData(careerDetailData);
    } catch (error) {
      console.log('Error fetching career details:', error);
    }
  }
};

// 모달 닫기 핸들러
const handleModalClose = () => {
  setIsEditModalOpen(false);
};

// 모달 저장 핸들러 (여기에 실제 저장 로직 추가)
const handleModalSave = (data) => {
  console.log('저장된 데이터:', data);
  // 여기서 데이터를 저장하거나 상태를 업데이트할 수 있습니다.
};


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
                selected={selectedCareerDetail?.data?.id === item.id} // ID를 기준으로 선택된 항목을 결정
                onClick={() => loadCareerDetail(item.id)} // 클릭 시 해당 항목의 상세 데이터를 로드
              />
            ))
          ))}
        </CareerBoxList>

        <Box></Box>
        <CareerTitle>
          <div>
            {selectedCareerDetail && (
              <ActivityRecordWrapper>
                <ActivityRecord>{selectedCareerDetail.data.alias} 활동기록</ActivityRecord>
                <CareerNameT>
                  <CareerNameTag careerName={selectedCareerDetail.data.careerName} category={selectedCareerDetail.data.categoryId} />
                </CareerNameT>
              </ActivityRecordWrapper>
            )}
            {selectedCareerDetail && (
              <>
                <ActivityDate>{formatDate(selectedCareerDetail.data.startDate)} ~ {formatDate(selectedCareerDetail.data.endDate)}</ActivityDate>
                <ActivityDetails>{selectedCareerDetail.data.summary}</ActivityDetails>
              </>
            )}
          </div>
          <EditIconStyled  onClick={handleEditClick} />

                
        </CareerTitle>
      </Container1>
      <Container2>
        <CareerListBox>
          {selectedCareerDetail?.data?.details?.map((detail, index) => (
            <CareerList
              key={index}
              title={detail.title}
              date={`${formatDate(detail.startDate)} ~ ${formatDate(detail.endDate)}`}
              contents={detail.content}
              detailTag={detail.careerTagList.map(tag => tag.tagName)}
              careerId={careerId} // careerId 전달
              detailId={detail.id} // detailId 전달
              onUpdate={() => loadCareerDetail(careerId)} // 데이터 갱신 콜백 전달

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

      {isEditModalOpen && (
        <AddCareerModalEdit
        
          onClose={handleModalClose}
          onSave={handleModalSave}
          data={modalData}
        />
      )}
    </Body>
  );
}

const formatDate = (dateString) => {
  if (!dateString) return ''; // dateString이 undefined, null 또는 빈 문자열일 경우 빈 문자열 반환
  return dateString.replace(/-/g, '.');
};
