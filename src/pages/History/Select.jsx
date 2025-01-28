import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Layout from "../../components/Layout";
import SvgIcon from "../../components/shared/SvgIcon";
import { getValidRecruitList } from "../../api/Apply/RecruitValid";
import { createIntro } from "../../api/Intro/intro";
import AddApplyModal from "../../components/Modal/AddApplyModal";


const Select = () => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [recruitList, setRecruitList] = useState([]);
  useEffect(() => {
    const fetchRecruitList = async () => {
      try {
        const response = await getValidRecruitList();
        setRecruitList(response.data.unapplied.recruits);
      } catch (error) {
        console.error("Failed to fetch recruit list:", error);
      }
    };
    fetchRecruitList();
  }, []);
  
  // 공고 선택 상태
  const [selectedJob, setSelectedJob] = useState(recruitList.length > 0 ? recruitList[0].id : null);
  const handleSelectJob = (id) => {
    if (selectedJob === id) {
      setSelectedJob(null); // 선택 해제
    } else {
      setSelectedJob(id); // 새로운 선택
    }
  }

  useEffect(() => {console.log("현재 선택:", selectedJob)}, [selectedJob]);


  //기한 계산
  const calculateDaysLeft = (endTime) => {
    const endDate = new Date(endTime);
    const currentDate = new Date();
    const timeDiff = endDate - currentDate;
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return `D-${daysLeft}`;
  };

  const handleNextClick = async () => {
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
      navigate(`/history/others/${response.data.id}`);
    } catch (error) {
      console.error("Failed to create intro:", error);
    }
  }

  return (
    <Layout title="이력관리">
      {isModalOpen && <AddApplyModal onClose={setIsModalOpen(!isModalOpen)} />}
      <ContentWrapper>
        <div style={{height:'100px'}}/>
        <h2>자기소개서를 작성할 공고를 선택해주세요.</h2>
        <ListBox>
          <ColumnHeaderSection>
            <ColumnHeader style={{marginRight:'80px'}}>공고 이름</ColumnHeader>
            <ColumnHeader style={{marginRight:'136px'}}>접수 마감</ColumnHeader>
            <ColumnHeader style={{marginRight:'184px'}}>태그</ColumnHeader>
            <ColumnHeader>공고 링크</ColumnHeader>
          </ColumnHeaderSection>

          <ListSection>
            {recruitList.map((recruit) => (
              <ListItem
                key={recruit.id}
                onClick={() => handleSelectJob(recruit.id)}
                isSelected={selectedJob === recruit.id}
              >
                  <Title>
                    {recruit.title.length > 20 ? `${recruit.title.slice(0, 20)}...` : recruit.title}
                  </Title>
                  <DueDate isUrgent={parseInt(calculateDaysLeft(recruit.endTime).replace("D-", "")) <= 7}>
                    {calculateDaysLeft(recruit.endTime)}
                  </DueDate>
                  <TagContainer>
                    {recruit.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </TagContainer>
                  <JobLinkBox 
                    onClick={
                      (e) => { e.stopPropagation(); 
                      window.open(recruit.link, '_blank'); 
                    }}>
                    공고 보러가기
                    <SvgIcon name="jobLink" size={15} color="var(--gray-02, #707070)"/>
                  </JobLinkBox>
              </ListItem>
            ))}
          </ListSection>
        </ListBox>
        <AddNewJob>+ 새로운 공고 추가</AddNewJob>
        <NextButton
          onClick={handleNextClick}
          disabled = {!selectedJob}>
          다음
        </NextButton>
      </ContentWrapper>
      <div style={{height:'500px'}}>dfawe</div>
    </Layout>
  )
}

export default Select;

const ContentWrapper = styled.div`
  width: 740px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ListBox = styled.div`
  width: 100%;
  height:409px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  margin-top:30px;
  border-radius: 12px;
  border: 1px solid var(--gray-03, #D9D9D9);
  font-family: Regular;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.15);
`
const ColumnHeaderSection = styled.div`
  width: 100%;
  display: flex;
  padding-left: 95px;
  margin-top:25px;
`

const ColumnHeader = styled.div`
  font-family: Regular;
  color: var(--gray-02, #707070);
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  margin-bottom:20px;
`

const ListSection = styled.div`
  width: calc(100% - 10px);
  margin-top: 10px;
  padding-top: 280px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap:20px;

  //scroll
  overflow-y: overlay; 
  -ms-overflow-style: none; /* IE */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; 
  }
`

const ListItem = styled.div`
  height: 28px;
  padding: 14px 16px;
  display: flex;
  flex-direction: row;
  // justify-content: center;
  gap: 32px;
  border-radius: 10px;
  border: ${(props) => (props.isSelected ? '2px solid #3AAF85' : '2px solid #F5F5F5')};
  background: var(--gray-06, #F5F5F5);
  background: ${(props) => (props.isSelected ? '#E1FAED' : '#F5F5F5')};
  font-family: Regular;
  cursor: pointer;

    & > div {
    line-height: 28px; /* 텍스트가 높이 기준으로 수직 중앙 정렬 */
  }
`

const Title = styled.div`
  width: 190px;
  max-width: 190px;
  height: 17px;
  font-size: 14px;
  color: var(--gray-02, #707070);

  text-overflow: ellipsis; /* 넘치는 내용을 말줄임표(...)로 표시 */
`

const DueDate = styled.div`
  width: 35px;
  height: 17px;
  font-size: 14px;
  color: ${(props) => (props.isUrgent ? "#FC5555" : "var(--gray-02, #707070)")};
  font-family: Bold;
  font-weight: 700;
  // margin-right:50px;
  
`

const TagContainer = styled.div`
  width: 250px;
  height: 22px;
  padding-top:5px;
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

`

const Tag = styled.div` 
  height: 22px;
  padding: 0px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: #FFF;
  color: #3AAF85;
  text-align: center;
  font-size:12px;
  white-space: nowrap;
`

const JobLinkBox = styled.div`
  width: 120px;
  height: 28px;
  display: flex;
  flex-direction: row;
  gap: 4px;
  justify-content: center;
  align-items: center;
  background: #FFFFFF;
  border-radius: 12px;
  border: 2.3px solid var(--gray-03, #707070);
  font-size: 12px;
  color: var(--gray-02, #707070);
  cursor: pointer;
`

const AddNewJob = styled.div`
  width: 700px;
  height: 42px;
  margin-top: 20px;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid #D9D9D9;
  background: #FFF;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #707070;
  text-align: center;
  font-family: Regular;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
`

const NextButton = styled.div`
  width: 700px;
  height: 50px;
  margin-top: 50px;
  border-radius: 10px;
  background: var(--main-01, #3AAF85);
    display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  color: #FFF;
  text-align: center;
  font-family: Regular;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`