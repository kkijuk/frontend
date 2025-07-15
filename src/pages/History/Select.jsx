import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import Layout from "../../components/Layout";
import SvgIcon from "../../components/shared/SvgIcon";
import { getValidRecruitList } from "../../api/Apply/RecruitValid";
import { createIntro } from "../../api/Intro/intro";
import AddApplyModal from "../../components/Modal/AddApplyModal";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import { trackEvent } from "../../utils/ga4";
import { theme } from "../../constants/theme";
import { Color } from "../../constants/color";

const Select = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: `(max-width: ${theme.breakpoints.md})` }); // 모바일 여부 미디어 쿼리로 확인

  // useState
  const [isModalOpen, setIsModalOpen] = useState(false); // 공고 추가 모달 보이기
  const [recruitList, setRecruitList] = useState([]);
  const [selectedJob, setSelectedJob] = useState(recruitList.length > 0 ? recruitList[0].id : null);
  const [isLoading, setIsLoading] = useState(false);

  // USEEFFECT
  // 미지원 공고 리스트 불러오기
  useEffect(() => {
    const fetchRecruitList = async () => {
      try {
        const currentDate = new Date();
        const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')} ${String(currentDate.getHours()).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')}`; 
        
        const response = await getValidRecruitList(formattedDate);
        console.log("미지원 공고 리스트:", response);

        // 마감일 빠른 순으로 재정렬
        const sortedRecruitList = response.unapplied.recruits.sort(
          (a, b) => new Date(a.endTime) - new Date(b.endTime)
        );
        
        setRecruitList(sortedRecruitList);
        if(sortedRecruitList > 0) {
          setSelectedJob(sortedRecruitList[0].id);
        }
      } catch (error) {
        console.error("Failed to fetch recruit list:", error);
      }
    };
    fetchRecruitList();
  }, []);

  // useEffect(() => {console.log("현재 선택:", selectedJob)}, [selectedJob]);
  
  // 공고 선택 상태
  const handleSelectJob = (id) => {
    if (selectedJob === id) {
      setSelectedJob(null); // 선택 해제
    } else {
      setSelectedJob(id); // 새로운 선택
    }
  }

  //기한 계산
  const calculateDaysLeft = (endTime) => {
    const endDate = new Date(endTime);
    const currentDate = new Date();
    const timeDiff = endDate - currentDate;
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return `D-${daysLeft}`;
  };

  // 공고 추가하기
  const handleAddApply = async (newRecruitId) => {
    try{
      const currentDate = new Date();
        const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')} ${String(currentDate.getHours()).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')}`; 

      const newRecruitList = await getValidRecruitList(formattedDate);
      const newRecruit = newRecruitList.unapplied.recruits.find(
        (recruit) => recruit.id === newRecruitId
      );

      if(!newRecruit) {
        console.error("Failed to find the newly created recruit");
        return;
      }

      // 마감일 적게 남은 순으로 재정렬
      const updatedRecruitList = [...recruitList, newRecruit].sort(
        (a, b) => new Date(a.endTime) - new Date(b.endTime)
      )

      setRecruitList(updatedRecruitList);
      setSelectedJob(newRecruitId); // 새 공고를 선택된 상태로 설정
      
    } catch (error) {
      console.error("Failed to fetch the newly created recruit:", error);
    }
  }


  // 다음 버튼 클릭(공고 별 자소서 생성)
  const handleNextClick = async () => {
    setIsLoading(true); //Loading Start
    try{
      const response = await createIntro(selectedJob, {
        // 자소서 생성 기본 데이터
        "questionList": [
          {
            "title": "string",
            "content": "string",
            "number": 0
          }
        ],
        "state": 0
      });
      console.log("자기소개서 생성 결과:", response);
      trackEvent('btn_click', {
        category: 'coverletter',
        detail: 'select_recruit',
        action_type: 'click',
        label: '다음',
      });
      navigate(`/history/others/${response.data.id}/rewrite`);
    } catch (error) {
      console.error("Failed to create intro:", error);
    } finally {
      setIsLoading(false); //Loading End
    }
  }

  return (
    <Layout>
      {isModalOpen && 
        <AddApplyModal 
          onClose={()=>setIsModalOpen(false)} 
          onSave = {(id) => {handleAddApply(id)}}
      />}
      {isLoading && <LoadingSpinner message="자기소개서 생성 중 ..."/>}
      <BaseDiv>
        <ContentWrapper>
          <RecruitTitle isMobile={false}>자기소개서를 작성할 공고를 선택해주세요.</RecruitTitle>
          <RecruitTitleWrapper style={{width:'280px'}}>
            <RecruitTitle isMobile={true}>자기소개서를 작성할 공고를</RecruitTitle>
            <RecruitTitle isMobile={true}>선택해주세요.</RecruitTitle>
          </RecruitTitleWrapper>

          <ListBox>
            <ColumnHeaderSection>
              <ColumnHeader>공고 이름</ColumnHeader>
              <ColumnHeader>접수 마감</ColumnHeader>
              <ColumnHeader>태그</ColumnHeader>
              <ColumnHeader>공고 링크</ColumnHeader>
            </ColumnHeaderSection>

            <ListSection>
              {recruitList.map((recruit) => (
                <ListItem
                  key={recruit.id}
                  onClick={() => handleSelectJob(recruit.id)}
                  isSelected={selectedJob === recruit.id}
                >
                  {isMobile ? (
                    <Header>
                      <Title>
                        {recruit.title.length > 20 ? `${recruit.title.slice(0, 20)}...` : recruit.title}
                      </Title>
                      <DueDate isUrgent={parseInt(calculateDaysLeft(recruit.endTime).replace("D-", "")) <= 7}>
                        {calculateDaysLeft(recruit.endTime)}
                      </DueDate>
                    </Header>
                  ) : (
                    <>
                      <Title>
                        {recruit.title.length > 20 ? `${recruit.title.slice(0, 20)}...` : recruit.title}
                      </Title>
                      <DueDate isUrgent={parseInt(calculateDaysLeft(recruit.endTime).replace("D-", "")) <= 7}>
                        {calculateDaysLeft(recruit.endTime)}
                      </DueDate>
                    </>
                  )}

                  <TagContainer>
                    {recruit.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </TagContainer>
                  <JobLinkBox 
                    onClick={
                      recruit.link
                      ? (e) => { 
                        e.stopPropagation(); 
                        window.open(recruit.link, '_blank'); 
                      }
                      : undefined
                    }
                    disabled={!recruit.link}
                    >
                      공고 보러가기
                    <SvgIcon name="jobLink" size={15} />
                  </JobLinkBox>
                </ListItem>
              ))}
            </ListSection>
          </ListBox>

          <AddNewJob onClick = {() => {
            setIsModalOpen(true);
            trackEvent('add_click', {
              category: 'coverletter',
              detail: 'add_recruit',
              action_type: 'add',
              label: '공고 추가',
            });
          }}>
            + 새로운 공고 추가
          </AddNewJob>
          <NextButton
            onClick={handleNextClick}
            disabled = {!selectedJob}>
            다음
          </NextButton>
        </ContentWrapper>
      </BaseDiv>
      {/* <div style={{height:'500px'}}>dfawe</div> */}
    </Layout>
  )
}

export default Select;

const BaseDiv = styled.div`
  margin-block: 40px 72px;
`;

const ContentWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: ${theme.breakpoints.md}) {
    padding-inline: 20px;
  }
`

const RecruitTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;

  font-family: 'Bold';
  font-size: 24px;
  font-weight: 700;
  line-height: 28.64px;
`

const RecruitTitle = styled.div`
  display: ${(props) => (props.isMobile ? 'none' : 'block')};
  margin-block: 0px;

  font-family: 'SemiBold';
  font-size: 24px;
  font-weight: 700;

  @media (max-width: ${theme.breakpoints.md}) {
    display: ${(props) => (props.isMobile ? 'block' : 'none')};
    white-space: nowrap;
  }
`

const ListBox = styled.div`
  height: 365px;
  margin-block:32px 20px;
  padding: 20px 18px;

  display: flex;
  flex-direction: column;

  border-radius: 12px;
  border: 1px solid ${Color.gray03};
  font-family: Regular;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.15);

  @media (max-width: ${theme.breakpoints.md}) {
    height: auto;
    max-height: 685px;
  } 
`

const ColumnHeaderSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 24px;

  @media (max-width: ${theme.breakpoints.md}) {
    display: none;
  }
`

const ColumnHeader = styled.div`
  &:nth-child(1) { width: 170px; }
  &:nth-child(2) { width: 60px; }
  &:nth-child(3) { width: 244px; }
  &:nth-child(4) { width: 118px; }

  text-align: center;
  font-family: Regular;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  color: ${Color.gray02};
`

const ListSection = styled.div`
  margin-top: 20px;

  flex: 1 1 auto;
  min-height: 0; /* Flexbox에서 자식 요소가 최소 높이를 가지도록 설정 */
  display: flex;
  flex-direction: column;
  gap:12px;

  //scroll
  overflow-y: auto; 
  -ms-overflow-style: none; /* IE 에서 스크롤바 숨기기*/
  scrollbar-width: none; /* Firefox에서 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none;  /* Chrome, Safari, Opera에서 스크롤바 숨기기 */
  }

  @media (max-width: ${theme.breakpoints.md}) {
    gap: 10px;
  }
`

const ListItem = styled.div`
  height: 28px;
  padding: 14px 16px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
  border-radius: 10px;
  border: ${(props) => (props.isSelected ? `2px solid ${Color.main01}` : `2px solid ${Color.gray06}`)};

  background: ${(props) => (props.isSelected ? Color.main03 : Color.gray06)};
  font-family: Regular;
  cursor: pointer;

  // & > div {
  //   line-height: 28px; /* 텍스트가 높이 기준으로 수직 중앙 정렬 */
  // }

  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column;
    height: auto;
    padding: 16px;
    gap: 12px;
    align-items: normal;
  }
`

const Header = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const Title = styled.div`
  width: 170px;
  max-width: 190px;
  height: 17px;
  font-size: 14px;
  color: ${Color.gray02};

  text-overflow: ellipsis; /* 넘치는 내용을 말줄임표(...)로 표시 */
`

const DueDate = styled.div`
  width: 60px;
  height: 17px;
  font-size: 14px;
  text-align: center;
  color: ${(props) => (props.isUrgent ? "#FC5555" : Color.gray02)};
  font-family: Bold;
  font-weight: 700;

  @media (max-width: ${theme.breakpoints.md}) {
    text-align: right;
  }
`

const TagContainer = styled.div`
  width: 244px;

  display: flex;
  flex-direction: row;
  gap: 8px;


  //scroll
  overflow-x: overlay; 
  overflow-y: hidden;
  -ms-overflow-style: none; /* IE */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; 
  }

  @media (max-width: ${theme.breakpoints.md}) {
    flex-wrap: wrap;
    row-gap: 8px;
  }
`

const Tag = styled.div` 
  height: 22px;
  padding: 0px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: ${Color.white};
  color: ${Color.main01};
  text-align: center;
  font-size:12px;
  white-space: nowrap;
`

const JobLinkBox = styled.div`
  width: 118px;
  height: 28px;
  display: flex;
  flex-direction: row;
  gap: 4px;
  justify-content: center;
  align-items: center;
  background: ${Color.white};
  border-radius: 12px;
  border: 2.3px solid ${Color.gray03};
  font-size: 12px;
  color: ${Color.gray02};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
`

const AddNewJob = styled.div`
  width: 720px;
  height: 42px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 10px;
  border: 1px solid ${Color.gray04};
  background: ${Color.white};

  color: ${Color.gray02};
  text-align: center;
  font-family: Regular;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  cursor: pointer;
  @media (max-width: ${theme.breakpoints.md}) {
    width: 100%;
  }
`

const NextButton = styled.div`
  width: 720px;
  height: 50px;
  margin-top: 40px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 10px;
  background: ${(props) => (props.disabled ? Color.gray03 : Color.main01)};


  color: ${(props) => (props.disabled ? Color.gray02 : Color.white)};
  text-align: center;
  font-family: Regular;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

  @media (max-width: ${theme.breakpoints.md}) {
    width: 100%;
    margin-top: 32px;
  }
`