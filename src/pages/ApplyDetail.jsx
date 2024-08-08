import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import EditApplyModal from '../components/Apply/EditApplyModal'; // EditApplyModal을 포함하는 컴포넌트
import ApplyDeleteModal from '../components/Apply/ApplyDeleteModal'; // 삭제 모달 컴포넌트 추가
import { deleteRecruit } from '../api/DeleteRecruit'; // DeleteRecruit API 호출 컴포넌트
import { getRecruitDetails } from '../api/RecruitDetails'; // RecruitDetails API 호출 컴포넌트
import { updateRecruit } from '../api/RecruitUpdate';

const SvgIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10.834 9.16732L17.6673 2.33398" stroke="#707070" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18.334 5.66602V1.66602H14.334" stroke="#707070" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9.16602 1.66602H7.49935C3.33268 1.66602 1.66602 3.33268 1.66602 7.49935V12.4993C1.66602 16.666 3.33268 18.3327 7.49935 18.3327H12.4993C16.666 18.3327 18.3327 16.666 18.3327 12.4993V10.8327" stroke="#707070" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

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
  margin-top: 16px; 
`;

const EditDeleteContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  margin-right: 0px; 
`;

const SubHeader = styled.div`
  width: 825px;
  height: 60px;
  flex-shrink: 0;
  border-radius: 12px;
  background: var(--gray-06, #F5F5F5);
  padding: 15px 10px;
  position:relative;
  margin-top: 30px;
`;

const InfoLabelStart = styled.div`
  width:250px;
  display:flex;
  align-items:center;
  gap:20px;
  position:absolute;
`;

const InfoLabelEnd = styled.div`
  width:250px;
  display:flex;
  align-items:center;
  gap:20px;
  position:absolute;
  margin-left:100px;
`;

const TagLabel = styled.div`
  width:250px;
  display:flex;
  align-items:center;
  gap:20px;
  position:absolute;
  margin-top: 40px;
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
  justify-content: space-between; 
  gap: 15px; 
`;

const ApplyButton = styled.div`
  display: flex;
  align-items: center; 
  border: 2px solid #707070; 
  border-radius: 12px; 
  padding: 9px 18px; 
  color: #707070; 
  cursor: pointer;
  background: transparent; 
  margin-left: 30px;
  margin-bottom: -12px;
`;

const ApplyButtonText = styled.span`
  margin-right: 5px; 
`;

const Button = styled.div`
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
  display: flex; 
  align-items: center; 
  justify-content: center; 
`;

const EditIconStyled = styled(EditSvgIcon)`
  cursor: pointer;
  margin-right: 10px; 
`;

const DeleteIconStyled = styled(DeleteSvgIcon)`
  cursor: pointer;
`;

const ApplyDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        console.log('Fetching job details for ID:', id); // ID 로그 추가
        const jobDetails = await getRecruitDetails(id);
        console.log('Fetched job details:', jobDetails);
        setJob(jobDetails);
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };
  
    if (location.state && location.state.job) {
      setJob(location.state.job);
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
  
        // 현재 저장된 recruitIds 목록을 가져와 삭제된 ID를 제거한 후 다시 저장
        const storedIds = localStorage.getItem('recruitIds');
        const recruitIds = storedIds ? JSON.parse(storedIds) : [];
        const updatedRecruitIds = recruitIds.filter(id => id !== job.id);
        localStorage.setItem('recruitIds', JSON.stringify(updatedRecruitIds));
  
        setIsDeleteModalOpen(false);
        navigate('/apply');
      } else {
        console.error('Job ID is missing');
      }
    } catch (error) {
      console.error('Failed to delete job:', error);
    }
  };
  

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Title>지원공고 관리</Title>
      <Header>
        <TitleContainer>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <ListTitle>{job.title}</ListTitle>
            <ApplyButton>
              <ApplyButtonText>지원하러 가기</ApplyButtonText>
              <SvgIcon style={{ marginLeft: '5px' }} />
            </ApplyButton>
          </div>
          <EditDeleteContainer>
            <EditSvgIcon onClick={handleEditClick} />
            <DeleteSvgIcon onClick={handleDeleteClick} />
          </EditDeleteContainer>
        </TitleContainer>
        <SubHeader>
          <InfoLabelStart>접수 시작: {job.startTime}</InfoLabelStart>
          <InfoLabelEnd>접수 마감: {job.endTime}</InfoLabelEnd>
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
        <EditApplyModal
          job={job}
          onClose={handleCloseEditModal}
          onSave={handleSave}
        />
      )}
      {isDeleteModalOpen && (
        <ApplyDeleteModal
          onClose={handleCloseDeleteModal}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </Container>
  );
};

export default ApplyDetail;






