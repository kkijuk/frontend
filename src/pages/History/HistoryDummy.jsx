import React, { useState } from "react";
import styled from "styled-components";
import "./history.css";
import Layout from "../../components/Layout";
import EducationForm from "../../components/Record/InlineForms/EducationForm";
import LicenseForm from "../../components/Record/InlineForms/LicenseForm";
import AwardForm from "../../components/Record/InlineForms/AwardForm";
import SkillForm from "../../components/Record/InlineForms/SkillForm";
import EducationItem from "../../components/Record/readOnlyItems/EducationItem";
import LicenseItem from "../../components/Record/readOnlyItems/LicenseItem";
import AwardItem from "../../components/Record/readOnlyItems/AwardItem";
import SkillItem from "../../components/Record/readOnlyItems/SkillItem";

// Dummy Data
const dummyData = {
  educations: [
    {
      id: 1,
      schoolName: "서울대학교",
      major: "컴퓨터공학",
      state: "졸업",
      admissionDate: "2010-03",
      graduationDate: "2014-02",
    },
  ],
  licenses: [
    {
      id: 1,
      licenseTag: "LICENSE",
      licenseName: "정보처리기사",
      administer: "한국산업인력공단",
      licenseNumber: "1234",
      licenseGrade: "",
      acquireDate: "2024-09",
    },
  ],
  awards: [
    {
      id: 1,
      competitionName: "UMC 데모데이",
      administer: "UMC",
      awardName: "최우수상",
      acquireDate: "2024-08",
    },
  ],
  skills: [
    {
      id: 1,
      skillTag: "IT",
      skillName: "React",
      workmanship: "INTERMEDIATE",
    },
  ],
};

const HistoryD = () => {
  const [data] = useState(dummyData);

  const renderSection = (title, items, ItemComponent, FormComponent) => (
    <SectionWrapper>
      <SectionHeader>
        <h2>{title}</h2>
        <button onClick={() => console.log(`${title} form 추가 테스트`)}>
          +
        </button>
      </SectionHeader>
      <ItemList>
        {items.map((item) => (
          <ItemComponent key={item.id} data={item} onEdit={() => console.log(`${title} 수정 테스트`, item)} />
        ))}
        <FormComponent
          mode="add"
          onSubmit={(formData) =>
            console.log(`${title} 생성 테스트`, formData)
          }
          onCancel={() => console.log(`${title} 폼 취소 테스트`)}
        />
      </ItemList>
    </SectionWrapper>
  );

  return (
    <Layout title="UI 및 동작 테스트">
      <div>
        {renderSection("학력", data.educations, EducationItem, EducationForm)}
        {renderSection("자격증", data.licenses, LicenseItem, LicenseForm)}
        {renderSection("수상", data.awards, AwardItem, AwardForm)}
        {renderSection("스킬", data.skills, SkillItem, SkillForm)}
      </div>
    </Layout>
  );
};

export default HistoryD;

// Styled Components
const SectionWrapper = styled.div`
  margin-bottom: 40px;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h2 {
    font-size: 20px;
    font-weight: bold;
  }

  button {
    background: var(--main-01, #3AAF85);
    color: var(--white, #FFF);
    border: none;
    border-radius: 10px;
    padding: 5px 10px;
    cursor: pointer;
  }
`;

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
