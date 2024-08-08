import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import EditApplyModal from '../../components/Apply/EditApplyModal'; // EditApplyModal을 포함하는 컴포넌트
import ApplyDeleteModal from '../../components/Apply/ApplyDeleteModal'; // 삭제 모달 컴포넌트 추가
import { deleteRecruit } from '../../api/Apply/DeleteRecruit'; // DeleteRecruit API 호출 컴포넌트
import { getRecruitDetails } from '../../api/Apply/RecruitDetails'; // RecruitDetails API 호출 컴포넌트
import { updateRecruitStatus } from '../../api/Apply/RecruitStatus'; 
import { updateRecruit } from '../../api/Apply/RecruitUpdate';
import { Link } from 'react-router-dom';

const SvgIcon = styled.svg`
  width: 20px;
  height: 20px;
  fill: none;
  stroke: ${({ hasLink }) => (hasLink ? '#3AAF85' : '#707070')}; /* 테두리 색상 */
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
`;

const DeleteSvgIcon = ({ onClick }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none" onClick={onClick} style={{ cursor: 'pointer' }}>
    <path d="M6.83333 9.25H5.55556V25.5C5.55556 26.163 5.8248 26.7989 6.30406 27.2678C6.78332 27.7366 7.43334 28 8.11111 28H20.8889C21.5667 28 22.2167 27.7366 22.6959 27.2678C23.1752 26.7989 23.4444 26.163 23.4444 25.5V9.25H6.83333ZM20.4008 5.5L18.3333 3H10.6667L8.59922 5.5H3V8H26V5.5H20.4008Z" fill="#707070" />
    <line x1="14.5352" y1="24" x2="14.5352" y2="12" stroke="white" strokeWidth="1.5" />
    <line x1="18.8223" y1="24" x2="18.8223" y2="12" stroke="white" strokeWidth="1.5" />
    <line x1="10.25" y1="24" x2="10.25" y2="12" stroke="white" strokeWidth="1.5" />
  </svg>
);

const EditSvgIcon = ({ onClick }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="23"
    height="23"
    viewBox="0 0 23 23"
    fill="none"
    onClick={onClick}
    style={{ cursor: 'pointer' }}
  >
    <path d="M0 18.209V23H4.791L18.9213 8.86974L14.1303 4.07874L0 18.209ZM22.6263 5.1647C23.1246 4.66644 23.1246 3.86155 22.6263 3.36328L19.6367 0.373698C19.1385 -0.124566 18.3336 -0.124566 17.8353 0.373698L15.4973 2.71171L20.2883 7.50271L22.6263 5.1647Z" fill="#707070" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Container = styled.div`
  width: 100%;
  max-width: 850px;
  margin: 0 auto;
  padding: 24px 40px;
  background-color: #fff;
  border-radius: 8px;
`;

const BackLink = styled(Link)`
  display: inline-block;
  color: black;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 20px;
  text-decoration: none;
  margin-left: 20px;
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
  margin-top: -15px;
`;

const ListTitle = styled.div`
  font-size: 24px;
  font-weight: 700;
  margin-top: 16px; 
  margin-left: 70px;
`;

const EditDeleteContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  margin-right: 0px; /* 아이콘을 오른쪽으로 이동 */
`;

const SubHeader = styled.div`
  width: 720px;
  height: 60px;
  flex-shrink: 0;
  border-radius: 12px;
  background: var(--gray-06, #F5F5F5);
  padding: 15px 10px;
  position:relative;
  margin-top: 20px;
  margin-left: 70px;
`;

const InfoLabelStart = styled.div`
  width:250px;
  display:flex;
  align-items:center;
  gap:50px;
  position:absolute;
  margin-left: 5px;
`;

const InfoLabelEnd = styled.div`
  width:250px;
  display:flex;
  align-items:center;
  gap:20px;
  position:absolute;
  margin-left: 300px;
`;

const TagLabel = styled.div`
  width:250px;
  display:flex;
  align-items:center;
  gap:10px;
  position:absolute;
  margin-top: 40px;
  margin-left: 5px;
`;

const Tag = styled.div`
  display: inline-flex;
  height: 22px;
  padding: 0px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 20px;
  font-family:'Regular';
  font-size:12px;
  text-align: center;
  font-weight: 400;
  line-height: normal;
  background: white;
  color: var(--main-01, #3AAF85);
  margin-left: 10px;
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
`;

const ApplyButton = styled.div`
  display: flex;
  align-items: center; /* 수직 중앙 정렬 */
  border: 2px solid ${({ hasLink }) => (hasLink ? '#3AAF85' : '#707070')}; /* 테두리 색상 */
  border-radius: 12px; /* 둥근 모서리 */
  padding: 7px 18px; /* 내부 여백 */
  color: ${props => props.hasLink ? '#3AAF85' : '#707070'}; /* 글자 색상 */
  cursor: pointer;
  background: ${props => props.hasLink ? 'white' : 'transparent'}; /* 배경색 변경 */
  margin-left: 30px;
  margin-bottom: -12px;
`;

const ApplyButtonText = styled.span`
  margin-right: 5px; /* 텍스트를 5px 왼쪽으로 이동 */
`;

const Button = styled.div`
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
  display: flex; /* Flex를 사용하여 중앙 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
  justify-content: center; /* 수평 중앙 정렬 */
`;

const EditIconStyled = styled(EditSvgIcon)`
  cursor: pointer;
  margin-right: 10px; /* 아이콘 사이에 5px 간격 추가 */
`;

const DeleteIconStyled = styled(DeleteSvgIcon)`
  cursor: pointer;
`;

const DropdownContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 70px;
  margin-top: 10px;
  background-color: ${({ status }) => {
    switch (status) {
      case 'UNAPPLIED':
        return '#D9D9D9';
      case 'PLANNED':
        return '#B0B0B0';
      case 'APPLYING':
        return '#707070';
      case 'ACCEPTED':
        return '#78D333';
      case 'REJECTED':
        return '#FA7C79';
      default:
        return '#707070';
    }
  }};
  width: ${({ status }) => (status === 'PLANNED' ? '70px' : '65px')}; /* 지원 예정일 경우 가로 길이 5px 추가 */
  height: 10px;
  border-radius: 10px;
  padding: 0px 5px;
  font-size: 12px;
  padding: 5px 10px;
  color: white;
  position: relative;
`;

const Dropdown = styled.select`
padding: 0px 5px;
font-family: 'Light';
  border: none;
  border-radius: 10px;
  background: transparent;
  font-size: 13px;
  color: white;
  -webkit-appearance: none;  /* for Chrome */
  -moz-appearance: none; /* for Firefox */
  appearance: none;
   padding-left: ${({ value }) => (value === 'PLANNED' ? '-4px' : '10px')}; /* 지원 예정일 경우 글씨 위치 오른쪽으로 2px 이동 */
  margin-left: -3px;
  width: 100%; 
  outline: none; /* 클릭 시 테두리 효과 제거 */
   option {
    color: black; /* 드롭다운 메뉴의 글씨 색을 검정으로 변경 */
  }
`;

const DropdownIcon = styled.span`
  position: absolute;
  right: 10px;
  pointer-events: none;
  transform: translateY(0px);
`;


const ApplyDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        console.log('Fetching job details for ID:', id); // ID 로그 추가
        const jobDetails = await getRecruitDetails(id);
        console.log('Fetched job details:', jobDetails);
        setJob(jobDetails);
        setStatus(jobDetails.status); // 상태 설정
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };

    if (location.state && location.state.job) {
      setJob(location.state.job);
      setStatus(location.state.job.status); // 상태 설정
      console.log('Job set from location state:', location.state.job);
    } else {
      fetchJobDetails();
    }
  }, [id, location.state]);

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleSave = async (updatedJob) => {
    try {
      console.log('Updated job:', updatedJob);
      const response = await updateRecruit(updatedJob.id, updatedJob);
      console.log('Update response:', response);
      setJob(updatedJob); // 성공 시 상태 업데이트
      setIsEditModalOpen(false); // 모달 닫기
    } catch (error) {
      console.error('Error updating job:', error);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      if (job && job.id) {
        console.log('Deleting job with id:', job.id);
        await deleteRecruit(job.id);
        console.log('Job deleted');
        setIsDeleteModalOpen(false);
        navigate('/apply');
      } else {
        console.error('Job ID is missing');
      }
    } catch (error) {
      console.error('Failed to delete job:', error);
    }
  };

  const handleStatusChange = async (event) => {
    const newStatus = event.target.value;
    setStatus(newStatus);
  
    try {
      await updateRecruitStatus(id, newStatus);
      console.log('Status updated successfully');
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const handleApplyClick = () => {
    if (job && job.link) {
      window.open(job.link, '_blank'); // 링크를 새 창에서 엽니다.
    }
  };

  if (!job) {
    return <div>Loading...</div>;
  }

  const statusTextMap = {
    UNAPPLIED: '미지원',
    PLANNED: '지원 예정',
    APPLYING: '진행 중',
    ACCEPTED: '합격',
    REJECTED: '불합격',
  };

  return (
    <Container>
      <Title>지원공고 관리</Title>
      <BackLink to="/apply">&lt; 지원현황</BackLink> {/* 추가된 부분 */}
      <Header>
        <TitleContainer>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <ListTitle>{job.title}</ListTitle>
            <ApplyButton hasLink={Boolean(job.link)} onClick={() => job.link && window.open(job.link, '_blank')}>
              <ApplyButtonText>지원하러 가기</ApplyButtonText>
              <SvgIcon hasLink={Boolean(job.link)}>
                <path d="M10.834 9.16732L17.6673 2.33398" />
                <path d="M18.334 5.66602V1.66602H14.334" />
                <path d="M9.16602 1.66602H7.49935C3.33268 1.66602 1.66602 3.33268 1.66602 7.49935V12.4993C1.66602 16.666 3.33268 18.3327 7.49935 18.3327H12.4993C16.666 18.3327 18.3327 16.666 18.3327 12.4993V10.8327" />
              </SvgIcon>
            </ApplyButton>
          </div>
          <EditDeleteContainer>
            <EditSvgIcon onClick={handleEditClick} />
            <DeleteSvgIcon onClick={handleDeleteClick} />
          </EditDeleteContainer>
        </TitleContainer>
        <DropdownContainer status={status}>
  <Dropdown value={status} onChange={handleStatusChange} valueLength={statusTextMap[status].length}>
    <option value="UNAPPLIED">미지원</option>
    <option value="PLANNED">지원 예정</option>
    <option value="APPLYING">진행 중</option>
    <option value="ACCEPTED">합격</option>
    <option value="REJECTED">불합격</option>
  </Dropdown>
  <DropdownIcon>▼</DropdownIcon>
</DropdownContainer>

        <SubHeader>
          <InfoLabelStart>접수 시작 {job.startTime}</InfoLabelStart>
          <InfoLabelEnd>접수 마감 {job.endTime}</InfoLabelEnd>
          <TagLabel>
            태그
            {job.tags.map((tag, idx) => (
              <Tag key={idx}>{tag}</Tag>
            ))}
          </TagLabel>
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
        <Button>전형 후기 추가</Button>
      </ButtonContainer>
      {isEditModalOpen && (
        <EditApplyModal job={job} onClose={handleCloseEditModal} onSave={handleSave} />
      )}
      {isDeleteModalOpen && (
        <ApplyDeleteModal onClose={handleCloseDeleteModal} onConfirm={handleDeleteConfirm} />
      )}
    </Container>
  );
};

export default ApplyDetail;
