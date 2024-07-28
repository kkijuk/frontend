import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Container = styled.div`
  width: 100%;
  max-width: 850px;
  margin: 0 auto;
  padding: 24px 40px;
  background-color: #fff;
  border-radius: 8px;
`;

const Title = styled.h1`
  color: var(--black, #000);
  font-family: Pretendard;
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 20px;
  margin-left: 18px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 2px solid #D9D9D9;
  padding-bottom: 16px;
  margin-bottom: 24px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ListTitle = styled.div`
  font-size: 24px;
  font-weight: 700;
  margin-top: 16px; /* 제목을 아래로 내리기 위해 추가 */
`;

const EditDeleteContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 10px;
`;

const SubHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #F5F5F5;
  padding: 16px;
  border-radius: 8px;
  margin-top: 16px;
`;

const InfoLabel = styled.div`
  font-size: 14px;
  color: #707070;
`;

const DateText = styled.div`
  color: #707070;
  font-size: 14px;
`;

const TagContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  margin-bottom: 8px;
`;

const Contents = styled.div`
  font-size: 16px;
  white-space: pre-line;
`;

const Line = styled.div`
  width: 100%;
  height: 2px;
  background: #D9D9D9;
  margin: 24px 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const ApplyButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; /* Flex로 버튼과 제목 사이 공간을 확보 */
  gap: 15px; /* 버튼 사이에 15px 간격 추가 */
  margin-bottom: 24px;
`;

const ApplyButton = styled.div`
  height: 50px;
  display: flex;
  align-items: center; /* 버튼의 수직 정렬 */
  background-color: #4CAF50; /* 임의의 배경색 */
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`;

const EditIconStyled = styled(EditIcon)`
  cursor: pointer;
`;

const DeleteIconStyled = styled(DeleteIcon)`
  cursor: pointer;
`;

const TagLabel = styled.div`
  font-size: 14px;
  color: #707070;
`;

const ApplyDetail = () => {
  const location = useLocation();
  const { job } = location.state;

  return (
    <Container>
      <Title>지원공고 관리</Title>
      <Header>
        <ApplyButtonContainer>
          <ListTitle>{job.details}</ListTitle>
          <ApplyButton>지원하러 가기</ApplyButton>
        </ApplyButtonContainer>
        <SubHeader>
          <InfoLabel>접수시작: {job.startDate}</InfoLabel>
          <InfoLabel>접수마감: {job.endDate}</InfoLabel>
          <TagLabel>태그</TagLabel>
        </SubHeader>
        
      </Header>
      <Section>
        <SectionHeader>코딩테스트</SectionHeader>
        <Contents>{job.contents}</Contents>
        <DateText>{job.testDate}</DateText>
      </Section>
      <Section>
        <SectionHeader>면접</SectionHeader>
        <Contents>{job.interviewContents}</Contents>
        <DateText>{job.interviewDate}</DateText>
      </Section>
      <Line />
      <ButtonContainer>
        <ApplyButton>진행 후기 추가</ApplyButton>
      </ButtonContainer>
    </Container>
  );
}

export default ApplyDetail;

