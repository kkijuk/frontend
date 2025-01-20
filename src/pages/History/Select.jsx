import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Layout from "./Layout";
import SvgIcon from "../../components/shared/SvgIcon";


const Select = () => {

  const dummyData = [
    {
      id: 1,
      title: "[00기업] 2024 하반기 신입사원 모집",
      dueDate: "D-10",
      tag: ["신입", "정규직","서비스기획","서비스기획"],
      reviewTag: "1차 서류면접",
    },
    {
      id: 2,
      title: "[XX기업] 데이터 분석 인턴 채용",
      dueDate: "D-7",
      tag: ["인턴", "데이터 분석"],
      reviewTag: "2차 면접",
    },
    {
      id: 3,
      title: "[ABC기업] UX/UI 디자이너 채용",
      dueDate: "D-5",
      tag: ["디자인", "UX/UI","서비스기획","서비스기획"],
      reviewTag: "포트폴리오 검토",
    },
    {
      id: 4,
      title: "[00기업] 2024 하반기 인턴 채용",
      dueDate: "D-2",
      tag: ["인턴"],
      reviewTag: "1차 서류면접",
    },
    {
      id: 5,
      title: "[ZZ기업] IT 개발자 모집",
      dueDate: "D-3",
      tag: ["개발", "정규직"],
      reviewTag: "코딩 테스트",
    },
    {
      id: 6,
      title: "[FF기업] 마케팅 채용 공고",
      dueDate: "D-12",
      tag: ["마케팅"],
      reviewTag: "1차 면접",
    },
    {
      id: 7,
      title: "[JK기업] 2024 기술직 인턴 모집",
      dueDate: "D-8",
      tag: ["인턴", "기술직"],
      reviewTag: "2차 서류 평가",
    },
    {
      id: 8,
      title: "[LL기업] 2024 경영지원 신입사원 채용",
      dueDate: "D-4",
      tag: ["신입", "경영지원"],
      reviewTag: "최종 면접",
    },
  ];
  
  // 공고 선택 상태
  const [selectedJob, setSelectedJob] = useState(dummyData.length > 0 ? dummyData[0].id : null);

  const handleSelectJob = (id) => {
    if (selectedJob === id) {
      setSelectedJob(null); // 선택 해제
    } else {
      setSelectedJob(id); // 새로운 선택
    }
  }

  useEffect(() => {console.log("현재 선택:", selectedJob)}, [selectedJob]);


  return (
    <Layout title="Select">
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
            {dummyData.map((data) => (
              <ListItem
                key={data.id}
                onClick={() => handleSelectJob(data.id)}
                isSelected={selectedJob === data.id}
              >
                  <Title>
                    {data.title.length > 20 ? `${data.title.slice(0, 20)}...` : data.title}
                  </Title>
                  <DueDate isUrgent={parseInt(data.dueDate.replace("D-", "")) <= 7}>
                    {data.dueDate}
                  </DueDate>
                  <TagContainer>
                    {data.tag.map((tag) => (
                      <Tag>{tag}</Tag>
                    ))}
                  </TagContainer>
                  <JobLinkBox>
                    공고 보러가기
                    <SvgIcon name="jobLink" size={15} color="var(--gray-02, #707070)"/>
                  </JobLinkBox>
              </ListItem>
            ))}
          </ListSection>
        </ListBox>
        <AddNewJob>+ 새로운 공고 추가</AddNewJob>
        <NextButton
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